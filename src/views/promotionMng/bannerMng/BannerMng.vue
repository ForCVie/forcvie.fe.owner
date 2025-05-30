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
              <p>Tiêu Đề</p>
              <InputBase v-model:modelValue="dataSearch.bannerNm" id="bannerNm" />
            </li>
            <li>
              <p>URL</p>
              <InputBase
                v-model:modelValue="dataSearch.url"
                id="url"
              />
            </li>
            <li>
              <p>Thể Loại</p>
              <InputBase
                v-model:modelValue="dataSearch.typeCd"
                id="typeCd"
              />
            </li>
            <li>
              <p>Sử Dụng</p>
              <RadiobuttonBase
                  v-for="item in listUseYn"
                  :value="item.cdId"
                  v-model="dataSearch.useYn"
                  :id="`${item.cdId}_${item.upCdId}`"
                  :name="`${item.cdId}`"
                  :key="item.cdId"
                  :checked="item.cdId == dataSearch.useYn"
                  :label="`${item.cdNm}`"
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
</template>

<script setup lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import { UP_CD_USE_YN } from "@/constants/common.const";
import {
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import router from "@/router";
import { promotionRoute } from "@/router/routeItems/promotionRoute";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getPageData } from "@/stores/promotionMng/bannerMng/bannerMng.service";
import { AdBannerFilterReq, AdBannerResDTO } from "@/stores/promotionMng/bannerMng/bannerMng.type";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản Lý Role");
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
    headerName: "Tiêu Đề",
    field: "bannerNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
  },
  {
    headerName: "URL",
    field: "url",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Sử Dụng",
    field: "useYn",
    cellStyle: {
      textAlign: "center",
    },
  },
]);

const dataSearch = ref<AdBannerFilterReq>({
  bannerNm: "",
  typeCd: "",
  url: "",
  useYn: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const data = ref([]);

const listUseYn = ref<CodeMngModel[]>();

onBeforeMount(async () => {
  store.setLoading(true);
  
  await getListCodeMng({ upCdIdList: [UP_CD_USE_YN] }).then(
    (res) => {
      listUseYn.value = res.data.data.filter(
        (item: CodeMngModel) => item.upCdId == UP_CD_USE_YN
      );
      listUseYn.value?.unshift({
          cdId: "",
          cdNm: t("common.all"),
          upCdId: UP_CD_USE_YN,
        });
    });
  store.setLoading(false);
});

const goActionCreate = () => {
  router.push({
    name: promotionRoute.bannerMngForm.name,
    params: { mode: MODE_CREATE },
  });
};

function goAction(data: AdBannerResDTO) {
  router.push({
    name: promotionRoute.bannerMngForm.name,
    params: { mode: MODE_CREATE },
    state: { id: data.bannerSeq },
  });
}

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pagesSize;
  await getPageData(dataSearch.value).then((res) => {
    totalRecord.value = res.data.data.totalRecord;
    data.value = res.data.data.data.map(
      (item: AdBannerResDTO, index: number) => {
        item.rowNum =
          (dataSearch.value.page - 1) * dataSearch.value.size + index + 1;
        return item;
      }
    );
  });
};

const clearFormSearch = () => {
  dataSearch.value = {
    bannerNm: "",
    typeCd: "",
    url: "",
    useYn: "",
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
