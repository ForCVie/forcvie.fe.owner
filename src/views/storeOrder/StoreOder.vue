<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <CollapseBase :isShow="openCollapse" :title="'Tìm kiếm nhanh'" :isCheck="true" :onClick="() => {
      openCollapse = !openCollapse;
    }
      ">
      <div class="mt-4 search_box col_3">
        <ul>
          <li>
            <p>Tiêu Đề</p>
            <InputBase id="bannerNm" />
          </li>
          <li>
            <p>URL</p>
            <InputBase id="url" />
          </li>
          <li>
            <p>Thể Loại</p>
            <InputBase id="typeCd" />
          </li>
        </ul>
      </div>
    </CollapseBase>
    <div class="box dp_block pd_0">
      <div class="box_section">
        <div class="radio_tab_lg_wrap">
          <p class="radio_tab_lg" v-for="(status, index) in listStatus">
            <input type="radio" :id="`searchFormStatus_${index}`" name="radio" v-model="searchModel.statusOrder"
              :value="status.cdId" />
            <label :for="`searchFormStatus_${index}`">
              <Badge :count="100" :max="-1"> {{ status.cdNm }} </Badge>
            </label>
          </p>
        </div>
      </div>
    </div>

    <div v-for="(floor, index) in floors" :key="index" class="box dp_block floor">
      <div class="box_inner">
        <h3 class="box_title">{{ floor.name }}</h3>
      </div>
      <div class="grid">
        <div v-for="table in floor.tables" :key="table.id" class="table" :class="table.status" @click="openModal(0)">
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
      <button type="button" class="button btn_xl btn_white popup_close" @click="closeModal(0)">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue" @click="closeModal(0)">
        확인
      </button>
    </template>
  </TModal>
  <TModal :size="'sm'" :is-open="modalOpen[1]" :is-show-header="true" :is-show-footer="true"
    @close-modal="closeModal(1)">
    <template #title>
      <strong>Chọn Bàn ...</strong>
    </template>
    <template #default>
      <div>
        <div class="ta_c">
          <QRCode :urlValue="'Hello fskajfhah dfsahfsadkjfh sdkajfhsad fhkasdfsjdafhsadjkfhsakjfhsdajkfhsad '" />
        </div>
        <span></span>
      </div>
    </template>
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close" @click="closeModal(1)">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue" @click="closeModal(1)">
        확인
      </button>
    </template>
  </TModal>
</template>

<script setup lang="ts">
import Badge from "@/components/common/badge/Badge.vue";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { ref } from "vue";

const floors = ref([
  {
    name: "Tầng 1",
    tables: createTables(1, 50),
  },
  {
    name: "Tầng 2",
    tables: createTables(101, 50),
  },
]);
const modalOpen = ref([false, true]);
const searchModel = ref({
  statusOrder: "",
});
const openCollapse = ref(false);
const listStatus = ref<CodeMngModel[]>([
  {
    cdId: "",
    cdNm: "Tất Cả",
    upCdId: "",
  },
  {
    cdId: "1",
    cdNm: "Có khách",
    upCdId: "",
  },
  {
    cdId: "2",
    cdNm: "Còn Trống",
    upCdId: "",
  },
  {
    cdId: "3",
    cdNm: "Dọn bàn",
    upCdId: "",
  },
  {
    cdId: "4",
    cdNm: "Đặt trước",
    upCdId: "",
  },
]);

function createTables(startId: number, count: number) {
  const tables = [];
  for (let i = 0; i < count; i++) {
    tables.push({
      id: startId + i,
      name: `Bàn ${i + 1}`,
      desc: `Mô tả ${i + 1}`,
      status: i % 3 === 0 ? "occupied" : i % 3 === 1 ? "reserved" : "available",
    });
  }
  return tables;
}

const openModal = (index: number) => {
  modalOpen.value[index] = true;
};
const closeModal = (index: number) => {
  modalOpen.value[index] = false;
};
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

.radio_tab_lg {
  margin-right: 0;
  flex: 1;
}

.radio_tab_lg label {
  max-width: 100%;
  display: flex;
  align-items: center;
  padding: 1em 0;
}
</style>
