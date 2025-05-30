<template>
  <!-- <Loading /> -->
  <div class="page_wrap">
    <!-- header -->
    <THeader />

    <!-- main -->
    <main id="main_content">
      <router-view v-slot="{ Component, route }">
        <transition
          :enter-active-class="`animate__faster animate__animated animate__fadeInRight`"
          :leave-active-class="`animate__faster animate__animated animate__fadeOutLeft`"
          mode="out-in"
        >
          <div :key="route.name">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </main>
    <!-- footer -->
    <TFooter />
  </div>
  <LoadingComponent v-if="store.loading"></LoadingComponent>
</template>

<script setup lang="ts">
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import LoadingComponent from "@/components/common/loading/LoaddingComponent.vue";
import { commonStore } from "@/stores/common";
import CommonService from "@/service/common/CommonService";

const store = commonStore();

</script>

<style scoped>
.nav-tree {
  list-style: none;
  padding-left: 20px;
}
.nav-tree details {
  margin-bottom: 5px;
}
.nav-tree summary {
  cursor: pointer;
  font-weight: bold;
}
.nav-tree ul {
  list-style: none;
  padding-left: 20px;
}
</style>
