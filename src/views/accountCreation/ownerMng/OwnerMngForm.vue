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

    <div v-for="(item, index) in dataDetail.foodStores">
      <button @click="deleteAddress(index)" class="button btn_xs btn_blue">Xóa Cửa Hàng</button>
      <CollapseBase :isShow="item.openCollapse" :isCheck="true"
                    :title="`Cửa Hàng Số ${index + 1}`"
                    :onClick="() => {item.openCollapse = !item.openCollapse}">
        <div class="box_section mg_t20">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 18%"/>
              <col style="width: auto"/>
            </colgroup>
            <tbody>
            <tr>
              <th scope="row">Tên Cửa Hàng</th>
              <td>
                <InputBase
                    v-model:modelValue="item.nm"
                    :id="`nm_${index}`"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Mã Cửa Hàng</th>
              <td>
                <InputBase
                    v-model:modelValue="item.code"
                    :id="`code_${index}`"
                    readonly="readonly"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Địa Chỉ</th>
              <td>
                <InputBase
                    v-model:modelValue="item.address"
                    :id="`address_${index}`"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Điện Thoại quản lý</th>
              <td>
                <InputBase
                    v-model:modelValue="item.phoneOwner"
                    :id="`phoneOwner_${index}`"
                />
                <CheckboxBase :id="`isShowPhoneOwner_${index}`" v-model="item.isShowPhoneOwner" :trueValue="STATE_Y" :falseValue="STATE_N" :label="'Hiển thị'" />
              </td>
            </tr>
            <tr>
              <th scope="row">Điện Thoại</th>
              <td>
                <InputBase
                    v-model:modelValue="item.phoneSp"
                    :id="`phoneSp_${index}`"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Huy Hiệu</th>
              <td>
                <CheckboxBase :id="`isBadge_${index}`" v-model:modelValue="item.isBadge" :trueValue="STATE_Y" :falseValue="STATE_N" :label="'Hiển thị'" />
              </td>
            </tr>
            <tr>
              <th scope="row">Ảnh nền</th>
              <td>
<!--                <CheckboxBase :id="`isBadge_${index}`" v-model:modelValue="item.isBadge" :value="STATE_Y" :label="'Hiển thị'" />-->
              </td>
            </tr>
            <tr>
              <th scope="row">Hoạt Động</th>
              <td>
                <CheckboxBase :id="`isActivity_${index}`" :trueValue="STATE_Y" :falseValue="STATE_N" v-model:modelValue="item.isActivity" :label="'Hoat Dong'" />
              </td>
            </tr>
            </tbody>
          </table>
          {{item}}
        </div>
      </CollapseBase>
    </div>
    <div class="box_section">
      <div class="btn_area">
        <button type="button" class="button btn_xs btn_white" @click="back()">
          {{ t("common.list") }}
        </button>
        <button type="button" class="button btn_xs btn_blue" @click="onSave">
          {{ t("common.save") }}
        </button>
        <button type="button" class="button btn_xs btn_blue" @click="addFoodStore()">
          Thêm cửa hàng
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
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import {accountCreationRoute} from "@/router/routeItems/accountCreationRoute";
import {STATE_N, STATE_Y} from "@/constants/common.const";
import type {
  AdFoodStoreDetailDTO,
  AdOwnerDetailDTO,
  AdOwnerRequest
} from "@/stores/accountCreation/ownerMng/ownerMng.type";
import {getDataDetail, removeData, saveData} from "@/stores/accountCreation/ownerMng/ownerMng.service";
import CollapseBase from "@/components/common/collapse/CollapseBase.vue";
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";

const {t} = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Quản Lý Nhà Bán Hàng");
const breadcrumbItems = ref([
  {label: t("talentEduGoalsMng.breadcrumb.01"), link: "/"},
]);

const dataDetail = ref<AdOwnerDetailDTO>({
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
  foodStores: []
});

onBeforeMount(async () => {
  store.setLoading(true);

  id.value = window.history.state.id;
  if (id.value)
    await getDataDetail(id.value).then((res) => {
      dataDetail.value = res.data.data;

      if (dataDetail.value.foodStores.length != 0) {
        dataDetail.value.foodStores = dataDetail.value.foodStores.map((item) => {
          return {
            ...item,
            openCollapse: true,
          }
        });
      }
    });

  store.setLoading(false);
});

const back = () => {
  router.push({path: accountCreationRoute.ownerMng.path});
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
        const dataSave: AdOwnerRequest = {
          ...dataDetail.value,
          foodStores: dataDetail.value.foodStores.map(({ openCollapse, code, ...rest }) => rest)
        };
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

const addFoodStore = () => {
  dataDetail.value.foodStores.push({
    foodStoreSeq: '',
    nm: '',
    code: '',
    ownerSeq: '',
    address: '',
    phoneOwner: '',
    phoneSp: '',
    isShowPhoneOwner: '',
    isBadge: '',
    avatar: '',
    isActivity: '',
    openCollapse: true
  })
}

const deleteAddress = (indexDel: number) => {
  confirm(
      t("common.message.confirmDelete"),
      t("common.confirmTitle"),
      async () => {
        alert(t("common.message.deleteSuccess"), t("common.alertTitle"), () => {
          dataDetail.value.foodStores.splice(indexDel, 1);
        });
      }
  );
}
</script>
