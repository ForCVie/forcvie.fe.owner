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
            <col style="width: 18%"/>
            <col style="width: auto"/>
          </colgroup>
          <tbody>
          <tr>
            <th scope="row">UserName</th>
            <td class="td_input">
              <InputBase
                  v-model:modelValue="dataDetail.userName"
                  id="userName"
                  readonly="readonly"
              />
            </td>
          </tr>
          <tr>
            <th scope="row" class="required">Password</th>
            <td>
              <InputBase
                  v-model:modelValue="dataDetail.password"
                  id="password"
              />
            </td>
          </tr>
          <tr>
            <th scope="row" class="required">Họ và Tên</th>
            <td>
              <InputBase
                  v-model:modelValue="dataDetail.fullName"
                  id="fullName"
                  required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Ngày Sinh</th>
            <td>
              <BaseDatePicker
                  v-model:modelValue="dataDetail.date"
                  id="date"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Điện Thoại</th>
            <td>
              <InputBase
                  v-model:modelValue="dataDetail.phone"
                  id="phone"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>
              <InputBase
                  v-model:modelValue="dataDetail.email"
                  id="email"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Địa chỉ</th>
            <td>
              <InputBase
                  v-model:modelValue="dataDetail.address"
                  id="address"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Quốc Tịch</th>
            <td>
              <InputBase
                  v-model:modelValue="dataDetail.nationality"
                  id="nationality"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Ảnh</th>
            <td>
              <InputBase
                  v-model:modelValue="dataDetail.address"
                  id="address"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner">
          <h3 class="box_title">Địa Chỉ</h3>
          <div class="box_title_funtion">
            <button @click="addAddress()" class="button btn_xs btn_blue">Thêm</button>
          </div>
        </div>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%"/>
            <col style="width: auto"/>
          </colgroup>
          <tbody>
          <tr v-for="(item, index) in dataDetail.listAddress">
            <th scope="row" class="required">Địa chỉ {{index + 1}} {{item.isDefault == STATE_Y ? '(Địa chỉ chính)' : ''}}</th>
            <td>
              <div class="dp_flex al_center">
                <InputBase
                    v-model:modelValue="item.content"
                    id="fullName"
                    required
                />
                <button @click="deleteAddress(index)" class="button btn_xs btn_white mg_5">
                  Xóa
                </button>
                <button v-if="item.isDefault == STATE_N" @click="setDefault(item)" class="button btn_xs btn_blue">
                  Default
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
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
        >
          Khóa Tài Khoản (Tính Năng Sắp Ra Mắt)
        </button>
        <button
            v-if="id"
            type="button"
            class="button btn_xs btn_blue"
        >
          Mở Khóa Tài Khoản (Tính Năng Sắp Ra Mắt)
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
  </section>
</template>

<script setup lang="ts">
import {useAlert, useConfirm} from "@/components/common/composables/useAlert";
import InputBase from "@/components/common/input/InputBase.vue";
import router from "@/router";
import {commonStore} from "@/stores/common";
import type {
  AdClientDetailDTO,
  AdClientMngRequest,
  AdUserAddressDTO
} from "@/stores/accountCreation/clientMng/clientMng.type";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import {getDataDetail, removeData, saveData} from "@/stores/accountCreation/clientMng/clientMng.service";
import {accountCreationRoute} from "@/router/routeItems/accountCreationRoute";
import {STATE_N, STATE_Y} from "@/constants/common.const";

const {t} = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Quản Lý Người Dùng");
const breadcrumbItems = ref([
  {label: t("talentEduGoalsMng.breadcrumb.01"), link: "/"},
]);

const dataDetail = ref<AdClientDetailDTO>({
  id: '',
  userName: '',
  password: '',
  fullName: '',
  date: '',
  phone: '',
  email: '',
  address: '',
  nationality: '',
  avatar: '',
  lockYn: '',
  listAddress: []
});

onBeforeMount(async () => {
  store.setLoading(true);

  id.value = window.history.state.id;
  if (id.value)
    await getDataDetail(id.value).then((res) => {
      dataDetail.value = res.data.data;
    });

  store.setLoading(false);
});

const back = () => {
  router.push({ path: accountCreationRoute.clientMng.path });
};

const onSave = async () => {
  if (store.check) {
    alert(
        t("common.messageValidateRequired"),
        t("common.alertTitle"),
        () => {
        }
    );
    return;
  }
  confirm(
      t("common.message.confirmSave"),
      t("common.confirmTitle"),
      async () => {
        const dataSave = {
          ...dataDetail.value,
        } as AdClientMngRequest;
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

const addAddress = () => {
  dataDetail.value.listAddress.push( {
    userAddressSeq: '',
    content: '',
    isDefault: STATE_N,
  })
}

const deleteAddress = (indexDel: number) => {
  confirm(
      t("common.message.confirmDelete"),
      t("common.confirmTitle"),
      async () => {
        alert(t("common.message.deleteSuccess"), t("common.alertTitle"), () => {
          dataDetail.value.listAddress.splice(indexDel, 1);
        });
      }
  );
}

const setDefault = (itemDefault: AdUserAddressDTO) => {
  const currentDefault = dataDetail.value.listAddress.find(item => item.isDefault === STATE_Y);

  if (currentDefault) {
    currentDefault.isDefault = STATE_N;
  }

  itemDefault.isDefault = STATE_Y;
}
</script>
