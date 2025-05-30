<template>
  <div class="header_wrap">
    <div class="header_top">
      <div class="grid_content">
        <button type="button" class="btn_menu">메뉴보기</button>
        <h1 class="header_logo">
          <router-link to="/">
            <img src="@/assets/images/common/img_logo.svg" alt="영산대학교"/>
          </router-link>
        </h1>
        <div class="header_function">
          <p class="login_info">{{ userInfo?.userName }} {{userInfo?.lastLoginDate && `[${userInfo?.lastLoginDate}]`}}</p>
          <button type="button" class="btn_logout" @click="logout">로그아웃</button>
        </div>
      </div>
    </div>
    <div class="header_bottom">
      <div class="grid_content">
        <nav class="nav_wrap">
          <ul id="gnbMenu" class="gnb_1depth">
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
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <LoadingComponent v-if="isLoading"></LoadingComponent>
</template>

<script lang="ts" setup>
import {headerStyle, mobileGnb, gnbOneDepth} from "@/assets/js/common";
import {onMounted} from "vue";
import commonService from "@/service/common/CommonService";
import {commonStore} from "@/stores/common";
import {useRoute, useRouter} from "vue-router";
import {getUserInfo, removeUserInfo} from "@/utils/storage";
import LoadingComponent from "@/components/common/loading/LoaddingComponent.vue";

const store = commonStore()

const init = ref([])
const route = useRoute()
const router = useRouter()

const menus = ref()
const subMenus = ref([])
const isLoading = ref(false)
const userInfo = ref<Object | null>(null)

onMounted(async () => {
  await getMenu()
  headerStyle();
  mobileGnb();
  gnbOneDepth();

  userInfo.value = JSON.parse(getUserInfo())
  console.log(userInfo.value)

})

const getMenu = async () => {
  isLoading.value = true

  await commonService
      .menu()
      .then(async (response) => {
        if (response.status == 200) {
          subMenus.value = response.data.data
        }
        isLoading.value = false
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        isLoading.value = false
      })
}

const logout = () => {
  isLoading.value = true
  commonService
      .logout()
      .then(async (response) => {
        if (response.status == 200) {
          await removeUserInfo()
          await router.push({name: "Login"})
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        isLoading.value = false
      })
}

const handleOpenScreen = (screenName) => {
  if (screenName) router.push({name: screenName})
}
</script>