<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
      <div v-for="(floor, index) in floors" :key="index" class="box dp_block floor">
        <div class="box_inner">
          <h3 class="box_title">{{ floor.name }}</h3>
        </div>
        <div class="grid">
          <div
            v-for="table in floor.tables"
            :key="table.id"
            class="table"
            :class="table.status"
            @click="openModal(0)"
          >
            <div class="table-number">{{ table.name }}</div>
            <!-- <div class="table-desc">{{ table.desc }}</div> -->
          </div>
        </div>
      </div>
  </section>
  <TModal :is-open="modalOpen[0]" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal(0)">
    <template #title>
      <strong>개인정보 수집 및 이용에 대한 동의</strong>
    </template>
    <template #default>
      <h1>fdfasd</h1>
    </template>
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close " @click="confirmAction">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue  " @click="cancelAction">확인
      </button>
    </template>
  </TModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const floors = ref([
  {
    name: 'Tầng 1',
    tables: createTables(1, 50),
  },
  {
    name: 'Tầng 2',
    tables: createTables(101, 50),
  },
]);
const modalOpen = ref([false]);

function createTables(startId:number, count:number) {
  const tables = [];
  for (let i = 0; i < count; i++) {
    tables.push({
      id: startId + i,
      name: `Bàn ${i + 1}`,
      desc: `Mô tả ${i + 1}`,
      status: i % 3 === 0 ? 'occupied' : i % 3 === 1 ? 'reserved' : 'available'
    });
  }
  return tables;
}

const openModal = (index: number) => {
  modalOpen.value[index] = true
}
const closeModal = (index: number) => {
  modalOpen.value[index] = false
}
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  margin-top: 10px;
}
.table {
  background: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.2s;
}
.table-number {
  font-weight: bold;
}
.table.available {
  border-color: green;
  background-color: #e6ffe6;
}
.table.occupied {
  border-color: red;
  background-color: #ffe6e6;
}
.table.reserved {
  border-color: orange;
  background-color: #fff6e6;
}
.table:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
