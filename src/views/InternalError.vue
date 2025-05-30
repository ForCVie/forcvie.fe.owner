<template>
  <!-- [pp] 에러 화면 -->
  <div class="error_wrap">
    <div class="error_box">
      <p class="title">500</p>
      <strong>Internal Server Error</strong>
      <p class="txt">
        사이트 이용에 불편을 드려 죄송합니다.<br />
        새로고침 &#40;F5&#41;키를 누르거나, 잠시 후에 다시 이용해 주십시오.
      </p>
      <router-link :to="{name:'Home'}">메인화면</router-link>
    </div>
  </div>
  <!-- [pp] //에러 화면 -->
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
