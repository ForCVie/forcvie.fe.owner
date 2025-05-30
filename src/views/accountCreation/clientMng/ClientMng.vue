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
              <p>UserName</p>
              <InputBase v-model:modelValue="dataSearch.userName" id="userName" />
            </li>
            <li>
              <p>Họ và Tên</p>
              <InputBase v-model:modelValue="dataSearch.fullName" id="fullName" />
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
</template>

<script setup lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import router from "@/router";
import { accountCreationRoute } from "@/router/routeItems/accountCreationRoute";
import { getPageData } from "@/stores/accountCreation/clientMng/clientMng.service";
import { AdClientFilterRequest, AdClientResDTO } from "@/stores/accountCreation/clientMng/clientMng.type";
import { commonStore } from "@/stores/common";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản Lý Khách Hàng");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);

const columnDefs = ref([
  {
    headerName: t("common.rowNum"),
    flex: 0.1,
    field: "rowNum",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "UserName",
    field: "userName",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
  },
  {
    headerName: "Họ Tên",
    field: "fullName",
    cellStyle: {
      textAlign: "center",
    },
  },
]);

const dataSearch = ref<AdClientFilterRequest>({
  userName: "",
  fullName: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const data = ref([]);

onBeforeMount(async () => {
});

const goActionCreate = () => {
  router.push({
    name: accountCreationRoute.clientMngForm.name,
    params: { mode: MODE_CREATE },
  });
};

function goAction(data: AdClientResDTO) {
  router.push({
    name: accountCreationRoute.clientMngForm.name,
    params: { mode: MODE_CREATE },
    state: { id: data.id },
  });
}

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pagesSize;
  await getPageData(dataSearch.value).then((res) => {
    totalRecord.value = res.data.data.totalRecord;
    data.value = res.data.data.data.map((item: AdClientResDTO, index: number) => {
      item.rowNum =
        (dataSearch.value.page - 1) * dataSearch.value.size + index + 1;
      return item;
    });
  });
};

const clearFormSearch = () => {
  dataSearch.value = {
    fullName: "",
    userName: "",
    page: 1,
    size: PAGINATION_PAGE_SIZE,
    sort: "",
  };
};

const searchFormData = () => {
  dataSearch.value.page = 1;
  fnPagination(dataSearch.value.page, dataSearch.value.size);
};
</script>
