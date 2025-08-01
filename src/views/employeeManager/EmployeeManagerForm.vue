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
                <!-- Tự động gen -->
              <th scope="row" class="required">Tài khoản đăng nhập</th>
              <td class="td_input">
                <InputBase
                  id="nm"
                  readonly
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Họ và tên</th>
              <td>
                <InputBase
                  id="name"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Ngày sinh</th>
              <td>
                <InputBase
                  id="route"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Số điện thoại</th>
              <td>
                <InputBase
                  id="route"
                />
              </td>  
            </tr> 
            <tr>
              <th scope="row" class="required">Mật khẩu</th>
              <td>
                <ButtonBase
                  class="button btn_xs btn_blue"
                  @click="openModal(0)" >Đổi mật khẩu</ButtonBase>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Cửa hàng phụ trách</th>
              <td>
                <div v-for="option in listStore" >
                  <CheckboxBase :key="option.cdId" :value="option.cdId"
                                :label="option.cdNm" :id="`${option.cdId}_${id}`" :name="option.id" @change="changOne" :is-disable="isDisable"
                                >
                  </CheckboxBase>
                    <RadiobuttonBase
                      v-for="item in listRole"
                      :value="item.cdId"
                      :id="`${item.cdId}_${item.upCdId}`"
                      :name="`${item.cdId}`"
                      :key="item.cdId"
                      :label="`${item.cdNm}`"
                    />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      <div class="box_section">
        <div class="btn_area">
          <ButtonBase type="button" class="button btn_xs btn_white" @click="back()">
            {{ t("common.list") }}
          </ButtonBase>
          <ButtonBase type="button" class="button btn_xs btn_blue" @click="onSave">
            {{ t("common.save") }}
          </ButtonBase>
        </div>
      </div>

  <!-- Start Popup Categorys Store -->
  <TModal :is-open="modalOpen[0]" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal(0)">
    <template #title>
      <strong class="bold">Đổi mật khẩu</strong>
    </template>
    <template #default>
      
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
                <!-- Tự động gen -->
              <th scope="row" class="required">Mật khẩu</th>
              <td class="td_input">
                <InputBase
                  id="nm"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
    </template>
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close " @click="confirmAction">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue  " @click="cancelAction">확인
      </button>
    </template>
  </TModal>
  <!-- End Popup Categorys Store -->
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

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Quản Lý nhân viên");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const listRole = ref<CodeMngModel[]>([{
  cdId: "ROLE_ADMIN",
  cdNm: "Quản trị viên",
  upCdId: UP_CD_USE_YN,
}, {
  cdId: "ROLE_USER",
  cdNm: "Người dùng",
  upCdId: UP_CD_USE_YN,
}]);
const listStore = ref<CodeMngModel[]>([{
  cdId: "STORE_1",
  cdNm: "Cửa hàng 1",
  upCdId: UP_CD_SITE,
}, {
  cdId: "STORE_2",
  cdNm: "Cửa hàng 2",
  upCdId: UP_CD_SITE,
}]);

const modalOpen = ref([false]);

onBeforeMount(async () => {
});

const openModal = (index: number) => {
  modalOpen.value[index] = true
}
const closeModal = (index: number) => {
  modalOpen.value[index] = false
}

const back = () => {
  router.push({ path: employeeManagerRoute.employeeManager.path });
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
