<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <!-- Tự động gen -->
              <th scope="row" class="required">Tên thực đơn</th>
              <td class="td_input">
                <InputBase id="nm" required />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner" data-v-975cdc11="">
          <h3 class="box_title" data-v-975cdc11="">Chọn thực đơn</h3>
          <div class="box_title_funtion" data-v-975cdc11="">
            <p class="check_row" data-v-975cdc11="">
              <ButtonBase type="button" class="button btn_xs btn_blue" @click="openModal(0)">Thêm món ăn</ButtonBase>
            </p>
          </div>
        </div>
        <div class="scrollx_table md">
          <table class="tbl_col">
            <colgroup>
              <col style="width: 8%;">
              <col style="width: auto;">
              <col style="width: 20%;">
              <col style="width: 10%;">
              <col style="width: 10%;">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên món</th>
                <th scope="col">Mục lục</th>
                <th scope="col">Đổi vị trí</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="ta_c">1</td>
                <td>Món 1</td>
                <td>Mục lục 1</td>
                <td class="ta_c">
                  <button type="button" class="button btn_xs btn_white mg_r5">↑</button>
                  <button type="button" class="button btn_xs btn_white">↓</button>
                </td>
                <td class="ta_c">
                  <button type="button" class="btn_icon icon_only delete">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="box_section">
      <div class="btn_area">
        <ButtonBase type="button" class="button btn_xs btn_white" @click="back()">
          {{ t("common.list") }}
        </ButtonBase>
        <!-- <ButtonBase type="button" class="button btn_xs btn_blue" @click="onSave">
          Review
        </ButtonBase> -->
        <ButtonBase type="button" class="button btn_xs btn_blue" @click="onSave">
          {{ t("common.save") }}
        </ButtonBase>
      </div>
    </div>

    <!-- Start Popup Select Food -->
    <ModalSelectFood :isOpen="modalOpen[0]" @closeModal="closeModal(0)" @confirmAction="closeModal(0)"
      @cancelAction="closeModal(0)" />
    <!-- End Popup Select Food -->
  </section>
</template>

<script setup lang="ts">
import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
import InputBase from "@/components/common/input/InputBase.vue";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import SelectBoxBaseSearch from "@/components/common/input/SelectBoxBaseSearch.vue";
import {
  STATE_N,
  UP_CD_SITE,
  UP_CD_USE_YN,
} from "@/constants/common.const";
import router from "@/router";
import { employeeManagerRoute } from "@/router/routeItems/employeeManagerRoute";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import ModalSelectFood from "./popup/ModalSelectFood.vue";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Quản lý thực đơn");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const modalOpen = ref([false]);

onBeforeMount(async () => {
});

const back = () => {
  router.push({ path: employeeManagerRoute.employeeManager.path });
};

const openModal = (index: number) => {
  modalOpen.value[index] = true
}
const closeModal = (index: number) => {
  modalOpen.value[index] = false
}

const onSave = async () => {
  if (store.check) {
    alert(
      t("common.messageValidateRequired"),
      t("common.alertTitle"),
      () => { }
    );
    return;
  }
  confirm(
    t("common.message.confirmSave"),
    t("common.confirmTitle"),
    async () => {

    }
  );
};

const onRemove = async () => {
  confirm(
    t("common.message.confirmDelete"),
    t("common.confirmTitle"),
    async () => {

    }
  );
};
</script>
