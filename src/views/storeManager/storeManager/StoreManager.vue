<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="dp_grid grid_col_4 gap_10">
      <div @click="goAction()" class="card-v1">
        <div
          class="card-v1-image"
          :style="{
            height: '200px',
            backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
          }"
        ></div>
        <div class="category">Hoạt động</div>
        <div class="heading">
          Cửa Hàng Bán Xiển Bẩn cơ sở 1 nha
          <div class="author">
            <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
            <br />
            <span class="name">Người tạo:</span> Nguyễn Quốc Huy
          </div>
        </div>
      </div>
      <div @click="goAction()" class="card-v1">
        <div
          class="card-v1-image"
          :style="{
            height: '200px',
            backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
          }"
        ></div>
        <div class="category">Chờ phê duyệt</div>
        <div class="heading">
          Cửa Hàng Bán Xiển Bẩn cơ sở 1 nha
          <div class="author">
            <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
            <br />
            <span class="name">Người tạo:</span> Nguyễn Quốc Huy
          </div>
        </div>
      </div>
      <div @click="goAction()" class="card-v1">
        <div
          class="card-v1-image"
          :style="{
            height: '200px',
            backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
          }"
        ></div>
        <div class="category">Bị từ chối</div>
        <div class="heading">
          Cửa Hàng Bán Xiển Bẩn cơ sở 1 nha
          <div class="author">
            <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
            <br />
            <span class="name">Người tạo:</span> Nguyễn Quốc Huy
          </div>
        </div>
      </div>
      <div @click="goAction()" class="card-v1">
        <div
          class="card-v1-image"
          :style="{
            height: '200px',
            position: 'relative',
            backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
          }"
        >
          <img
            src="/src/assets/images/icon_event/logo.svg"
            v-tooltip="'Cửa Hàng Thân Thiện'"
            style="
              width: 60px;
              margin-bottom: 10px;
              position: absolute;
              top: 10px;
              left: 10px;
            "
          />
        </div>
        <div class="category">Đã đóng cửa</div>
        <div class="heading">
          Cửa Hàng Bán Xiển Bẩn cơ sở 1 nha
          <div class="author">
            <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
            <br />
            <span class="name">Người tạo:</span> Nguyễn Quốc Huy
          </div>
        </div>
      </div>
      <div @click="goAction()" class="card-v1">
        <div
          class="card-v1-image"
          :style="{
            height: '200px',
            position: 'relative',
            backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
          }"
        >
          <img
            src="/src/assets/images/icon_event/logo.svg"
            v-tooltip="'Cửa Hàng Thân Thiện'"
            style="
              width: 60px;
              margin-bottom: 10px;
              position: absolute;
              top: 10px;
              left: 10px;
            "
          />
        </div>
        <div class="category">Đang tạo</div>
        <div class="heading">
          Cửa Hàng Bán Xiển Bẩn cơ sở 1 nha
          <div class="author">
            <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
            <br />
            <span class="name">Người tạo:</span> Nguyễn Quốc Huy
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import router from "@/router";
import { storeManagerRoute } from "@/router/routeItems/storeManagerRoute";
import { commonStore } from "@/stores/common";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản Lý Cửa Hàng");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

function goAction() {
  router.push({
    name: storeManagerRoute.storeManagerForm.name,
    // state: { id: data.bannerSeq },
  });
}
</script>

<style scoped></style>
