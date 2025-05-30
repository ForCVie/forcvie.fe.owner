<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue';

const props = defineProps<{
  currentPage: number;
  totalRows: number;
  pageSize: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'changePage', page: number): void;
}>();

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('changePage', page);
  }
};
</script>

<template>
  <div class="paging_wrap">
    <button class="page_con prev_page" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">이전페이지</button>
    <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
    >
      <p>{{ page }}</p>
    </button>
    <button class="page_con next_page" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
      다음페이지
    </button>
  </div>
</template>

<style scoped>

</style>