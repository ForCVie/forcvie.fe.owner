<template>
  <div class="header_wrap">
    <div class="header_top">
      <button
        @click="openDrawer"
        style="
          position: absolute;
          left: 10px;
          width: 50px;
          height: 50px;
          z-index: 10;
        "
      >
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 20.00 20.00"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <title>hamburger</title>
            <desc>Created with Sketch Beta.</desc>
            <defs></defs>
            <g
              id="Page-1"
              stroke-width="0.0002"
              fill="none"
              fill-rule="evenodd"
              sketch:type="MSPage"
            >
              <g
                id="Icon-Set"
                sketch:type="MSLayerGroup"
                transform="translate(-210.000000, -887.000000)"
                fill="#000000"
              >
                <path
                  d="M229,895 L211,895 C210.448,895 210,895.448 210,896 C210,896.553 210.448,897 211,897 L229,897 C229.552,897 230,896.553 230,896 C230,895.448 229.552,895 229,895 L229,895 Z M229,903 L211,903 C210.448,903 210,903.448 210,904 C210,904.553 210.448,905 211,905 L229,905 C229.552,905 230,904.553 230,904 C230,903.448 229.552,903 229,903 L229,903 Z M211,889 L229,889 C229.552,889 230,888.553 230,888 C230,887.448 229.552,887 229,887 L211,887 C210.448,887 210,887.448 210,888 C210,888.553 210.448,889 211,889 L211,889 Z"
                  id="hamburger"
                  sketch:type="MSShapeGroup"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <div class="grid_content">
        <h1 class="header_logo">
          <router-link to="/">
            <img src="@/assets/images/logo.png" alt="영산대학교" />
          </router-link>
        </h1>
        <!-- <div class="header_function">
          <p class="login_info">{{ userInfo?.userName }} {{userInfo?.lastLoginDate && `[${userInfo?.lastLoginDate}]`}}</p>
          <button type="button" class="btn_logout" @click="logout">로그아웃</button>
        </div> -->
      </div>
    </div>

    <Drawer :position="'left'" :isOpen="isDrawerOpen" @close="closeDrawer">
      <div class="ta_c">
        <h1 class="header_logo">
          <router-link to="/">
            <img src="@/assets/images/logo.png" alt="영산대학교" />
          </router-link>
        </h1>
      </div>
      <hr/>
      <TNavTree v-if="menuData.length > 0" :menu-items="menuData" />
    </Drawer>
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
  const menuJson = [
    { menuId: "CMM000000000000001", parentId: "", nm: "Quản Lý Quyền" },
    {
      menuId: "CMM000000000000002",
      parentId: "CMM000000000000001",
      nm: "QL Resource",
    },
    {
      menuId: "CMM000000000000003",
      parentId: "CMM000000000000001",
      nm: "QL Role",
    },
    { menuId: "CMM000000000000006", parentId: "", nm: "Quản Lý Promotional" },
    {
      menuId: "CMM000000000000007",
      parentId: "CMM000000000000006",
      nm: "Hiển Thị Footer",
    },
    { menuId: "CMM000000000000012", parentId: "", nm: "Quản Lý Chính Sách" },
    {
      menuId: "CMM000000000000013",
      parentId: "CMM000000000000012",
      nm: "Chính Sách Cửa Hàng",
    },
  ];
  // await CommonService
  //     .menu()
  //     .then(async (response) => {
  //       if (response.status == 200) {
  //         console.log(response.data);
  // menuData.value = buildTree(response.data.data)
  menuData.value = buildTree(menuJson);
  // subMenus.value = response.data.data
  //   }
  // })
  // .catch((e) => {
  //   console.log(e)
  // })
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
