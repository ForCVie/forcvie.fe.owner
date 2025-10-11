<template>
  <ul class="nav-tree">
    <li
      v-for="item in menuItems"
      :key="item.menuId"
      class="dp_flex flex_column"
    >
      <!-- Nếu có con: Tạo nhóm có toggle -->
      <div v-if="item.children.length" :class="`nav-item ${item.menuId == 'CMM000000000000001' ? 'select' :''}`" @click="toggle(item.menuId)">
        <IconBase :icon="item.icon" />  <span class="mg_l10 fade-in" :class="{ show: isOpenMenu }">{{ item.nm }} <div class="menu_toggle" :class="{active: isOpen[item.menuId]}"></div></span>
      </div>
      <!-- Nếu không có con: Link đơn -->
      <a
        v-else
        href="javascript:void(0);"
        @click="goToMenu(item.route, item.name)"
        class="nav-item"
      >
        <IconBase v-if="item.icon" :icon="item.icon" /> <span class="mg_l10 fade-in is_select_item" :class="{ show: isOpenMenu }">{{ item.nm }}</span>
      </a>

      <transition name="fade-slide">
        <div v-if="isOpen[item.menuId] && isOpenMenu">
          <TNavTree :menu-items="item.children" />
        </div>
      </transition>
    </li>
  </ul>
</template>

<script>
import { ref, defineComponent } from "vue";
import router from "@/router";
import IconBase from "@/components/icon/IconBase.vue";

export default defineComponent({
  name: "NavTree",
  components: {
    IconBase,
  },
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    isOpenMenu: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // Dùng object lưu trạng thái mở từng node
    const isOpen = ref({});

    const toggle = (id) => {
      isOpen.value[id] = !isOpen.value[id];
    };

    const goToMenu = (path, name) => {
      router.push({
        name: name,
        path: path
      });
    };

    const checkPathSelectItem = (name) => {
      return String(name).includes(String(route.name))
    }

    return {
      isOpen,
      toggle,
      goToMenu,
    };
  },
});
</script>

<style scoped>
.menu_toggle::before{
  position: absolute; top: 0px; right: 10px;
  content: '';
  width: 20px; 
  height: 14px;
  background: url(/src/assets/images/formstyle/icon_accordion.svg) no-repeat;
  transform-origin: bottom;
}
.menu_toggle.active::before{
  transform: translateY(-50%) rotateX(180deg);
}
.fade-in {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  white-space: nowrap;
  font-weight: 600;
  position: relative;
  width: 100%;
}

.fade-in.show {
  opacity: 1;
  visibility: visible;
}
.is_select_item {
  color: var(--primary);
}
.nav-tree {
  list-style: none;
  padding: 0 10px;
}
.nav-tree li {
  margin-bottom: 5px;
}

.nav-item {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.nav-item.select,
.nav-item:hover {
  background: #cccccc61;
}

/* Transition hiệu ứng */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  max-height: 500px; /* giới hạn tối đa mở rộng */
}
</style>
