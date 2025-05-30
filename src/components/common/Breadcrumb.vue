<template>
  <div class="page_toparea">
    <h2 class="page_title">{{ pageTitle }}</h2>
    <ul class="navi_list">
      <li v-for="(item, index) in breadcrumbItems" :key="index">
        <router-link :to="item.link">{{ item.label }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {  RouterLink } from 'vue-router';

export default defineComponent({
  props: {
    pageTitle: {
      type: String,
      required: true,
    },
    breadcrumbItems: {
      type: Array as PropType<Array<{ label: string; link: string }>>,
      default: () => [],
    },
  },
  components: {
    RouterLink,
  },
});
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
