<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    </section>
</template>

<script setup lang="ts">
import { commonStore } from '@/stores/common';

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản Lý Sản Phẩm");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

</script>

<style scoped>

</style>