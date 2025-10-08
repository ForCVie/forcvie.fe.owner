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
              <th scope="row" class="required">Tên món ăn</th>
              <td class="td_input">
                <InputBase
                  id="nm"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Mục lục</th>
              <td>
                <div class="dp_flex al_center">
                  <SelectBoxBaseSearch />
                  <div>
                    <ButtonBase
                      class="button btn_xs btn_blue wd_100 ml-2"
                      @click="openModal(0)" >Thêm mục lục</ButtonBase>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Size</th>
              <td>
                <div v-for="option in listStore" >
                  <CheckboxBase :key="option.cdId" :value="option.cdId"
                                :label="option.cdNm" :id="`${option.cdId}_${id}`" :name="option.id" @change="changOne" :is-disable="isDisable"
                                >
                  </CheckboxBase>
                </div>
              </td>  
            </tr> 
            <tr>
              <th scope="row" class="required">Ảnh món ăn</th>
              <td>
                <InputFileBase/>
              </td>  
            </tr> 
            <tr>
              <th scope="row" class="required">Mô tả</th>
              <td>
                <QuillEditor />
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

const pageTitle = ref("Quản lý món ăn");
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
