<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div v-for="(floor, indexFloor) in listFloor" class="box dp_block">
        <div class="box_inner">
          <h3 class="box_title">Tầng {{ indexFloor + 1 }}</h3>
          <div class="box_title_funtion">
            <a href="javascript:void(0);" @click="deleteFloor(indexFloor)">Xóa</a>
          </div>
        </div>
      <div class="box_section">
        <TableService v-model="floor.storeTables" />
      </div>
    </div>
    <div class="box_section btn_add_form">
      <div class="btn_area">
        <ButtonBase type="button" @click="addFloor()" class="button btn_md btn_white ">Thêm tầng</ButtonBase>
        <ButtonBase type="button" @click="saveFloor()" class="button btn_md btn_primary">Lưu</ButtonBase>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { commonStore } from "@/stores/common";
import { OwnerFloorRequest, OwnerFloorResDTO } from "../../../stores/seatManager/seatManager/seatManager.type";
import { getPageData, saveData } from "@/stores/seatManager/seatManager/seatManager.service";
import { useAlert } from "@/components/common/composables/useAlert";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();

const pageTitle = ref(`Quản lý tầng - bàn`);
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const listFloor = ref<OwnerFloorResDTO[]>([]);

onBeforeMount(async () => {
  await getDataFloor();
})

const getDataFloor = async () => {
  store.setLoading(true);
  await getPageData().then((res) => {
    if (res.data.data && res.data.data.length > 0) {
      listFloor.value = res.data.data;
    } else {
      addFloor();
    }
  })
  store.setLoading(false);
}

const deleteFloor = (indexSel: number) => {
  if (listFloor.value.length === 1) {
    alert(
      "Bạn không thể xóa tầng cuối",
      t("common.alertTitle"),
      () => {}
    );
    return;
  }
  listFloor.value = listFloor.value.filter((item, index) => index != indexSel);
}

const addFloor = () => {
  listFloor.value.push({
    floorSeq: "",
    description: "",
    floorName: "Tầng " + listFloor.value.length + 1,
    foodStoreSeq: "",
    storeTables: []
  })
}

const saveFloor = async () => {
  store.setLoading(true);
  const reqeuset = [
    ...listFloor.value
  ] as OwnerFloorRequest[];
  await saveData(reqeuset).then((res) => {
    alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {});
  }).catch((error) => {
    alert("Cửa hàng đang trong trạng thái hoạt động không thể chỉnh sửa.", t("common.alertTitle"), () => {});
  }).finally(() => {
    store.setLoading(false);
  });
}
</script>

<style scoped>
.form_info > li > p {
    text-align: left !important;
    font-size: 14px !important;
}
.btn_add_form {
  position: sticky;
  left: 0;
  right: 0;
  bottom: 30px;
}
</style>
