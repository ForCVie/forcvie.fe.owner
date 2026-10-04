<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />

    <div class="box dp_block">
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">Tên món ăn</th>
              <td class="td_input">
                <InputBase v-model:modelValue="dataDetail.name" id="nm" required />
              </td>
            </tr>

            <tr>
              <th scope="row" class="required">Mục lục</th>
              <td>
                <div class="dp_flex al_center">
                  <SelectBoxBaseSearch id="categorySeq" name="categorySeq" v-model="dataDetail.categorySeq"
                    :data="listCategory" :value-select-all="t('common.select')" />
                  <div>
                    <ButtonBase class="button btn_xs btn_blue wd_100 ml-2" @click="openModal(1)">
                      Thêm mục lục
                    </ButtonBase>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th scope="row" class="required">Size</th>
              <td>
                <div class="dp_flex al_center">
                  <SelectBoxBaseSearch id="sizeSeq" name="sizeSeq" v-model="dataDetail.sizeSeq" :data="listSize"
                    :value-select-all="t('common.select')" />
                  <div>
                    <ButtonBase class="button btn_xs btn_blue wd_100 ml-2" @click="openModal(0)">
                      Thêm size
                    </ButtonBase>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th scope="row" class="required">Ảnh món ăn</th>
              <td>
                <!-- <InputFileBase v-model="dataDetail.imageUrl" /> chưa làm-->
              </td>
            </tr>

            <tr>
              <th scope="row" class="required">Giá</th>
              <td class="td_input">
                <InputBase v-model:modelValue="dataDetail.price" id="price" required :is-number="true" :min-value="0"
                  :decimal-places="0" />
              </td>
            </tr>

            <tr>
              <th scope="row" class="required">Mô tả</th>
              <td>
                <QuillEditor v-model="dataDetail.description" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box_section">
      <div class="btn_area">
        <ButtonBase type="button" class="button btn_xs btn_white" @click="back()">
          {{ t("common.list") }}
        </ButtonBase>
        <ButtonBase type="button" class="button btn_xs btn_blue" @click="onSave">
          {{ t("common.save") }}
        </ButtonBase>
      </div>
    </div>

    <!-- Popup Thêm/Sửa Kích Cỡ -->
    <ModalSizeForm v-if="modalOpen[0]" :isOpen="modalOpen[0]" @closeModal="closeModal(0)" @confirmAction="saveSize" />
    <!-- Popup Thêm/Sửa Danh Mục -->
    <ModalProductCategoryForm v-if="modalOpen[1]" :isOpen="modalOpen[1]" @closeModal="closeModal(1)"
      @confirmAction="saveCategory" />
  </section>
</template>

<script setup lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBaseSearch from "@/components/common/input/SelectBoxBaseSearch.vue";
import { STATE_N } from "@/constants/common.const";
import router from "@/router";
import { foodManagerRoute } from "@/router/routeItems/foodManagerRoute";
import { commonStore } from "@/stores/common";

// Gọi API thực tế
import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
import { PAGINATION_PAGE_SIZE } from "@/constants/screen.const";
import { getAllCategories } from "@/stores/foodOrder/productCategory/productCategory.service";
import { OwnerProductCategoryFilterReq } from "@/stores/foodOrder/productCategory/productCategory.type";
import { saveData } from "@/stores/foodOrder/productMng/productMng.service";
import { OwnerProductReq } from "@/stores/foodOrder/productMng/productMng.type";
import { getLstAll } from "@/stores/foodOrder/sizeMng/sizeMng.service";
import ModalSizeForm from "../sizeManager/popup/ModalSizeForm.vue";
import ModalProductCategoryForm from "../productCategoryManager/popup/ModalProductCategoryForm.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();
const pageTitle = ref("Quản lý món ăn");
const breadcrumbItems = ref([{ label: pageTitle.value, link: "/" }]);
const modalOpen = ref([false, false]);

// Dữ liệu chi tiết món ăn
const dataDetail = ref({
  delYn: STATE_N,
  name: "",
  categorySeq: "",
  foodStoreSeq: "",
  sizeSeq: "",
  price: 0,
  description: "",
  imageUrl: null
});

// Danh sách danh mục và size
const listCategory = ref<{ cdId: string; cdNm: string }[]>([]);
const listSize = ref<{ cdId: string; cdNm: string }[]>([]);
const dataSearch = ref<OwnerProductCategoryFilterReq>({
  name: "",
  foodStoreSeq: "", // TODO: Lấy từ store của owner
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});
onBeforeMount(async () => {
  store.setLoading(true);
  try {
    // Lấy danh sách mục lục (category)
    const categoryRes = await getAllCategories(dataSearch.value);
    listCategory.value = categoryRes.data.data.map((c: any) => ({
      cdId: c.categorySeq,
      cdNm: c.name,
    }));
    listCategory.value.unshift({ cdId: "", cdNm: t("common.select") });

    // Lấy danh sách size
    const sizeRes = await getLstAll(dataSearch.value);
    listSize.value = sizeRes.data.data.map((s: any) => ({
      cdId: s.sizeSeq,
      cdNm: s.name,
    }));
    listSize.value.unshift({ cdId: "", cdNm: t("common.select") });
  } catch (e) {
    console.error("Lỗi load danh sách:", e);
  } finally {
    store.setLoading(false);
  }
});

const openModal = (index: number) => {
  modalOpen.value[index] = true;
};

const back = () => {
  router.push({ path: foodManagerRoute.menuManager.path });
};

const closeModal = (index: number) => {
  modalOpen.value[index] = false
}
const onSave = async () => {
  if (store.check) {
    alert(
      t("common.messageValidateRequired"),
      t("common.alertTitle"),
      () => { }
    );
    return;
  }

  confirm(t("common.message.confirmSave"), t("common.confirmTitle"), async () => {
    const dataSave = {
      ...dataDetail.value,
    } as OwnerProductReq;
    await saveData(dataSave);
    alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {
      back();
    });
  });
};
const saveSize = () => {
  // Cập nhật lại danh sách size sau khi thêm/sửa
  getLstAll(dataSearch.value).then((res) => {
    listSize.value = res.data.data.map((s: any) => ({
      cdId: s.sizeSeq,
      cdNm: s.name,
    }));
    listSize.value.unshift({ cdId: "", cdNm: t("common.select") });
  });
  closeModal(0);
};

const saveCategory = () => {
  // Cập nhật lại danh sách category sau khi thêm/sửa
  getAllCategories(dataSearch.value).then((res) => {
    listCategory.value = res.data.data.map((c: any) => ({
      cdId: c.categorySeq,
      cdNm: c.name,
    }));
    listCategory.value.unshift({ cdId: "", cdNm: t("common.select") });
  });
  closeModal(1);
};
</script>
