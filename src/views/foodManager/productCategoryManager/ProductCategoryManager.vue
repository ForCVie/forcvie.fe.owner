<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_1">
          <ul>
            <li>
              <p>Tên Danh Mục</p>
              <InputBase v-model:modelValue="dataSearch.name" id="categoryNameSearch" @keyup.enter="searchFormData" />
            </li>
          </ul>
        </div>
        <div class="btn_group btn_end">
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
              <ButtonBase type="button" class="btn_round btn_xs btn_primary mg_l10" @click="openModalForCreate">
                {{ t("common.add") }}
              </ButtonBase>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>

    <!-- Popup Thêm/Sửa Danh Mục -->
    <ModalProductCategoryForm v-if="isModalOpen" :isOpen="isModalOpen" :dataSelect="dataSelect" @closeModal="closeModal"
      @confirmAction="handleConfirmAction" />
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { commonStore } from '@/stores/common';
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";

import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import { useAlert, useConfirm } from '@/components/common/composables/useAlert';
import { OwnerProductCategoryResDTO, OwnerProductCategoryFilterReq } from '@/stores/foodOrder/productCategory/productCategory.type';
import { getPageData, removeData } from '@/stores/foodOrder/productCategory/productCategory.service';
import ModalProductCategoryForm from "./popup/ModalProductCategoryForm.vue";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const pageTitle = ref("Quản Lý Danh Mục");
const breadcrumbItems = ref([
  { label: "Trang chủ", link: "/" },
  { label: "Quản lý danh mục", link: "" }
]);

const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);
const isModalOpen = ref(false);
const dataSelect = ref<string>();

const columnDefs = ref([
  { headerName: "#", field: "rowNum", flex: 0.2, cellStyle: { textAlign: 'center' } },
  {
    headerName: "Tên Danh Mục",
    field: "name",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: (data: OwnerProductCategoryResDTO) => openModalForEdit(data) },
  },
  { headerName: "Ngày tạo", field: "createdDate", flex: 0.5, cellStyle: { textAlign: "center" } },
  {
    headerName: "Chức năng",
    field: "categorySeq",
    cellStyle: { textAlign: "center" },
    cellRenderer: ButtonGridComponent,
    cellRendererParams: {
      onCustomEvent: (data: OwnerProductCategoryResDTO) => onRemove(data),
      className: "btn_round btn_xs btn_red",
      value: "Xóa"
    },
    flex: 0.3
  }
]);

const dataSearch = ref<OwnerProductCategoryFilterReq>({
  name: "",
  foodStoreSeq: "", // TODO: Lấy từ store của owner
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const data = ref<OwnerProductCategoryResDTO[]>([]);

onBeforeMount(() => {
  searchFormData();
});

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  store.setLoading(true);
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pagesSize;
  try {
    const res = await getPageData(dataSearch.value);
    totalRecord.value = res.data.data.totalRecord;
    data.value = res.data.data.data.map((item: OwnerProductCategoryResDTO, index: number) => ({
      ...item,
      rowNum: (dataSearch.value.page - 1) * dataSearch.value.size + index + 1,
      createdDate: item.createdDate ? new Date(item.createdDate).toLocaleDateString('vi-VN') : ''
    }));
  } catch(e) {
    console.error(e);
  } finally {
    store.setLoading(false);
  }
};

const searchFormData = () => {
  dataSearch.value.page = 1;
  fnPagination(dataSearch.value.page, dataSearch.value.size);
};

const clearFormSearch = () => {
  dataSearch.value.name = "";
  searchFormData();
};

const openModalForCreate = () => {
  dataSelect.value = "";
  isModalOpen.value = true;
};

const openModalForEdit = (item: OwnerProductCategoryResDTO) => {
  dataSelect.value = item.categorySeq;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleConfirmAction = () => {
  closeModal();
  searchFormData();
};

const onRemove = async (item: OwnerProductCategoryResDTO) => {
  confirm(
    t("common.message.confirmDelete"),
    t("common.confirmTitle"),
    async () => {
      if (item.categorySeq) {
        await removeData(item.categorySeq).then(() => {
          alert(
            t("common.message.deleteSuccess"),
            t("common.alertTitle"),
            () => {
              searchFormData();
            }
          );
        });
      }
    }
  );
};
</script>

<style>
.ag-cell {
  display: flex;
  align-items: center;
}
</style>
