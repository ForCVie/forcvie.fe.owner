<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>Url</p>
              <InputBase
                v-model="dataSearch.url"
                id="url"
                placeholder="Enter some text here"
                required
              />
            </li>
            <li>
              <p>Resource</p>
              <InputBase
                v-model="dataSearch.rsNm"
                id="rsNm"
                placeholder="Enter some text here"
                required
              />
            </li>
            <li>
              <p>Method</p>
              <InputBase
                v-model="dataSearch.httpMethod"
                id="httpMethod"
                placeholder="Enter some text here"
                required
              />
            </li>
          </ul>
        </div>
        <div class="btn_group btn_end">
          <button
            class="button btn_xs btn_lightgray btn_responsive"
            @click="clearFormSearch()"
          >
            {{ t("common.reset") }}
          </button>
          <button
            class="button btn_xs btn_blue btn_responsive"
            @click="searchFormData()"
          >
            {{ t("common.search") }}
          </button>
        </div>
      </div>
    </div>

    <div class="box dp_block">
      <div class="box_inner">
        <GridComponentV2
          :rowData="data"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div>
              <button
                type="button"
                class="btn_round btn_xs btn_primary mg_l10"
                @click="goActionCreate"
              >
                {{ t("common.add") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
  <ResourceMngModal :is-open="isOpen" :onClose="onClose"/>
</template>

<script setup lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import ResourceMngModal from "./ResourceMngModal.vue";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản Lý Resource");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);

const columnDefs = ref([
  {
    headerName: t('common.rowNum'),
    flex: 0.1,
    field: "rowNum"
  },
  {
    headerName: "Tên",
    field: "rsNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
    cellStyle: {
      color: "#2704FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  {
    headerName: "url",
    field: "url",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Method",
    field: "httpMethod",
    cellStyle: {
      textAlign: "center",
    },
  },
]);

const dataSearch = ref({
  url: "",
  rsNm: "",
  httpMethod: "",
  rsType: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const data = ref([]);

const isOpen = ref(false);

const onClose = () => {
  isOpen.value = false;
}

const goActionCreate = () => {
  isOpen.value = true;
};

function goAction(data: any) {}

const fnPagination = () => {};

const clearFormSearch = () => {};

const searchFormData = () => {};
</script>
