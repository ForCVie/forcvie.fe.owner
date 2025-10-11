<template>
  <div class="header_wrap">
    <div class="header_top">
      <div class="grid_content">
        <h1 class="header_logo">
          <router-link to="/">
            <img src="@/assets/images/logo.png" alt="영산대학교" />
          </router-link>
        </h1>
      </div>
        <div class="header_function mg_r30">
          <p class="login_info">Nguyễn Quốc Huy</p>
          <div
            class="dropdown_v1"
            :class="isHeaderOpen ? 'dropdown_select' : ''"
          >
            <div
              :style="{ width: `45px`, position: 'relative' }"
              class="transition_light avatar"
              v-on:click="changeHeaderSelect"
            >
              <img
                class="wd_p100"
                :src="'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png'"
                alt="Avatar"
              />
            </div>
            <div class="dropdown-content">
              <a class="dropdown-item" href="#">Thông tin cá nhân</a>
              <a class="dropdown-item" href="#">Đổi quyền điều khiển</a>
              <a class="dropdown-item" href="#">Cài đặt</a>
              <a class="dropdown-item" href="#">Đăng xuất</a>
            </div>
          </div>
        </div>
    </div>

    <!-- <Drawer :position="'left'" :isOpen="isDrawerOpen" @close="closeDrawer">
      <div class="ta_c">
        <h1 class="header_logo">
          <router-link to="/">
            <img src="@/assets/images/logo.png" alt="영산대학교" />
          </router-link>
        </h1>
      </div>
      <hr />
      <TNavTree v-if="menuData.length > 0" :menu-items="menuData" />
    </Drawer> -->
    <!-- <div class="header_bottom">
      <div class="grid_content">
        <nav class="nav_wrap"> -->
    <!-- <ul id="gnbMenu" class="gnb_1depth">
            <li v-for="(subMenu1,indexMenu1) in subMenus" :key="indexMenu1">
              <a href="javascript:void(0)" @click="handleOpenScreen(subMenu1?.screenName)">{{ subMenu1.name }}</a>
              <ul class="gnb_2depth">
                <li v-for="(subMenu2,indexMenu2) in subMenu1?.subMenus" :key="indexMenu2">
                  <a href="javascript:void(0)" @click="handleOpenScreen(subMenu2?.screenName)">
                    {{ subMenu2?.name }}
                  </a>
                  <ul class="gnb_3depth" :class="{first:!indexMenu2}">
                    <li v-for="(subMenu3,indexMenu3) in subMenu2?.subMenus" :key="indexMenu3">
                      <a href="javascript:void(0)"
                         @click="handleOpenScreen(subMenu3?.screenName)">{{ subMenu3?.name }}</a>
                      <ul class="gnb_4depth" :class="{first:!indexMenu2 && !indexMenu3}">
                        <li v-for="(subMenu4,indexMenu4) in subMenu3?.subMenus" :key="indexMenu4">
                          <a href="javascript:void(0)"
                             @click="handleOpenScreen(subMenu4?.screenName)">{{ subMenu4.name }}</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul> -->
    <!-- </nav>
      </div>
    </div> -->
  </div>
  
    <div 
        @mouseenter="openDrawer"
        @mouseleave="closeDrawer"
     class="menu_wrap" :class="isDrawerOpen ? '' : 'active'">
      <TNavTree v-if="menuData.length > 0" :menu-items="menuData" :is-open-menu="isDrawerOpen" />
    </div>
  <LoadingComponent v-if="isLoading"></LoadingComponent>
</template>

<script lang="ts" setup>
// import {headerStyle, mobileGnb, gnbOneDepth} from "@/assets/js/common";
import { onMounted } from "vue";
import commonService from "@/service/common/CommonService";
import { commonStore } from "@/stores/common";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo, removeUserInfo } from "@/utils/storage";
import LoadingComponent from "@/components/common/loading/LoaddingComponent.vue";
import TNavTree from "./TNavTree.vue";
import CommonService from "@/service/common/CommonService";

const store = commonStore();
// const roleStore = checkFlagStore()
const init = ref([]);
const route = useRoute();
const router = useRouter();

const menus = ref();
const subMenus = ref([]);
const isLoading = ref(false);
const userInfo = ref<Object | null>(null);

const isDrawerOpen = ref(false);

const isHeaderOpen = ref(false);

const changeHeaderSelect = () => {
  isHeaderOpen.value = !isHeaderOpen.value;
};

const openDrawer = () => {
  isDrawerOpen.value = true;
};
const closeDrawer = () => {
  isDrawerOpen.value = false;
};

onBeforeMount(async () => {
  await getMenu();
  // headerStyle();
  // mobileGnb();
  // gnbOneDepth();

  // userInfo.value = JSON.parse(getUserInfo())
});

const menuData = ref([]);

const getMenu = async () => {
  // const menuJson = [
  //   { menuId: "CMM000000000000001", parentId: "", nm: "Quản Lý Quyền", icon: "homepage.png" },
  //   {
  //     menuId: "CMM000000000000002",
  //     parentId: "CMM000000000000001",
  //     route: "/template",
  //     nm: "QL Resource",
  //   },
  //   {
  //     menuId: "CMM000000000000003",
  //     parentId: "CMM000000000000001",
  //     route: "/",
  //     nm: "QL Role",
  //   },
  //   { menuId: "CMM000000000000006", parentId: "", nm: "Quản Lý Promotional" , icon: "demo1.png"},
  //   {
  //     menuId: "CMM000000000000007",
  //     parentId: "CMM000000000000006",
  //     nm: "Hiển Thị Footer",
  //   },
  //   { menuId: "CMM000000000000012", parentId: "", nm: "Quản Lý Chính Sách", icon: "demo2.png" },
  //   {
  //     menuId: "CMM000000000000013",
  //     parentId: "CMM000000000000012",
  //     nm: "Chính Sách Cửa Hàng",
  //   },
  // ];
  await CommonService
      .menu()
      .then(async (response) => {
        if (response.status == 200) {
          console.log(response.data);
  menuData.value = buildTree(response.data.data)
  // menuData.value = buildTree(menuJson);
  // subMenus.value = response.data.data
    }
  })
  .catch((e) => {
    console.log(e)
  })
};

function buildTree(menuList: any, parentId = "") {
  return menuList
    .filter((item: any) => item.parentId === parentId)
    .map((item: any) => ({
      ...item,
      children: buildTree(menuList, item.menuId),
    }));
}
// onMounted(async () => {
// await getMenu()
// headerStyle();
// mobileGnb();
// gnbOneDepth();

// userInfo.value = JSON.parse(getUserInfo())
// })

// const getMenu = async () => {
//   isLoading.value = true

//   await commonService
//       .menu()
//       .then(async (response) => {
//         if (response.status == 200) {
//           console.log(response.data);

//           // subMenus.value = response.data.data
//         }
//         isLoading.value = false
//       })
//       .catch((e) => {
//         console.log(e)
//       })
//       .finally(() => {
//         isLoading.value = false
//       })
// }

const logout = () => {
  isLoading.value = true;
  commonService
    .logout()
    .then(async (response) => {
      if (response.status == 200) {
        await removeUserInfo();
        // await router.push({name: "Login"})
        window.open(import.meta.env.VITE_CLIENT_INTRO_URL, "_self");
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// const handleOpenScreen = async (screenName) => {
//   await roleStore.checkRole(screenName)
//   if (screenName) router.push({name: screenName})
// }
</script>

<style>
.header_icon_arrow_down {
  background-image: url(@/assets/images/icon_arrow_down.png);
  background-size: cover;
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0px;
  z-index: 9;
}
.menu_wrap {
  position: fixed;
  width: 280px;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 5;
  padding-top: 85px;
  transition: width 0.3s ease;
}
.menu_wrap.active {
  width: 70px;
}
</style>
