<template>
  <!--  <DashboardAdminSite v-if="userInfo?.userDiv === ROLE_ADMIN"/>-->
  <!--  <DashboardStaffSite v-if="userInfo?.userDiv === ROLE_STAFF || userInfo?.userDiv === ROLE_EMP"/>-->

  <DashboardAdminSite/>
<!--  <DashboardStaffSite/>-->
</template>

<script setup lang="ts">

import DashboardAdminSite from "@/views/dashboard/DashboardAdminSite.vue";
import DashboardStaffSite from "@/views/dashboard/DashboardStaffSite.vue";
import {getUserInfo} from "@/utils/storage";
import {ROLE_ADMIN, ROLE_STAFF, ROLE_EMP} from "@/constants/common.const";

const userInfo = JSON.parse(getUserInfo());
</script>

<style scoped>

</style>