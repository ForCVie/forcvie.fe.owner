<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
  <div class="page_toparea dp_flex al_center jc_between">
    <h2 class="page_title">{{ pageTitle }}</h2>
    <ToggleSwitch v-model="openSwtich" size="medium" @click="changeOpenStore()" />
  </div>
    <div v-show="!modalOpen[5]">
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
      <!-- <div class="box_inner">
        <span class="box_note">Lưu ý:
          <strong>Các trạng thái bàn</strong> 
          <ul style="list-style: inside;">
            <li class="pb_2" style="list-style: inside;"><span style="margin-bottom: -5px;" class="available wd_20 hg_20 dp_inline mr_3"></span>Có khách</li>
            <li class="pb_2" style="list-style: inside;"><span style="margin-bottom: -5px;" class="occupied wd_20 hg_20 dp_inline mr_3"></span>Còn trống</li>
            <li class="pb_2" style="list-style: inside;"><span style="margin-bottom: -5px;" class="reserved wd_20 hg_20 dp_inline mr_3"></span>Dọn bàn</li>
          </ul>
        </span>
      </div> -->
      <div v-for="(floor, index) in dataDetail?.floors" :key="index" class="box dp_block floor">
        <div class="box_inner">
          <h3 class="box_title">{{ floor.floorName }}</h3>
        </div>
        <div class="grid">
          <div v-for="(table, index) in floor.storeTables" :key="table.tableSeq" class="table"
            :class="table.status ? table.status : 'occupied'" @click="selectDataTable(table)">
            <div class="table-number">{{ table.tableName }}</div>
          </div>
        </div>
      </div>

    </div>
    <StoreOrderFood v-if="modalOpen[5]" :modalOpen="modalOpen[5]" :closeModal="closeModal" :openModal="openModal" />
  </section>
  <PopupSeatDetail :modalOpen="modalOpen[0]" :closeModal="closeModal" :openModal="openModal" />
  <PopupSeatQr :modalOpen="modalOpen[1]" :closeModal="closeModal" />
  <PopupSeatDetailOrder :modalOpen="modalOpen[2]" :closeModal="closeModal" />
  <PopupSeatDetailRemoveOrder :modalOpen="modalOpen[3]" :closeModal="closeModal" />
  <PopupSeatOrder :modalOpen="modalOpen[4]" :closeModal="closeModal" />
  <PopupSelectMenu :modalOpen="modalOpen[6]" :closeModal="closeModal" />
  <TModal
    :is-open="modalOpen[7]"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal(7)"
  >
    <template #title>
      <strong class="bold">Phương thức đặt bàn</strong>
    </template>
    <template #default>
      <div class="dp_flex jc_around al_center">
        <button class="button btn_md btn_primary" @click="selectOpenStart('QR')">
          Đặt qua QRCode
        </button>
        <button class="button btn_md btn_primary" @click="selectOpenStart('TT')">
          Đặt món trực tiếp
        </button>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal(7)"
      >
        Đóng
      </button>
    </template>
  </TModal>
</template>

<script setup lang="ts">
import Badge from "@/components/common/badge/Badge.vue";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { ref } from "vue";
import PopupSeatQr from "./popup/PopupSeatQr.vue";
import PopupSeatDetail from "./popup/PopupSeatDetail.vue";
import PopupSeatDetailOrder from "./popup/PopupSeatDetailOrder.vue";
import PopupSeatDetailRemoveOrder from "./popup/PopupSeatDetailRemoveOrder.vue";
import PopupSeatOrder from "./popup/PopupSeatOrder.vue";
import StoreOrderFood from "./main/StoreOrderFood.vue";
import ToggleSwitch from "@/components/common/toggleSwitch/ToggleSwitch.vue";
import PopupSelectMenu from "./popup/PopupSelectMenu.vue";
import { changeActiveStore, getDetailStoreOrder } from "@/stores/storeOrder/storeOrder.service";
import { commonStore } from "@/stores/common";
import { useAlert, useToast } from "@/components/common/composables/useAlert";
import { StoreOrderDetailResponse, StoreTableResDTO } from "@/stores/storeOrder/storeOrder.type";

const pageTitle = ref("Quản lý đặt bàn");

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const toast = useToast();

const modalOpen = ref([false, false, false, false, false, false, false]);
const searchModel = ref({
  statusOrder: "",
});
const openCollapse = ref(false);
const openSwtich = ref(false);
const listStatus = ref<CodeMngModel[]>([
  {
    cdId: "",
    cdNm: "Tất Cả",
    upCdId: "",
  },
  {
    cdId: "10520",
    cdNm: "Có khách",
    upCdId: "",
  },
  {
    cdId: "10510",
    cdNm: "Bàn Trống",
    upCdId: "",
  },
  {
    cdId: "10530",
    cdNm: "Đặt trước",
    upCdId: "",
  },
]);

const dataDetail = ref<StoreOrderDetailResponse>();
const tableSelect = ref<StoreTableResDTO>();

onBeforeMount(async () => {
  store.setLoading(true);
  await getDetailStoreOrder().then((res) => {
    dataDetail.value = res.data.data;
    console.log(dataDetail.value);
    
    if (dataDetail.value?.isActive === 'N') {
      openSwtich.value = false
      alert("Trạng thái hoạt động đang tắt. Hãy bật trạng thái hoạt động để đóng khách");
    } else {
      openSwtich.value = true
    }
  }).finally(() => {
    store.setLoading(false);
  })
})

const changeOpenStore = () => {
  store.setLoading(true);
  let isActive = "";
  if (!openSwtich.value) {
    isActive = "Y";
  } else {
    isActive = "N";
  }
  changeActiveStore(isActive).then((res) => {
    if (isActive === "Y") {
      toast("Bật trạng thái mở cửa thành công");
    } else {
      toast("Tắt trạng thái mở cửa thành công");
    }
  }).finally(() => {
    store.setLoading(false);
  })
}

const openModal = (index: number) => {
  modalOpen.value[index] = true;
};
const closeModal = (index: number) => {
  modalOpen.value[index] = false;
};
const selectDataTable = (tableSel:StoreTableResDTO) => {
  tableSelect.value = tableSel;
  console.log(tableSelect.value);
  
  if (tableSelect.value.status == null || tableSelect.value.status === '10510') {
    openModal(7);
  }
} 
const selectOpenStart = (type:string) => {
  if (type === "QR") {
    openModal(1);
  } else {
    openModal(4);
  }
  closeModal(7);
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

.available {
  border: 2px solid green;
  background-color: #e6ffe6;
}

.occupied {
  border: 2px solid red;
  background-color: #ffe6e6;
}

.reserved {
  border: 2px solid orange;
  background-color: #fff6e6;
}

.blink-shadow {
  animation: blinkBoxShadow 1s infinite;
}

@keyframes blinkBoxShadow {

  0%,
  100% {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  50% {
    box-shadow: 0 0 20px 5px rgba(0, 255, 0, 0.8);
  }
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
