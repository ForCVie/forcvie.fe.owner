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
              <th scope="row" class="required">Tên Role</th>
              <td class="td_input">
                <InputBase
                  v-model:modelValue="dataDetail.roleNm"
                  id="roleNm"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Mã Role</th>
              <td>
                <InputBase
                  v-model:modelValue="dataDetail.roleCd"
                  id="roleCd"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Mô Tả</th>
              <td>
                <TextArea
                  v-model:modelValue="dataDetail.roleDesc"
                  id="roleDesc"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Loại Site</th>
              <td>
                <SelectBoxBase
                  :id="'roleSiteCd'"
                  :name="'roleSiteCd'"
                  v-model="dataDetail.roleSiteCd"
                  :data="listSiteType"
                  :required="true"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Menu Chọn</th>
              <td>
                <MenuItem
                  :items="listMenuParent"
                  :list-data="listMenuParent"
                  :select-menu="dataDetail.listMenu"
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
import TextArea from "@/components/common/input/TextArea.vue";
import MenuItem from "@/components/common/menuItem/MenuItem.vue";
import {
  CD_ID_SITE_ADMIN,
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
} from "@/stores/developer/roleMng/roleMng.service";
import {
  AdRoleDetailDTO,
  AdRoleRequest,
} from "@/stores/developer/roleMng/roleMng.type";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Quản Lý Role");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const listSiteType = ref<CodeMngModel[]>([]);
const listMenuParent = ref<CodeMngModel[]>([]);

const dataDetail = ref<AdRoleDetailDTO>({
  roleCd: "",
  roleDesc: "",
  roleId: "",
  roleNm: "",
  roleSiteCd: CD_ID_SITE_ADMIN,
  listMenu: [],
});

onBeforeMount(async () => {
  store.setLoading(true);

  id.value = window.history.state.id;
  if (id.value)
    await getDataDetail(id.value).then((res) => {
      dataDetail.value = res.data.data;
    });

  await getListCodeMng({ upCdIdList: [UP_CD_SITE] }).then((res) => {
    listSiteType.value = res.data.data.filter(
      (item: CodeMngModel) => item.upCdId == UP_CD_SITE
    );
  });
  await getMenuForm();
  store.setLoading(false);
});

const getMenuForm = async () => {
  await getDataForm(dataDetail.value.roleSiteCd).then((res) => {
    listMenuParent.value = buildMenu(res.data.data.listMenu, "");
  });
};

function buildMenu(arr: any, parentId = "") {
  return arr
    .filter((item: any) => item.upCdId === parentId)
    .map((item: any) => ({
      ...item,
      subMenus: buildMenu(arr, item.cdId),
    }));
}
const back = () => {
  router.push({ path: developRoute.roleManagement.path });
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
        listMenu: dataDetail.value.listMenu,
        roleCd: dataDetail.value.roleCd,
        roleDesc: dataDetail.value.roleDesc,
        roleId: dataDetail.value.roleId,
        roleNm: dataDetail.value.roleNm,
        roleSiteCd: dataDetail.value.roleSiteCd,
      } as AdRoleRequest;
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
