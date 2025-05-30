<template>
  <!-- [pp] 에러 화면 -->
  <div class="error_wrap">
    <div class="error_box">
      <p class="title">ERROR</p>
      <strong>요청하신 페이지를 찾을 수 없습니다.</strong>
      <div class="txt">
        <p>사이트 이용에 불편을 드려 죄송합니다.</p>
        <p>새로고침 &#40;F5&#41;키를 누르거나, 잠시 후에 다시 이용해 주십시오.</p>
      </div>

      <router-link to="./main">메인화면</router-link>
    </div>
  </div>
  <!-- [pp] //에러 화면 -->
</template>
<script setup lang="ts">
</script>