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
              <th scope="row" class="required">Mã thực đơn</th>
              <td class="td_input">
                <InputBase v-model:modelValue="dataDetail.code" id="code" required />
              </td>
            </tr>
            <tr>
              <!-- Tự động gen -->
              <th scope="row" class="required">Tên thực đơn</th>
              <td class="td_input">
                <InputBase v-model:modelValue="dataDetail.name" id="name" required />
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
              <tr v-if="selectedFoods.length === 0">
                <td colspan="5" class="ta_c">Chưa chọn món ăn nào</td>
              </tr>

              <tr v-for="(food, index) in selectedFoods" :key="food.foodSeq">
                <td class="ta_c">{{ index + 1 }}</td>
                <td>{{ food.name }}</td>
                <td>{{ food.categoryName }}</td>
                <td class="ta_c">
                  <button type="button" class="button btn_xs btn_white mg_r5">↑</button>
                  <button type="button" class="button btn_xs btn_white">↓</button>
                </td>
                <td class="ta_c">
                  <button type="button" class="btn_icon icon_only delete" @click="removeFood(index)">
                    Xóa
                  </button>
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
    <ModalSelectFood :isOpen="modalOpen[0]" @closeModal="closeModal(0)" @confirmAction="handleSelectFood"
      :preSelectedFoods="listCheckBoxGrid" @cancelAction="closeModal(0)" />
    <!-- End Popup Select Food -->
  </section>
</template>

<script setup lang="ts">
import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
import InputBase from "@/components/common/input/InputBase.vue";
import router from "@/router";
import { foodManagerRoute } from "@/router/routeItems/foodManagerRoute";
import { commonStore } from "@/stores/common";
import { findProductsInMenu, getDataDetail, saveData } from "@/stores/foodOrder/menuMng/menu.service";
import { OwnerMenuReq } from "@/stores/foodOrder/menuMng/menu.type";
import { OwnerProductResDTO } from "@/stores/foodOrder/productMng/productMng.type";
import ModalSelectFood from "./popup/ModalSelectFood.vue";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

// Lấy ID từ state của router (dành cho chế độ chỉnh sửa)
const id = ref<string | null>(history.state.id || null);

const pageTitle = ref(id.value ? "Chỉnh sửa thực đơn" : "Thêm mới thực đơn");
const breadcrumbItems = ref([
  { label: "Quản lý thực đơn", link: foodManagerRoute.menuManager.path },
  { label: pageTitle.value, link: "" }
]);

const modalOpen = ref([false]);

// Dữ liệu chi tiết cho menu (tên, mô tả, ...)
const dataDetail = ref<OwnerMenuReq>({
  name: "",
  code: "",
  foodStoreSeq: "",
  useYn: "Y",
  description: "",
  foodSeqs: []
});

// Danh sách các món ăn đã chọn để hiển thị trong bảng
const selectedFoods = ref<OwnerProductResDTO[]>([]);
// Danh sách ID của các món ăn đã chọn (để truyền cho modal)
const listCheckBoxGrid = ref<string[]>([]);

// Tải dữ liệu khi ở chế độ chỉnh sửa
onBeforeMount(async () => {
  if (id.value) {
    store.setLoading(true);
    try {
      // Tải song song thông tin menu và danh sách sản phẩm
      const [detailRes, productsRes] = await Promise.all([
        getDataDetail(id.value),
        findProductsInMenu(id.value)
      ]);
      dataDetail.value = detailRes.data.data;
      selectedFoods.value = productsRes.data.data;
      listCheckBoxGrid.value = selectedFoods.value.map(p => p.foodSeq);
    } catch (e) {
      console.error("Lỗi khi tải dữ liệu chi tiết menu:", e);
      alert(t("common.message.error"), t("common.alertTitle"), back);
    } finally {
      store.setLoading(false);
    }
  }
});

const back = () => {
  router.push({ path: foodManagerRoute.menuManager.path });
};

const openModal = (index: number) => {
  modalOpen.value[index] = true
}
const closeModal = (index: number) => {
  modalOpen.value[index] = false
}

// Hàm được gọi khi xác nhận chọn món ăn từ Modal
const handleSelectFood = (foods: OwnerProductResDTO[]) => {
  selectedFoods.value = foods;
  listCheckBoxGrid.value = selectedFoods.value.map(p => p.foodSeq);
  closeModal(0);
};

// Xóa một món ăn khỏi danh sách đã chọn
const removeFood = (index: number) => {
  selectedFoods.value.splice(index, 1);
  listCheckBoxGrid.value = selectedFoods.value.map(p => p.foodSeq);
};

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
      store.setLoading(true);
      try {
        // Tạo một payload duy nhất bao gồm cả thông tin menu và danh sách ID sản phẩm
        const payload: OwnerMenuReq = {
          ...dataDetail.value,
          foodSeqs: selectedFoods.value.map(food => food.foodSeq)
        };

        // Gọi một API saveData duy nhất
        await saveData(payload);

        alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {
          back();
        });

      } catch (e) {
        console.error("Lỗi khi lưu menu:", e);
        alert(t("common.message.error"), t("common.alertTitle"));
      } finally {
        store.setLoading(false);
      }
    }
  );
};
</script>
