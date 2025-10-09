<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>
        <div class="box dp_block">
            <div class="box_inner">
                <GridComponentV2 :rowData="data" :columnDefs="columnDefs" :paginationClientFlag="false"
                    :paginationPageSize="paginationPageSize" @customPagination="fnPagination" :totalRecord="totalRecord"
                    :paginationPageSizeSelector="paginationPageSizeSelector">
                    <template #button>
                        <div>
                            <ButtonBase type="button" class="btn_round btn_xs btn_primary mg_l10" @click="openModal(0)">
                                {{ t("common.add") }}
                            </ButtonBase>
                        </div>
                    </template>
                </GridComponentV2>
            </div>
        </div>

        <!-- Start Popup Select Food -->
        <ModalCategoryForm :isOpen="modalOpen[0]" :dataSelect="dataSelect" @closeModal="closeModal(0)" @confirmAction="closeModal(0)"
            @cancelAction="closeModal(0)" />
        <!-- End Popup Select Food -->
    </section>
</template>

<script setup lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import {
    PAGINATION_PAGE_SIZE,
    PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
// import { getPageData } from "@/stores/promotionMng/bannerMng/bannerMng.service";
import {
    AdBannerFilterReq,
    AdBannerResDTO,
} from "@/stores/promotionMng/bannerMng/bannerMng.type";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import ModalCategoryForm from "./popup/ModalCategoryForm.vue";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản lý danh mục");
const breadcrumbItems = ref([
    { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);
const selectAll = ref(false);
const modalOpen = ref([false]);

const columnDefs = ref([
    {
        headerName: "#",
        field: "rowNum",
        flex: 0.2
    },
    {
        headerName: "Tên danh mục",
        field: "bannerNm",
        cellRenderer: LinkGridComponent,
        cellRendererParams: { onCustomEvent: goAction },
    },
    {
        headerName: "Ngày tạo",
        field: "url",
        cellStyle: {
            textAlign: "center",
        },
    },
    {
        headerName: "Chức năng",
        field: "useYn",
        cellStyle: { textAlign: "center" },
        cellRenderer: ButtonGridComponent,
        cellRendererParams: {
            onCustomEvent: () => openModal(0), // truyền callback
            className: "btn_round btn_xs btn_primary", // truyền trực tiếp className
            value: "Xóa"
        },
        flex: 0.3
    }
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
const dataSelect = ref();

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
function goAction(data: AdBannerResDTO) {
    console.log(data);
    dataSelect.value = data;
    openModal(0);
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

function openModal(index: number) {
    modalOpen.value[index] = true
}
const closeModal = (index: number) => {
    dataSelect.value = {};
    modalOpen.value[index] = false
}
</script>
<style>
.ag-cell-value.ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>