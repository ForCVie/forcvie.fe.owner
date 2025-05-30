<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">Tên Menu</th>
              <td class="td_input">
                <InputBase
                  v-model:modelValue="dataDetail.nm"
                  id="nm"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Route Name</th>
              <td>
                <InputBase
                  v-model:modelValue="dataDetail.name"
                  id="name"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Route Url</th>
              <td>
                <InputBase
                  v-model:modelValue="dataDetail.route"
                  id="route"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Thứ Tự</th>
              <td>
                <InputBase
                  v-model:modelValue="dataDetail.displayOrder"
                  required
                  :is-number="true"
                  :min-value="0"
                  :decimal-places="0"
                  id="displayOrder"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Sử Dụng</th>
              <td>
                <RadiobuttonBase
                  v-for="item in radioUseYn"
                  :value="item.cdId"
                  v-model="dataDetail.useYn"
                  :id="`${item.cdId}_${item.upCdId}`"
                  :name="`${item.cdId}`"
                  :key="item.cdId"
                  :checked="item.cdId == dataDetail.useYn"
                  :label="`${item.cdNm}`"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Loại Site</th>
              <td>
                <SelectBoxBase
                  :id="'siteType'"
                  :name="'siteType'"
                  v-model="dataDetail.siteType"
                  :data="listSiteType"
                  :required="true"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Menu Cha</th>
              <td>
                <SelectBoxBaseSearch
                  v-if="listMenuParent && listMenuParent?.length > 0"
                  :id="'parentId'"
                  :name="'parentId'"
                  v-model="dataDetail.parentId"
                  :data="listMenuParent"
                  :value-select-all="t('common.select')"
                />
              </td>
            </tr>
          </tbody>
        </table>
        {{ store.arrRequired }}
      </div>
      <div class="box_section">
        <div class="btn_area">
          <button type="button" class="button btn_xs btn_white" @click="back()">
            {{ t("common.list") }}
          </button>
          <button type="button" class="button btn_xs btn_blue" @click="onSave">
            {{ t("common.save") }}
          </button>
          <button
            v-if="id"
            type="button"
            class="button btn_xs btn_blue"
            @click="onRemove"
          >
            {{ t("common.delete") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBaseSearch from "@/components/common/input/SelectBoxBaseSearch.vue";
import {
  STATE_N,
  UP_CD_SITE,
  UP_CD_USE_YN,
} from "@/constants/common.const";
import router from "@/router";
import { developRoute } from "@/router/routeItems/developRoute";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  getDataDetail,
  getDataForm,
  removeData,
  saveData,
} from "@/stores/developer/menu/menuMng.service";
import {
  AdMenuDetailDTO,
  AdMenuRequest,
} from "@/stores/developer/menu/menuMng.type";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Quản Lý Menu");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const radioUseYn = ref<CodeMngModel[]>();
const listSiteType = ref<CodeMngModel[]>();
const listMenuParent = ref<CodeMngModel[]>();

const dataDetail = ref<AdMenuDetailDTO>({
  displayOrder: "",
  menuId: "",
  name: "",
  nm: "",
  parentId: "",
  route: "",
  siteType: "",
  useYn: "",
});

onBeforeMount(async () => {
  store.setLoading(true);

  id.value = window.history.state.id;
  if (id.value)
    await getDataDetail(id.value).then((res) => {
      dataDetail.value = res.data.data;
    });

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
  await getDataForm([id.value ? id.value : ""]).then((res) => {
    listMenuParent.value = res.data.data.parentList;
    listMenuParent.value?.unshift({
      cdId: "",
      cdNm: t("common.select"),
      upCdId: "MENU_PARENT",
    });
  });
  store.setLoading(false);
});

const back = () => {
  router.push({ path: developRoute.menuManagement.path });
};

const onSave = async () => {
  if (store.check) {
    alert(
      t("common.messageValidateRequired"),
      t("common.alertTitle"),
      () => {}
    );
    return;
  }
  confirm(
    t("common.message.confirmSave"),
    t("common.confirmTitle"),
    async () => {
      const dataSave = {
        delYn: STATE_N,
        ...dataDetail.value,
      } as AdMenuRequest;
      await saveData(dataSave).then((res) => {
        alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {
          back();
        });
      });
    }
  );
};

const onRemove = async () => {
  confirm(
    t("common.message.confirmDelete"),
    t("common.confirmTitle"),
    async () => {
  if (id.value) {
    await removeData(id.value).then((res) => {
        alert(t("common.message.deleteSuccess"), t("common.alertTitle"), () => {
          back();
        });
    });
  }
    }
  );
};
</script>
