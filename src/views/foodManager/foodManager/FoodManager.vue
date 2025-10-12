<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>Tên món ăn</p>
              <InputBase v-model:modelValue="dataSearch.name" id="productName" />
            </li>
            <li>
              <p>Mục lục</p>
              <SelectBoxBaseSearch id="categorySearch" v-model="dataSearch.categorySeq" :data="listCategoryForSearch"
                :value-select-all="t('common.all')" />
            </li>
            <li>
              <p>Trạng thái</p>
              <RadiobuttonBase v-for="item in listUseYn" :key="item.cdId" :value="item.cdId" v-model="dataSearch.useYn"
                :id="`useYn_${item.cdId}`" :name="`useYn_search`" :label="`${item.cdNm}`" />
            </li>
          </ul>
        </div>
        <div class="btn_group btn_center">
          <button class="button btn_xs btn_lightgray btn_responsive" @click="clearFormSearch()">
            {{ t("common.reset") }}
          </button>
          <button class="button btn_xs btn_blue btn_responsive" @click="searchFormData()">
            {{ t("common.search") }}
          </button>
        </div>
      </div>
    </div>

    <div class="box dp_block">
      <div class="box_inner">
        <GridComponentV2 :rowData="data" :rowHeight="100" :columnDefs="columnDefs" :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize" @customPagination="fnPagination" :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector">
          <template #button>
            <div>
              <ButtonBase class="btn_round btn_xs btn_primary mg_l10" @click="handleBulkAction('deactivate')">
                Ngưng sử dụng
              </ButtonBase>
              <ButtonBase class="btn_round btn_xs btn_primary mg_l10" @click="handleBulkAction('activate')">
                Sử dụng
              </ButtonBase>
              <ButtonBase class="btn_round btn_xs btn_primary mg_l10" @click="handleBulkAction('remove')">
                {{ t("common.delete") }}
              </ButtonBase>
              <ButtonBase class="btn_round btn_xs btn_primary mg_l10" @click="goActionCreate">
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
import { ref, onBeforeMount, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import router from "@/router";
import { commonStore } from "@/stores/common";
import { useAlert, useConfirm } from '@/components/common/composables/useAlert';

// Constants and Utils
import { UP_CD_USE_YN } from "@/constants/common.const";
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { foodManagerRoute } from "@/router/routeItems/foodManagerRoute"; // Thay thế bằng route của bạn

// Services & Types
import { getPageData, activateProducts, deactivateProducts, removeProducts } from '@/stores/foodOrder/productMng/productMng.service';
import type { OwnerProductFilterReq, OwnerProductResDTO, OwnerProductActionReq } from '@/stores/foodOrder/productMng/productMng.type';
import { getAllCategories } from '@/stores/foodOrder/productCategory/productCategory.service'; // Lấy service từ file danh mục

// Components
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import ImgGridComponent from "@/components/common/grid/ImgGridComponent.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { OwnerProductCategoryFilterReq } from '@/stores/foodOrder/productCategory/productCategory.type';

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const pageTitle = ref("Quản lý món ăn");
const breadcrumbItems = ref([{ label: "Trang chủ", link: "/" }, { label: pageTitle.value, link: "" }]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);
const listCheckBoxGrid = ref<string[]>([]);
const goAction = (item: OwnerProductResDTO) => {
  router.push({
    name: foodManagerRoute.foodManagerForm.name,
    state: { id: item.productSeq },
  });
};

const selectAll = ref(false); // thêm biến trạng thái chọn tất cả

const columnDefs = ref([
  {
    headerComponent: CheckboxGrid,
    headerComponentParams: {
      onCustomEvent: checkAll, // ✅ thêm event click ở header
      valueChecked: selectAll.value,
      type: "selectAll",
      selectAllGridId: "selectAllGridId01",
      childName: "childName",
    },
    cellRenderer: CheckboxGrid,
    cellRendererParams: {
      onCustomEvent: checkChild, // ✅ click từng dòng
      type: "selectChild",
      selectAllGridId: "selectAllGridId01",
      childName: "childName",
    },
    field: "checkedFlag",
    width: 60,
    flex: 0.3,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  { headerName: "Ảnh", field: "imageUrl", cellRenderer: ImgGridComponent, flex: 0.5 },
  {
    headerName: "Tên món",
    field: "name",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
  },
  { headerName: "Mục lục", field: "categoryName", cellStyle: { textAlign: "center" } },
  { headerName: "Ngày tạo", field: "createdDate", cellStyle: { textAlign: "center" } },
  {
    headerName: "Trạng thái",
    field: "useYn",
    cellStyle: { textAlign: "center" },
    valueFormatter: (params: any) => (params.value === "N" ? "Không sử dụng" : "Sử dụng"),
  },
]);


const dataSearch = ref<OwnerProductFilterReq>({
  name: "",
  categorySeq: "",
  foodStoreSeq: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
  useYn: "",
});

const dataSearchCategory = ref<OwnerProductCategoryFilterReq>({
  name: "",
  foodStoreSeq: "", // TODO: Lấy từ store của owner
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const data = ref<OwnerProductResDTO[]>([]);
const listUseYn = ref<any[]>([]);
const listCategoryForSearch = ref<any[]>([]);

onBeforeMount(async () => {
  store.setLoading(true);
  try {
    // Lấy danh sách trạng thái
    const codeMngRes = await getListCodeMng({ upCdIdList: [UP_CD_USE_YN] });
    listUseYn.value = codeMngRes.data.data.filter((item: any) => item.upCdId == UP_CD_USE_YN);
    listUseYn.value.unshift({ cdId: "", cdNm: t("common.all") });

    // Lấy danh sách mục lục cho ô search
    const categoryRes = await getAllCategories(dataSearchCategory.value);
    listCategoryForSearch.value = categoryRes.data.data.map((c: any) => ({
      cdId: c.categorySeq,
      cdNm: c.name,
    }));
  } catch (e) {
    console.error("Lỗi khi tải dữ liệu khởi tạo:", e);
  } finally {
    store.setLoading(false);
    await searchFormData();
  }
});

const fnPagination = async (pageNumber: number, pageSize: number) => {
  store.setLoading(true);
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pageSize;

  try {
    const res = await getPageData(dataSearch.value);
    totalRecord.value = res.data.data.totalRecord;

    data.value = res.data.data.data.map((item: OwnerProductResDTO, index: number) => ({
      ...item,
      rowNum: (dataSearch.value.page - 1) * dataSearch.value.size + index + 1,
      createdDate: item.createdDate
        ? new Date(item.createdDate).toLocaleDateString("vi-VN")
        : "",
      checkedFlag: listCheckBoxGrid.value.includes(item.productSeq), // ✅ hiển thị lại đúng trạng thái
    }));

    // cập nhật lại trạng thái selectAll nếu tất cả items đều được chọn
    selectAll.value =
      data.value.length > 0 &&
      data.value.every((item) => listCheckBoxGrid.value.includes(item.productSeq));
  } catch (e) {
    console.error(e);
  } finally {
    store.setLoading(false);
  }
};


const clearFormSearch = () => {
  dataSearch.value.name = "";
  dataSearch.value.categorySeq = null;
  dataSearch.value.useYn = "";
  searchFormData();
};

const searchFormData = () => {
  dataSearch.value.page = 1;
  listCheckBoxGrid.value = []; // Reset checkbox khi tìm kiếm
  fnPagination(dataSearch.value.page, dataSearch.value.size);
};

const goActionCreate = () => {
  router.push({ name: foodManagerRoute.foodManagerForm.name });
};

// const goAction = (item: OwnerProductResDTO) => {
//   router.push({
//     name: foodManagerRoute.foodManagerForm.name,
//     state: { id: item.productSeq },
//   });
// };

function checkChild(value: boolean, rowData: OwnerProductResDTO) {
  rowData.checkedFlag = value;
  if (value) {
    if (!listCheckBoxGrid.value.includes(rowData.productSeq)) {
      listCheckBoxGrid.value.push(rowData.productSeq);
    }
  } else {
    const index = listCheckBoxGrid.value.indexOf(rowData.productSeq);
    if (index !== -1) listCheckBoxGrid.value.splice(index, 1);
  }

  selectAll.value =
    data.value.length > 0 &&
    data.value.every((item) => listCheckBoxGrid.value.includes(item.productSeq));
}


function checkAll(value: boolean) {
  selectAll.value = value;
  data.value.forEach((item) => {
    item.checkedFlag = value;
    if (value) {
      if (!listCheckBoxGrid.value.includes(item.productSeq)) {
        listCheckBoxGrid.value.push(item.productSeq);
      }
    } else {
      const index = listCheckBoxGrid.value.indexOf(item.productSeq);
      if (index !== -1) listCheckBoxGrid.value.splice(index, 1);
    }
  });
}


const handleBulkAction = async (actionType: 'activate' | 'deactivate' | 'remove') => {
  if (listCheckBoxGrid.value.length === 0) {
    alert(t("common.message.noItemSelected"), t("common.alertTitle"));
    return;
  }

  const actionMap = {
    activate: { service: activateProducts, confirmMsg: "xác nhận kích hoạt" },
    deactivate: { service: deactivateProducts, confirmMsg: "xác nhận ngừng hoạt động" },
    remove: { service: removeProducts, confirmMsg: t("common.message.confirmDelete") },
  };

  const selectedAction = actionMap[actionType];

  confirm(selectedAction.confirmMsg, t("common.confirmTitle"), async () => {
    store.setLoading(true);
    try {
      const payload: OwnerProductActionReq = { productSeqs: listCheckBoxGrid.value };
      await selectedAction.service(payload);
      alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {
        searchFormData();
      });
    } catch (e) {
      console.error(e);
      alert(t("common.message.error"), t("common.alertTitle"));
    } finally {
      store.setLoading(false);
    }
  });
};
</script>

<style>
.ag-cell-value.ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>