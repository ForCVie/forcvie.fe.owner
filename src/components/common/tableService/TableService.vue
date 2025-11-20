<template>
  <div class="grid-container">
    <div
      v-for="(table, index) in modelValue"
      :key="index"
      class="grid-item cursor"
      @click="openModal(0, index)"
    >
      <div class="cell-content">
        <div class="table-name">{{ table.tableName }}</div>
        <!-- <div class="table-desc">{{ table.description }}</div> -->
      </div>
    </div>
    <div
      class="grid-item cursor"
      @click="openModal(0, modelValue.length + 1)"
    >
      <div class="cell-content">
        <div class="circle">+</div>
      </div>
    </div>
  </div>

  <!-- Popup -->
  <ModalSeatManager
  v-if="modalOpen[0]"
    :isOpen="modalOpen[0]"
    :dataSelect="dataSelect"
    @closeModal="closeModal(0)"
    @confirmAction="addTable"
    @cancelAction="closeModal(0)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalSeatManager from "@/views/seatManager/seatManager/popup/ModalSeatManager.vue";
import { StoreTableResDTO } from "@/stores/seatManager/seatManager/seatManager.type";

const props = defineProps<{
  modelValue: StoreTableResDTO[];
}>();

// ✅ Cho phép emit để cập nhật lại giá trị
const emit = defineEmits(["update:modelValue"]);

const modalOpen = ref([false]);
const dataSelect = ref();
const indexSelect = ref(-1);

const openModal = (index: number, dataIndex:number) => {
  indexSelect.value = dataIndex;
  modalOpen.value[index] = true;
  dataSelect.value = props.modelValue[dataIndex];
};

const closeModal = (index: number) => {
  modalOpen.value[index] = false;
};

// ✅ Ví dụ: thêm bàn mới khi nhấn dấu "+"
const addTable = (data: StoreTableResDTO) => {
  // Nếu chưa chọn vị trí, thêm vào cuối
  if (indexSelect.value == null || indexSelect.value >= props.modelValue.length) {
    props.modelValue.push(data);
  } else {
    // Chèn vào vị trí được chọn (không xóa phần tử nào)
    props.modelValue.splice(indexSelect.value, 1, data);
  }

  // Cập nhật lại v-model
  emit("update:modelValue", [...props.modelValue]);

  console.log(props.modelValue);
  closeModal(0);
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
}

.grid-item {
  min-height: 100px;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px;
}

.cell-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  width: 30px;
  height: 30px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.circle:hover {
  opacity: 0.8;
}

.table-name {
  font-weight: 600;
  font-size: 14px;
  margin-top: 4px;
}

.table-desc {
  font-size: 12px;
  color: #666;
}
</style>
