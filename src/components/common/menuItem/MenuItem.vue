<template>
  <ul>
    <li v-for="item in items" :key="item.cdId">
      <p class="check_row check_row_base">
        <CheckboxBase
          :id="`${item.cdId}`"
          :value="`${item.cdId}`"
          :label="`${item.cdNm}`"
          v-model="selectedMenuItems"
          @change="updateSelectedMenu(item.cdId)"
        />
      </p>
      <MenuItem
        v-if="item.subMenus"
        :items="item.subMenus"
        :listData="listData"
        v-model:selectMenu="selectedMenuItems"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { defineProps } from "vue";

const props = defineProps<{
  items: Array<CodeMngModel>;
  listData: Array<CodeMngModel>;
  selectMenu: String[];
}>();
const emit = defineEmits(["update:selectMenu"]);

const selectedMenuItems = props.selectMenu;

function buildMenu(arr: any, parentId = "") {
  return arr
    .filter((item:any) => item.upCdId === parentId)
    .map((item:any) => ({
      ...item,
      subMenus: buildMenu(arr, item.cdId)
    }));
}

function addAllSubMenus(menuId:any, listMenu:any) {
  const menuItem = listMenu.find((item:any) => item.cdId === menuId);
  if (menuItem && menuItem.subMenus && menuItem.subMenus.length > 0) {
    menuItem.subMenus.forEach((subMenu:any) => {
      if (!selectedMenuItems.includes(subMenu.cdId)) {
        selectedMenuItems.push(subMenu.cdId);
      }
      if (subMenu.subMenus && subMenu.subMenus.length > 0) {
        addAllSubMenus(subMenu.cdId, menuItem.subMenus);
      }
    });
  }
}

function removeAllSubMenus(menuId:any, listMenu:any) {
  const menuItem = listMenu.find((item:any) => item.cdId === menuId);
  if (menuItem && menuItem.subMenus && menuItem.subMenus.length > 0) {
    menuItem.subMenus.forEach((subMenu:any) => {
      const subMenuIndex = selectedMenuItems.indexOf(subMenu.cdId);
      if (subMenuIndex > -1) {
        selectedMenuItems.splice(subMenuIndex, 1);
      }
      if (subMenu.subMenus && subMenu.subMenus.length > 0) {
        removeAllSubMenus(subMenu.cdId, menuItem.subMenus);
      }
    });
  }
}

function searchSubMenus(menuId:any, subMenus:any) {
  if (!subMenus) return null;

  for (const subMenu of subMenus) {
    if (subMenu.cdId === menuId) {
      return subMenu;
    }

    const foundMenu = searchSubMenus(menuId, subMenu.subMenus);
    if (foundMenu) {
      return foundMenu;
    }
  }

  return null;
}

function findMenu(menuId:any, listMenu:any) {
  for (const menu of listMenu) {
    if (menu.cdId === menuId) {
      return menu;
    }

    const foundMenu = searchSubMenus(menuId, menu.subMenus);
    if (foundMenu) {
      return foundMenu;
    }
  }

  return null;
}

function findSiblingIds(menuId:any, listMenu:any) {
  const menuItem = findMenu(menuId, listMenu);

  if (menuItem && menuItem.upCdId !== null) {
    const parentMenu = findMenu(menuItem.upCdId, listMenu);

    if (parentMenu && parentMenu.subMenus) {
      return parentMenu.subMenus.map((subMenu:any) => subMenu.cdId);
    }
  }

  return [];
}

function checkMenuParent(menuId:any) {
  const menuItem = findMenu(menuId, props.listData);

  if (menuItem && menuItem.upCdId) {
    if (!selectedMenuItems.includes(menuItem.upCdId)) {
      selectedMenuItems.push(menuItem.upCdId);
    }

    const parent = findMenu(menuItem.upCdId, props.listData);

    if (parent) {
      checkMenuParent(parent.cdId);
    }
  }
}

function unCheckMenuParent(menuId:any) {
    const menuItem = findMenu(menuId, props.listData);

    const listMenuId = findSiblingIds(menuId, props.listData);

    const allSiblingsUnchecked = listMenuId.every((id:any) => !selectedMenuItems.includes(id));

    if (allSiblingsUnchecked && menuItem.upCdId) {
        const parentIndex = selectedMenuItems.indexOf(menuItem.upCdId);
        if (parentIndex > -1) {
            selectedMenuItems.splice(parentIndex, 1);
        }
        unCheckMenuParent(menuItem.upCdId);
    }
}

function updateSelectedMenu(newSelectedMenu:any) {
  const index = selectedMenuItems.indexOf(newSelectedMenu);

  if (index > -1) {
    selectedMenuItems.splice(index, 1);
    removeAllSubMenus(newSelectedMenu, props.items);
    unCheckMenuParent(newSelectedMenu);
  } else {
    selectedMenuItems.push(newSelectedMenu);
    addAllSubMenus(newSelectedMenu, props.items);
    checkMenuParent(newSelectedMenu);
  }

  emit("update:selectMenu", selectedMenuItems);
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 20px;
}

input[type="checkbox"] {
  margin-right: 5px;
}
</style>
