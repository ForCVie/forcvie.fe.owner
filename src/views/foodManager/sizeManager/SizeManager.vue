<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_1">
          <ul>
            <li>
              <p>Tên Kích Cỡ</p>
              <InputBase v-model:modelValue="dataSearch.name" id="sizeNameSearch" @keyup.enter="searchFormData"/>
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
        <GridComponentV2 
          :rowData="data" 
          :columnDefs="columnDefs" 
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize" 
          @customPagination="fnPagination" 
          :totalRecord="totalRecord"
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

    <!-- Popup Thêm/Sửa Kích Cỡ -->
    <ModalSizeForm 
        v-if="isModalOpen"
      :isOpen="isModalOpen" 
      :dataSelect="dataSelect" 
      @closeModal="closeModal"
      @confirmAction="handleConfirmAction" />
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { commonStore } from '@/stores/common';
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";
import { getPageData, removeData } from '@/stores/foodOrder/sizeMng/sizeMng.service';
import type { OwnerProductSizeFilterReq, OwnerProductSizeResDTO } from '@/stores/foodOrder/sizeMng/sizeMng.type';

import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import ModalSizeForm from "./popup/ModalSizeForm.vue";
import { useAlert, useConfirm } from '@/components/common/composables/useAlert';

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const pageTitle = ref("Quản Lý Kích Cỡ");
const breadcrumbItems = ref([
  { label: "Trang chủ", link: "/" },
  { label: "Quản lý kích cỡ", link: "" }
]);

const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);
const isModalOpen = ref(false);
const dataSelect = ref<string>();

const columnDefs = ref([
  { headerName: "#", field: "rowNum", flex: 0.2, cellStyle: { textAlign: 'center' } },
  {
    headerName: "Tên Kích Cỡ",
    field: "name",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: (params: any) => openModalForEdit(params.data.sizeSeq), },
  },
  { headerName: "Mô tả", field: "description", flex: 1.5 },
  { headerName: "Ngày tạo", field: "createdDate", flex: 0.5, cellStyle: { textAlign: "center" } },
  {
    headerName: "Chức năng",
    field: "sizeSeq",
    cellStyle: { textAlign: "center" },
    cellRenderer: ButtonGridComponent,
    cellRendererParams: {
      onCustomEvent: (params: any) => onRemove(params.data.sizeSeq),
      className: "btn_round btn_xs btn_red",
      value: "Xóa"
    },
    flex: 0.3
  }
]);

const dataSearch = ref<OwnerProductSizeFilterReq>({
  name: "",
  foodStoreSeq: "STORE_001", // Lấy từ store của owner
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const data = ref<OwnerProductSizeResDTO[]>([]);

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
    data.value = res.data.data.data.map((item: OwnerProductSizeResDTO, index: number) => ({
      ...item,
      rowNum: (dataSearch.value.page - 1) * dataSearch.value.size + index + 1,
      // Format ngày tạo nếu cần
      createdDate: item.createdDate ? new Date(item.createdDate).toLocaleDateString('vi-VN') : ''
    }));
  } catch (e) {
    console.error(e);
    data.value = [];
    totalRecord.value = 0;
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

const openModalForEdit = (item: OwnerProductSizeResDTO) => {
  dataSelect.value = item.sizeSeq;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleConfirmAction = () => {
  closeModal();
  searchFormData(); // Load lại dữ liệu sau khi thêm/sửa thành công
};

const onRemove = async (id: string) => {
  confirm(
    t("common.message.confirmDelete"),
    t("common.confirmTitle"),
    async () => {
      if (id) {
        await removeData(id).then((res) => {
          alert(
            t("common.message.deleteSuccess"),
            t("common.alertTitle"),
            () => {
              handleConfirmAction();
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