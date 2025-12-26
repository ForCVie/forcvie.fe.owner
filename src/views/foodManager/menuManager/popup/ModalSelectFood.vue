<template>
  <!-- Start Popup Select Food -->
  <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" size="xl" @close-modal="closeModal">
    <!-- Header -->
    <template #title>
      <strong>Chọn món ăn</strong>
    </template>

    <!-- Body -->
    <template #default>
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
          </ul>
        </div>

        <div class="btn_group btn_center">
          <ButtonBase class="button btn_xs btn_lightgray btn_responsive" @click="clearFormSearch">
            {{ t('common.reset') }}
          </ButtonBase>
          <ButtonBase class="button btn_xs btn_blue btn_responsive" @click="searchFormData">
            {{ t('common.search') }}
          </ButtonBase>
        </div>
        <div class="box_inner mt_10">
          <GridComponentV2 :rowData="data" :rowHeight="100" :columnDefs="columnDefs" :paginationClientFlag="false"
            :paginationPageSize="paginationPageSize" @customPagination="fnPagination" :totalRecord="totalRecord"
            :paginationPageSizeSelector="paginationPageSizeSelector" />
        </div>
      </div>
    </template>

    <!-- Footer -->
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close" @click="closeModal">
        Đóng
      </button>
      <button type="button" class="button btn_xl btn_blue" @click="confirmAction">
        Xác nhận
      </button>
    </template>
  </TModal>
  <!-- End Popup Select Food -->
</template>

<script setup lang="ts">
import CheckboxGrid from '@/components/common/grid/CheckboxGrid.vue';
import ImgGridComponent from '@/components/common/grid/ImgGridComponent.vue';
import { UP_CD_USE_YN } from '@/constants/common.const';
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";
import { commonStore } from '@/stores/common';
import { getListCodeMng } from '@/stores/common/codeMng/codeMng.service';
import { getAllCategories } from '@/stores/foodOrder/productCategory/productCategory.service';
import { OwnerProductCategoryFilterReq } from '@/stores/foodOrder/productCategory/productCategory.type';
import { getPageData } from '@/stores/foodOrder/productMng/productMng.service';
import type { OwnerProductFilterReq, OwnerProductResDTO } from '@/stores/foodOrder/productMng/productMng.type';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = commonStore();

// Props
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  preSelectedFoods: { type: Array<string>, default: () => [] }
});

// Emits
const emit = defineEmits(['closeModal', 'confirmAction']);

// Data
const data = ref<OwnerProductResDTO[]>([]);
const listUseYn = ref<any[]>([]);
const listCategoryForSearch = ref<any[]>([]);
const totalRecord = ref(0);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const listCheckBoxGrid = ref<string[]>([]);
const selectAll = ref(false);

// Search form
const dataSearch = ref<OwnerProductFilterReq>({
  name: '',
  categorySeq: '',
  foodStoreSeq: '',
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: '',
  useYn: 'Y',
});

const dataSearchCategory = ref<OwnerProductCategoryFilterReq>({
  name: '',
  foodStoreSeq: '',
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: '',
});

// Column definitions
const columnDefs = ref([
  {
    headerComponent: CheckboxGrid,
    headerComponentParams: {
      onCustomEvent: checkAll,
      valueChecked: selectAll,
      type: 'selectAll',
      selectAllGridId: 'selectAllGridId01',
      childName: 'childName',
    },
    cellRenderer: CheckboxGrid,
    cellRendererParams: {
      onCustomEvent: checkChild,
      type: 'selectChild',
      selectAllGridId: 'selectAllGridId01',
      childName: 'childName',
    },
    field: 'checkedFlag',
    flex: 0.3,
    cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  },
  { headerName: 'Ảnh', field: 'imageUrl', cellRenderer: ImgGridComponent, flex: 0.5 },
  { headerName: 'Tên món', field: 'name', flex: 1 },
  { headerName: 'Mục lục', field: 'categoryName', cellStyle: { textAlign: 'center' } },
  { headerName: 'Ngày tạo', field: 'createdDate', cellStyle: { textAlign: 'center' } },
]);

// Lifecycle
onUpdated(async () => {
  if (props.isOpen) {
    store.setLoading(true);
    listCheckBoxGrid.value = [...props.preSelectedFoods];
    try {
      const codeRes = await getListCodeMng({ upCdIdList: [UP_CD_USE_YN] });
      listUseYn.value = codeRes.data.data.filter((item: any) => item.upCdId == UP_CD_USE_YN);
      listUseYn.value.unshift({ cdId: '', cdNm: t('common.all') });

      const cateRes = await getAllCategories(dataSearchCategory.value);
      listCategoryForSearch.value = cateRes.data.data.map((c: any) => ({
        cdId: c.categorySeq,
        cdNm: c.name,
      }));
    } catch (e) {
      console.error(e);
    } finally {
      store.setLoading(false);
    }
  }
});

// Pagination
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
        ? new Date(item.createdDate).toLocaleDateString('vi-VN')
        : '',
      // Đánh dấu checkbox dựa trên preSelectedFoods
      checkedFlag: listCheckBoxGrid.value.includes(item.foodSeq),
    }));

    const resetSelect = document.getElementById('selectAllGridId01');
    if (resetSelect) {
      (resetSelect as HTMLInputElement).indeterminate = false;
      (resetSelect as HTMLInputElement).checked = data.value.length > 0 &&
        data.value.every((item) => listCheckBoxGrid.value.includes(item.foodSeq));
    }
  } catch (e) {
    console.error(e);
  } finally {
    store.setLoading(false);
  }
};

// Actions
function clearFormSearch() {
  dataSearch.value.name = '';
  dataSearch.value.categorySeq = '';
  dataSearch.value.useYn = '';
  searchFormData();
}

function searchFormData() {
  dataSearch.value.page = 1;
  // Không reset listCheckBoxGrid ở đây nữa để giữ được danh sách đã chọn
  fnPagination(dataSearch.value.page, dataSearch.value.size);
}

function checkChild(value: boolean, rowData: any) {
  rowData.checkedFlag = value;
  if (value) {
    if (!listCheckBoxGrid.value.includes(rowData.foodSeq)) {
      listCheckBoxGrid.value.push(rowData.foodSeq);
    }
  } else {
    const index = listCheckBoxGrid.value.indexOf(rowData.foodSeq);
    if (index !== -1) listCheckBoxGrid.value.splice(index, 1);
  }

  // Cập nhật selectAll
  selectAll.value = data.value.length > 0 &&
    data.value.every((item) => listCheckBoxGrid.value.includes(item.foodSeq));
}

function checkAll(value: boolean) {
  selectAll.value = value;
  data.value.forEach((item) => {
    item.checkedFlag = value;
    if (value) {
      if (!listCheckBoxGrid.value.includes(item.foodSeq)) {
        listCheckBoxGrid.value.push(item.foodSeq);
      }
    } else {
      const index = listCheckBoxGrid.value.indexOf(item.foodSeq);
      if (index !== -1) listCheckBoxGrid.value.splice(index, 1);
    }
  });
}

const closeModal = () => {
  emit('closeModal');
};

const confirmAction = () => {
  const selectedProducts = data.value.filter(item =>
    listCheckBoxGrid.value.includes(item.foodSeq)
  );
  emit('confirmAction', selectedProducts);
};
</script>