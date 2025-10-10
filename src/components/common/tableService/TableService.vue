<template>
  <div class="grid-container">
    <div
      v-for="index in totalSeats"
      :key="index"
      class="grid-item cursor"
      @click="openModal(0)"
    >
      <div class="cell-content">
        <div class="circle" v-if="index == totalSeats">+</div>
        <div v-if="index != totalSeats" class="table-name">Bàn {{ index }}</div>
        <div v-if="index != totalSeats" class="table-desc">Mô tả {{ index }}</div>
      </div>
    </div>
  </div>
  <!-- Start Popup Select Food -->
  <ModalSeatManager :isOpen="modalOpen[0]" :dataSelect="dataSelect" @closeModal="closeModal(0)" @confirmAction="closeModal(0)"
      @cancelAction="closeModal(0)" />
  <!-- End Popup Select Food -->
</template>

<script setup lang="ts">
import ModalSeatManager from '@/views/seatManager/seatManager/popup/ModalSeatManager.vue';

const totalSeats = 12;

const dataSelect = ref();

const modalOpen = ref([false]);

const openModal = (index: number) => {
  modalOpen.value[index] = true
}
const closeModal = (index: number) => {
  modalOpen.value[index] = false
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 4 cột, có thể đổi nếu muốn */
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
