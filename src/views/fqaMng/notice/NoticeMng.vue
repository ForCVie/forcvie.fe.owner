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
              <p>Title</p>
              <InputBase v-model:modelValue="dataSearch.title" id="title" />
            </li>
            <li>
              <p>Đăng bài</p>
                <RadiobuttonBase
                  v-for="item in listPostCd"
                  :value="item.cdId"
                  v-model="dataSearch.postCd"
                  :id="`${item.cdId}_${item.upCdId}_postCd`"
                  :name="`${item.cdId}_${item.upCdId}_postCd`"
                  :key="`${item.cdId}_${item.upCdId}_postCd`"
                  :checked="item.cdId == dataSearch.postCd"
                  :label="`${item.cdNm}`"
                />
            </li>
            <li>
              <p>Đẩy top</p>
                <RadiobuttonBase
                  v-for="item in listFixTopCd"
                  :value="item.cdId"
                  v-model="dataSearch.topFixCd"
                  :id="`${item.cdId}_${item.upCdId}_topFixCd`"
                  :name="`${item.cdId}_${item.upCdId}_topFixCd`"
                  :key="`${item.cdId}_${item.upCdId}_topFixCd`"
                  :checked="item.cdId == dataSearch.topFixCd"
                  :label="`${item.cdNm}`"
                />
            </li>
            <li>
              <p>Role Nhận</p>
                <ListCheckBoxBase
                  :listData="listRoleData"
                  v-model="dataSearch.roleId"
                  id="roleId"
                  name="roleId"
                  :hasCheckAll="true"
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
import { UP_CD_NOTICE_POST_CD, UP_CD_NOTICE_TOP_FIX, UP_CD_SITE, UP_CD_USE_YN } from "@/constants/common.const";
import {
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import router from "@/router";
import { fqaRoute } from "@/router/routeItems/fqaRoute";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getFormData, getPageData } from "@/stores/fqaMng/notice/noticeMng.service";
import {
  AdNoticeFilterReq,
  AdNoticeResDTO,
} from "@/stores/fqaMng/notice/noticeMng.type";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản Lý Thông Báo");
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
    field: "title",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
  },
  {
    headerName: "Thể Loại",
    field: "postCd",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Đẩy Top",
    field: "topFixCd",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Quyền",
    field: "roleId",
    cellStyle: {
      textAlign: "center",
    },
  },
]);

const dataSearch = ref<AdNoticeFilterReq>({
  postCd: "",
  roleId: "",
  title: "",
  topFixCd: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const listPostCd = ref<CodeMngModel[]>([]);
const listFixTopCd = ref<CodeMngModel[]>([]);
const listRoleData = ref<CodeMngModel[]>([]);

const data = ref([]);

onBeforeMount(async () => {
  store.setLoading(true);
  await getListCodeMng({
    upCdIdList: [UP_CD_NOTICE_TOP_FIX, UP_CD_NOTICE_POST_CD],
  }).then((res) => {
    listFixTopCd.value = res.data.data.filter(
      (item: CodeMngModel) => item.upCdId == UP_CD_NOTICE_TOP_FIX
    );
    listFixTopCd.value.unshift({
      cdId: "",
      cdNm: t('common.all'),
      upCdId: UP_CD_NOTICE_TOP_FIX
    })
    listPostCd.value = res.data.data.filter(
      (item: CodeMngModel) => item.upCdId == UP_CD_NOTICE_POST_CD
    );
    listPostCd.value.unshift({
      cdId: "",
      cdNm: t('common.all'),
      upCdId: UP_CD_NOTICE_TOP_FIX
    })
  });
  await getFormData().then((res) => {
    listRoleData.value = res.data.data.listRole;
  });
  store.setLoading(false);
});

const goActionCreate = () => {
  router.push({
    name: fqaRoute.noticeManagementForm.name,
    params: { mode: MODE_CREATE },
  });
};

function goAction(data: AdNoticeResDTO) {
  router.push({
    name: fqaRoute.noticeManagementForm.name,
    params: { mode: MODE_CREATE },
    state: { id: data.noticeSeq },
  });
}

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pagesSize;
  await getPageData(dataSearch.value).then((res) => {
    totalRecord.value = res.data.data.totalRecord;
    data.value = res.data.data.data.map(
      (item: AdNoticeResDTO, index: number) => {
        item.rowNum =
          (dataSearch.value.page - 1) * dataSearch.value.size + index + 1;
        return item;
      }
    );
  });
};

const clearFormSearch = () => {
  dataSearch.value = {
    postCd: "",
    roleId: "",
    title: "",
    topFixCd: "",
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
