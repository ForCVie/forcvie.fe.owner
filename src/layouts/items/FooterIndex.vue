<template>
  <div class="footer_wrapper">
    <h2>
      <router-link to="">
        <img src="@/assets/images/logo_footer.png" alt="계원예술대학교" />
      </router-link>
    </h2>
    <div id="footer" class="footer_wrap">
      <ul class="footer_link">
        <li>
          <router-link to="">이용약관</router-link>
          <router-link to="">개인정보 처리방침</router-link>
        </li>
      </ul>
      <p class="copyright">Copyright 2025. Kaywon University of Art & Design.</p>
      <ul class="footer_info">
        <li class="address">경기도 의왕시 계원대학로 66(내손동) 계원예술대학교</li>
        <li>안내전화: <router-link to=""> 054)760-1127</router-link></li>
      </ul>
      <a href="javascript:void(0);" class="move_top" title="페이지 상단으로 이동"></a>
    </div>
  </div>
</template>

<script lang="ts">
import { moveTop } from "@/assets/js/common";
export default {
  mounted: function () {
    moveTop();
  },
};
</script>
