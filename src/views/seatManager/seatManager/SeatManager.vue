<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div v-for="(floor, indexFloor) in listFloor" class="box dp_block">
        <div class="box_inner">
          <h3 class="box_title">Tầng {{ indexFloor + 1 }}</h3>
          <div class="box_title_funtion">
            <a href="javascript:void(0);" class="mg_r15" @click="addFloor(indexFloor)">Thêm</a>
            <a href="javascript:void(0);" @click="deleteFloor(indexFloor)">Xóa</a>
          </div>
        </div>
      <div class="box_section">
        <TableService />
      </div>
    </div>
    <div class="box_section btn_add_form">
      <div class="btn_area">
        <button type="button" class="button btn_md btn_white ">닫기</button>
        <button type="button" class="button btn_md btn_primary  ">확인</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { commonStore } from "@/stores/common";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref(`Quản lý tầng - bàn`);
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const listFloor = ref([
    {
        name: "Tầng 1",
        order: 1
    },
    {
        name: "Tầng 2",
        order: 2
    },
    {
        name: "Tầng 3",
        order: 3
    },
])

const deleteFloor = (index: number) => {

}

const addFloor = (index: number) => {

}
</script>

<style scoped>
.form_info > li > p {
    text-align: left !important;
    font-size: 14px !important;
}
.btn_add_form {
  position: sticky;
  left: 0;
  right: 0;
  bottom: 30px;
}
</style>
