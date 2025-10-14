<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_2">
          <ul>
            <li>
              <p>Tên Menu</p>
              <InputBase v-model:modelValue="dataSearch.name" id="menuName" />
            </li>
            <li>
              <p>Trạng thái</p>
                      <RadiobuttonBase  v-for="item in listUseYn" :key="item.cdId" :value="item.cdId" v-model="dataSearch.useYn"
                :id="`useYn_${item.cdId}`" :name="`user_search`" :label="`${item.cdNm}`" :checked="item.cdId == dataSearch.useYn">
                        Checkbox 1
                      </RadiobuttonBase>
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
        <GridComponentV2 :rowData="data" :columnDefs="columnDefs" :paginationClientFlag="false"
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
import { useAlert, useConfirm } from '@/components/common/composables/useAlert';
import router from "@/router";
import { commonStore } from "@/stores/common";
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// Constants and Utils
import { UP_CD_USE_YN } from "@/constants/common.const";
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";
import { foodManagerRoute } from "@/router/routeItems/foodManagerRoute";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";

// Services & Types
import { activateMenus, deactivateMenus, getPageData, removeMenus } from '@/stores/foodOrder/menuMng/menu.service';
import type { OwnerMenuActionReq, OwnerMenuFilterReq, OwnerMenuResDTO } from '@/stores/foodOrder/menuMng/menu.type';

// Components
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const pageTitle = ref("Quản lý Menu");
const breadcrumbItems = ref([{ label: "Trang chủ", link: "/" }, { label: pageTitle.value, link: "" }]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);
const listCheckBoxGrid = ref<string[]>([]);
const selectAll = ref(false);

const goActionEdit = (item: OwnerMenuResDTO) => {
  router.push({
    name: foodManagerRoute.menuManagerForm.name,
    state: { id: item.menuSeq },
  });
};

const columnDefs = ref([
  {
    headerComponent: CheckboxGrid,
    headerComponentParams: {
      onCustomEvent: checkAll,
      valueChecked: selectAll,
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
    width: 60,
    flex: 0.3,
    cellStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
  },
  {
    headerName: "Tên Menu",
    field: "name",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goActionEdit },
  },
  { headerName: "Mô tả", field: "description", flex: 1.5 },
  { headerName: "Ngày tạo", field: "createdDate", cellStyle: { textAlign: "center" } },
  {
    headerName: "Trạng thái",
    field: "useYn",
    cellStyle: { textAlign: "center" },
    valueFormatter: (params: any) => (params.value === "N" ? "Không sử dụng" : "Sử dụng"),
  },
]);

const dataSearch = ref<OwnerMenuFilterReq>({
  name: "",
  foodStoreSeq: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
  useYn: "",
});

const data = ref<OwnerMenuResDTO[]>([]);
const listUseYn = ref<any[]>([]);

onBeforeMount(async () => {
  store.setLoading(true);
  try {
    // Lấy danh sách trạng thái
    const codeMngRes = await getListCodeMng({ upCdIdList: [UP_CD_USE_YN] });
    listUseYn.value = codeMngRes.data.data.filter((item: any) => item.upCdId == UP_CD_USE_YN);
    listUseYn.value.unshift({ cdId: "", cdNm: t("common.all") });
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
    data.value = res.data.data.data.map((item: OwnerMenuResDTO, index: number) => ({
      ...item,
      rowNum: (dataSearch.value.page - 1) * dataSearch.value.size + index + 1,
      createdDate: item.createdDate ? new Date(item.createdDate).toLocaleDateString("vi-VN") : "",
      checkedFlag: listCheckBoxGrid.value.includes(item.menuSeq),
    }));
    
    // Cập nhật lại trạng thái selectAll nếu tất cả items đều được chọn
    selectAll.value = data.value.length > 0 && data.value.every((item) => listCheckBoxGrid.value.includes(item.menuSeq));
  } catch (e) {
    console.error(e);
  } finally {
    store.setLoading(false);
  }
};

const clearFormSearch = () => {
  dataSearch.value.name = "";
  dataSearch.value.useYn = "";
  searchFormData();
};

const searchFormData = () => {
  dataSearch.value.page = 1;
  listCheckBoxGrid.value = [];
  selectAll.value = false;
  fnPagination(dataSearch.value.page, dataSearch.value.size);
};

const goActionCreate = () => {
  router.push({ name: foodManagerRoute.menuManagerForm.name });
};

function checkChild(value: boolean, rowData: OwnerMenuResDTO) {
  rowData.checkedFlag = value;
  if (value) {
    if (!listCheckBoxGrid.value.includes(rowData.menuSeq)) {
      listCheckBoxGrid.value.push(rowData.menuSeq);
    }
  } else {
    const index = listCheckBoxGrid.value.indexOf(rowData.menuSeq);
    if (index !== -1) listCheckBoxGrid.value.splice(index, 1);
  }
  
  // Cập nhật trạng thái selectAll
  selectAll.value = data.value.length > 0 && data.value.every((item) => listCheckBoxGrid.value.includes(item.menuSeq));
}

function checkAll(value: boolean) {
  selectAll.value = value;
  data.value.forEach((item) => {
    item.checkedFlag = value;
    if (value) {
      if (!listCheckBoxGrid.value.includes(item.menuSeq)) {
        listCheckBoxGrid.value.push(item.menuSeq);
      }
    } else {
      const index = listCheckBoxGrid.value.indexOf(item.menuSeq);
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
    activate: { service: activateMenus, confirmMsg: "Xác nhận sử dụng các menu đã chọn?" },
    deactivate: { service: deactivateMenus, confirmMsg: "Xác nhận ngưng sử dụng các menu đã chọn?" },
    remove: { service: removeMenus, confirmMsg: t("common.message.confirmDelete") },
  };
  
  const selectedAction = actionMap[actionType];
  
  confirm(selectedAction.confirmMsg, t("common.confirmTitle"), async () => {
    store.setLoading(true);
    try {
      const payload: OwnerMenuActionReq = { menuSeqs: listCheckBoxGrid.value };
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