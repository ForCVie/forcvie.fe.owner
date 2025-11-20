<template>
  <!-- Start Popup Select Food -->
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <!-- Header -->
    <template #title>
      <strong>Cập nhật thông tin bàn</strong>
    </template>

    <!-- Body -->
    <template #default>
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 28%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">Tên bàn</th>
              <td class="td_input">
                <InputBase id="nm" v-model="localData.tableName" required />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Số lượng</th>
              <td class="td_input">
                <InputBase id="capa" :isNumber="true" :min-value="0" :max-value="100" :decimal-places="0" v-model="localData.capacity" required />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Mô tả</th>
              <td class="td_input">
                <TextArea id="desc" v-model="localData.description" required />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Footer -->
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal"
      >
        닫기
      </button>
      <button
        type="button"
        class="button btn_xl btn_blue"
        @click="confirmAction"
      >
        확인
      </button>
    </template>
  </TModal>
  <!-- End Popup -->
</template>

<script setup lang="ts">
import { StoreTableResDTO } from "@/stores/seatManager/seatManager/seatManager.type";
import { onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Props từ component cha
const props = defineProps<{
    isOpen: { type: Boolean, default: false },
    dataSelect: StoreTableResDTO;
}>();

// Emit cho parent
const emit = defineEmits(["closeModal", "confirmAction", "cancelAction"]);

// Biến local để binding form
const localData = ref<StoreTableResDTO>({
    tableSeq: "",
    capacity: 0,
    description: "",
    tableName: ""
});

// ✅ Khi component sắp mount, copy dữ liệu prop sang local
onBeforeMount(() => {
    console.log(props.dataSelect);
    
  if (props.dataSelect) {
    localData.value = props.dataSelect
  }
});

const closeModal = () => emit("closeModal");
const confirmAction = () => {
  // Gửi dữ liệu local ra parent khi xác nhận
  emit("confirmAction", localData.value);
};
</script>
