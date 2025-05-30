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
              <th scope="row" class="required">Tiêu Đề</th>
              <td class="td_input">
                <InputBase v-model:modelValue="dataDetail.title" id="title" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Nội Dung</th>
              <td class="td_input">
                <TextArea
                  v-model:modelValue="dataDetail.content"
                  id="content"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">URL</th>
              <td class="td_input">
                <InputBase v-model:modelValue="dataDetail.url" id="url" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Sử Dụng</th>
              <td class="td_input">
                <RadiobuttonBase
                  v-for="item in listUseYn"
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
              <th scope="row" class="required">File</th>
              <td class="td_input">
                <InputFileBase
                  :id="'id3'"
                  :name="'id3'"
                  :type="FILE_TYPE_IMAGE"
                  :mode="MODE_EDIT"
                  :multiple="true"
                  :maxFile="1"
                  ref="childRefUpLoad"
                  :referKey="id"
                  :orgName="'BannerTee'"
                  :category="'BannerTee'"
                  :sectionName="'BannerTee'"
                >
                </InputFileBase>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Thời gian</th>
              <td>
                <div class="dp_flex al_center">
                  <BaseDatePicker
                    class="wd_200"
                    :placeholder="t('common.startDate')"
                    v-model="dataDetail.startDate"
                  />
                  <span class="mg_5"> ~ </span>
                  <BaseDatePicker
                    class="wd_200"
                    :placeholder="t('common.startDate')"
                    v-model="dataDetail.endDate"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section">
        <div class="btn_area">
          <button @click="back" type="button" class="button btn_xs btn_white">
            {{ t("common.list") }}
          </button>
          <button type="button" @click="onSave" class="button btn_xs btn_blue">
            {{ t("common.save") }}
          </button>
          <button
            v-if="id"
            type="button"
            @click="onRemove"
            class="button btn_xs btn_blue"
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
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import { CD_ID_USE, UP_CD_USE_YN } from "@/constants/common.const";
import { FILE_TYPE_IMAGE, MODE_EDIT } from "@/constants/screen.const";
import router from "@/router";
import { promotionRoute } from "@/router/routeItems/promotionRoute";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  getDataDetail,
  removeData,
  saveData,
} from "@/stores/promotionMng/bannerTeeMng/bannerTeeMng.service";
import {
  AdBannerTeeDetailDTO,
  AdBannerTeeReq,
} from "@/stores/promotionMng/bannerTeeMng/bannerTeeMng.type";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Quản Lý Banner Tee");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const childRefUpLoad = ref();

const dataDetail = ref<AdBannerTeeDetailDTO>({
  bannerTeeSeq: "",
  content: "",
  endDate: null,
  startDate: null,
  title: "",
  useYn: CD_ID_USE,
  url: "",
});

const listUseYn = ref<CodeMngModel[]>();

onBeforeMount(async () => {
  store.setLoading(true);

  id.value = window.history.state.id;

  await getListCodeMng({ upCdIdList: [UP_CD_USE_YN] }).then((res) => {
    listUseYn.value = res.data.data.filter(
      (item: CodeMngModel) => item.upCdId == UP_CD_USE_YN
    );
  });
  if (id.value) {
    await getDataDetail(id.value).then((res) => {
      dataDetail.value = res.data.data;
    });
  }

  store.setLoading(false);
});

const back = () => {
  router.push({ path: promotionRoute.bannerTeeMng.path });
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
        ...dataDetail.value,
      } as AdBannerTeeReq;
      await saveData(dataSave).then((res) => {
        childRefUpLoad.value.upLoadFile(res.data.data);
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
          alert(
            t("common.message.deleteSuccess"),
            t("common.alertTitle"),
            () => {
              back();
            }
          );
        });
      }
    }
  );
};
</script>
