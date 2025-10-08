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
              <p>Tên thực đơn</p>
              <InputBase
                v-model:modelValue="dataSearch.bannerNm"
                id="bannerNm"
              />
            </li>
            <li>
              <p>Mặc định</p>
              <InputBase v-model:modelValue="dataSearch.url" id="url" />
            </li>
            <li>
              <p>Trạng thái</p>
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
        <div class="btn_group btn_center">
          <ButtonBase
            class="button btn_xs btn_lightgray btn_responsive"
            :buttonName="t('common.reset')"
            @click="clearFormSearch()"
          >
            {{ t("common.reset") }}
          </ButtonBase>
          <ButtonBase
            class="button btn_xs btn_blue btn_responsive"
            @click="searchFormData()"
          >
            {{ t("common.search") }}
          </ButtonBase>
        </div>
      </div>
    </div>

    <div class="box dp_block">
      <div class="box_inner">
        <GridComponentV2
          :rowData="data"
          :rowHeight="150"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div>
              <ButtonBase
                type="button"
                class="btn_round btn_xs btn_primary mg_l10"
                @click="goActionCreate"
              >
                Ngừng hoạt động
              </ButtonBase>
              <ButtonBase
                type="button"
                class="btn_round btn_xs btn_primary mg_l10"
                @click="goActionCreate"
              >
                Hoạt động
              </ButtonBase>
              <ButtonBase
                type="button"
                class="btn_round btn_xs btn_primary mg_l10"
                @click="goActionCreate"
              >
                {{ t("common.delete") }}
              </ButtonBase>
              <ButtonBase
                type="button"
                class="btn_round btn_xs btn_primary mg_l10"
                @click="goActionCreate"
              >
                {{ t("common.add") }}
              </ButtonBase>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BtnGridComponent from "@/components/common/grid/BtnGridComponent.vue";
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import ImgGridComponent from "@/components/common/grid/ImgGridComponent.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import { UP_CD_USE_YN } from "@/constants/common.const";
import {
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import router from "@/router";
import { employeeManagerRoute } from "@/router/routeItems/employeeManagerRoute";
import { foodManagerRoute } from "@/router/routeItems/foodManagerRoute";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
// import { getPageData } from "@/stores/promotionMng/bannerMng/bannerMng.service";
import {
  AdBannerFilterReq,
  AdBannerResDTO,
} from "@/stores/promotionMng/bannerMng/bannerMng.type";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản lý thực đơn");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);
const selectAll = ref(false);

const columnDefs = ref([
  {
    headerComponent: CheckboxGrid,
    headerComponentParams: {
      onCustomEvent: checkAll,
      valueChecked: selectAll.value,
      type: "selectAll",
      selectAllGridId: "selectAllGridId01",
      childName: "childName",
    },
    cellRenderer: CheckboxGrid,
    cellRendererParams: {
      onCustomEvent: checkChild,
      type: "selectChild",
      selectAllGridId: "selectAllGridId01",
      childName: "childName",
    },
    field: "checkedFlag",
    width: 10,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    flex:.3
  },
  {
    headerName: "Ảnh",
    field: "img",
    cellRenderer: ImgGridComponent,
    cellRendererParams: (params) => {
      return {
        img: params.data.img,
      }
    }
  },
  {
    headerName: "Tên món",
    field: "bannerNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
  },
  {
    headerName: "Mục lục",
    field: "useYn",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Ngày tạo",
    field: "url",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Trạng thái",
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
const listCheckBoxGrid = ref<string[]>([]);

onBeforeMount(async () => {
  // store.setLoading(true);
  // await getListCodeMng({ upCdIdList: [UP_CD_USE_YN] }).then(
  //   (res) => {
  //     listUseYn.value = res.data.data.filter(
  //       (item: CodeMngModel) => item.upCdId == UP_CD_USE_YN
  //     );
  //     listUseYn.value?.unshift({
  //         cdId: "",
  //         cdNm: t("common.all"),
  //         upCdId: UP_CD_USE_YN,
  //       });
  //   });
  // store.setLoading(false);
});

const goActionCreate = () => {
  router.push({
    name: foodManagerRoute.foodManagerForm.name,
  });
};

function goAction(data: AdBannerResDTO) {
  router.push({
    name: foodManagerRoute.foodManagerForm.name,
    state: { id: data.bannerSeq },
  });
}

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pagesSize;
  data.value = [
    {
      img: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597822154096-LK0WD8P39LYLJAG0PXJ6/chup-anh-thuc-an-1.jpg",
      rowNum: 1,
      bannerNm: "Test Banner",
      url: "http://example.com",
      useYn: "Y",
    },
  ];
  //   await getPageData(dataSearch.value).then((res) => {
  //     totalRecord.value = res.data.data.totalRecord;
  //     data.value = res.data.data.data.map(
  //       (item: AdBannerResDTO, index: number) => {
  //         item.rowNum =
  //           (dataSearch.value.page - 1) * dataSearch.value.size + index + 1;
  //         return item;
  //       }
  //     );
  //   });
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

function checkAll(value: boolean) {
  data.value.forEach((item) => {
    item.checkedFlag = value;
    if (value) {
      listCheckBoxGrid.value.push(item.id);
    } else {
      const index = listCheckBoxGrid.value.indexOf(item.id);
      if (index !== -1) {
        listCheckBoxGrid.value.splice(index, 1);
      }
    }
    // return {
    //   ...item,
    //   checkedFlag: value
    // }
  });

  listCheckBoxGrid.value = [...new Set(listCheckBoxGrid.value)];
}
function checkChild(value: boolean, rowData: any) {
  rowData.checkedFlag = value;
  if (value) {
    listCheckBoxGrid.value.push(rowData.id);
  } else {
    const index = listCheckBoxGrid.value.indexOf(rowData.id);
    if (index !== -1) {
      listCheckBoxGrid.value.splice(index, 1);
    }
  }
  listCheckBoxGrid.value = [...new Set(listCheckBoxGrid.value)];
}
</script>
<style>
.ag-cell-value.ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height {
  display: flex;
  align-items: center;
  justify-content: center;
}</style>