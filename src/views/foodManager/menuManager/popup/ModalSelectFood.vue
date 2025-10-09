<template>
    <!-- Start Popup Select Food -->
    <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :size="'xl'" @close-modal="closeModal">
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
                            <InputBase v-model:modelValue="dataSearch.bannerNm" id="bannerNm" />
                        </li>
                        <li>
                            <p>Mục lục</p>
                            <InputBase v-model:modelValue="dataSearch.url" id="url" />
                        </li>
                        <li>
                            <p>Trạng thái</p>
                            <RadiobuttonBase v-for="item in listUseYn" :key="item.cdId" :value="item.cdId"
                                v-model="dataSearch.useYn" :id="`${item.cdId}_${item.upCdId}`" :name="`${item.cdId}`"
                                :checked="item.cdId == dataSearch.useYn" :label="`${item.cdNm}`" />
                        </li>
                    </ul>
                </div>

                <div class="btn_group btn_center">
                    <ButtonBase class="button btn_xs btn_lightgray btn_responsive" :buttonName="t('common.reset')"
                        @click="clearFormSearch">
                        {{ t("common.reset") }}
                    </ButtonBase>
                    <ButtonBase class="button btn_xs btn_blue btn_responsive" @click="searchFormData">
                        {{ t("common.search") }}
                    </ButtonBase>
                </div>

                <div class="box_inner">
                    <GridComponentV2 :rowData="data" :rowHeight="150" :columnDefs="columnDefs"
                        :paginationClientFlag="false" :paginationPageSize="paginationPageSize"
                        @customPagination="fnPagination" :totalRecord="totalRecord"
                        :paginationPageSizeSelector="paginationPageSizeSelector">
                    </GridComponentV2>
                </div>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <button type="button" class="button btn_xl btn_white popup_close" @click="confirmAction">
                닫기
            </button>
            <button type="button" class="button btn_xl btn_blue" @click="cancelAction">
                확인
            </button>
        </template>
    </TModal>
    <!-- End Popup Select Food -->
</template>

<script setup lang="ts">
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import ImgGridComponent from "@/components/common/grid/ImgGridComponent.vue";
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";
import {
    AdBannerFilterReq,
    AdBannerResDTO,
} from "@/stores/promotionMng/bannerMng/bannerMng.type";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// i18n
const { t } = useI18n();

// Props từ component cha
defineProps({
    isOpen: { type: Boolean, default: false },
});

// Emit cho parent
const emit = defineEmits(["closeModal", "clearFormSearch", "searchFormData", "confirmAction", "cancelAction"]);

const data = ref([]);
const listCheckBoxGrid = ref<string[]>([]);

const dataSearch = ref<AdBannerFilterReq>({
    bannerNm: "",
    typeCd: "",
    url: "",
    useYn: "",
    page: 1,
    size: PAGINATION_PAGE_SIZE,
    sort: "",
});
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
        flex: .3
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
// Gọi hàm emit
const closeModal = () => emit("closeModal");
const clearFormSearch = () => emit("clearFormSearch");
const searchFormData = () => emit("searchFormData");
const confirmAction = () => emit("confirmAction");
const cancelAction = () => emit("cancelAction");
</script>
