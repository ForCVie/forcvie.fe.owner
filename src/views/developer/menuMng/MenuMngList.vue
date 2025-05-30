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
              <p>Tên Menu</p>
              <InputBase v-model:modelValue="dataSearch.nm" id="nm" />
            </li>
            <li>
              <p>Sử Dụng</p>
              <RadiobuttonBase
                v-for="item in radioUseYn"
                :value="item.cdId"
                v-model="dataSearch.useYn"
                :id="`${item.cdId}_${item.upCdId}`"
                :name="`${item.cdId}`"
                :key="item.cdId"
                :checked="item.cdId == dataSearch.useYn"
                :label="`${item.cdNm}`"
              />
            </li>
            <li>
              <p>Loại Site</p>
              <SelectBoxBase
                :id="'siteType'"
                :name="'siteType'"
                v-model="dataSearch.siteType"
                :data="listSiteType"
                :required="true"
              />
            </li>
            <li>
              <p>Menu Cha</p>
              <SelectBoxBaseSearch
                :id="'parentId'"
                :name="'parentId'"
                v-model="dataSearch.parentId"
                :data="listMenuParent"
                :value-select-all="t('common.select')"
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
import { UP_CD_SITE, UP_CD_USE_YN } from "@/constants/common.const";
import {
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import router from "@/router";
import { developRoute } from "@/router/routeItems/developRoute";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  getDataForm,
  getPageData,
} from "@/stores/developer/menu/menuMng.service";
import {
  AdMenuFilterRequest,
  AdMenuResDTO,
} from "@/stores/developer/menu/menuMng.type";

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
    headerName: "Tên",
    field: "nm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
  },
  {
    headerName: "Site Type",
    field: "siteType",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Sử dụng",
    field: "useYn",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Menu Cha",
    field: "parent",
    cellStyle: {
      textAlign: "center",
    },
  },
]);

const dataSearch = ref<AdMenuFilterRequest>({
  nm: "",
  parentId: "",
  siteType: "",
  useYn: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const radioUseYn = ref<CodeMngModel[]>();
const listSiteType = ref<CodeMngModel[]>();
const listMenuParent = ref<CodeMngModel[]>();

const data = ref([]);

onBeforeMount(async () => {
  store.setLoading(true);
  await getListCodeMng({ upCdIdList: [UP_CD_USE_YN, UP_CD_SITE] }).then(
    (res) => {
      radioUseYn.value = res.data.data.filter(
        (item: CodeMngModel) => item.upCdId == UP_CD_USE_YN
      );
      listSiteType.value = res.data.data.filter(
        (item: CodeMngModel) => item.upCdId == UP_CD_SITE
      );

      radioUseYn.value?.unshift({
        cdId: "",
        cdNm: t("common.select"),
        upCdId: UP_CD_USE_YN,
      });
      listSiteType.value?.unshift({
        cdId: "",
        cdNm: t("common.select"),
        upCdId: UP_CD_USE_YN,
      });
    }
  );
  await getDataForm([""]).then((res) => {
    listMenuParent.value = res.data.data.parentList;
    listMenuParent.value?.unshift({
      cdId: "",
      cdNm: t("common.select"),
      upCdId: "MENU_PARENT",
    });
  });
  store.setLoading(false);
});

const goActionCreate = () => {
  router.push({
    name: developRoute.menuManagementForm.name,
    params: { mode: MODE_CREATE },
  });
};

function goAction(data: AdMenuResDTO) {
  router.push({
    name: developRoute.menuManagementForm.name,
    params: { mode: MODE_CREATE },
    state: { id: data.menuId },
  });
}

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pagesSize;
  await getPageData(dataSearch.value).then((res) => {
    totalRecord.value = res.data.data.totalRecord;
    data.value = res.data.data.data.map((item: AdMenuResDTO, index: number) => {
      item.rowNum =
        (dataSearch.value.page - 1) * dataSearch.value.size + index + 1;
      return item;
    });
  });
};

const clearFormSearch = () => {
  dataSearch.value = {
    nm: "",
    parentId: "",
    siteType: "",
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
