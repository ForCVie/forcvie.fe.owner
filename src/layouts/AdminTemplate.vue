<template>
  <!-- <Loading /> -->
  <div class="page_wrap">
    <div class="skip_nav">
      <a href="#gnb_skip">주요메뉴 바로가기</a>
      <a href="#container_skip">본문영역 바로가기</a>
    </div>
    <!-- header -->
    <header-index />

    <!-- main -->
    <main>
      <router-view />
    </main>

    <!-- footer -->
    <footer-index />
  </div>
</template>

<script>
import { HeaderIndex, FooterIndex } from "@/layouts/items/TemplateImport";

export default {
  components: {
    HeaderIndex,
    FooterIndex,
  },
};
</script>
