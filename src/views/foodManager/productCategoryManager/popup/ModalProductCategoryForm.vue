<template>
  <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal">
    <!-- Header -->
    <template #title>
      <strong>{{ isEditMode ? 'Cập nhật danh mục' : 'Thêm mới danh mục' }}</strong>
    </template>
    <!-- Body -->
    <template #default>
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 25%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">Tên danh mục</th>
              <td class="td_input">
                <InputBase id="cate_name" required v-model:modelValue="formData.name" />
              </td>
            </tr>
            <tr>
              <th scope="row">Danh mục cha</th>
              <td class="td_input">
                <!-- Giả sử bạn có component SelectBase -->
                <SelectBase
                    v-model="formData.parentCategorySeq"
                    :options="parentCategoryOptions"
                    label="name"
                    valueKey="categorySeq"
                    placeholder="-- Chọn danh mục cha --"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <!-- Footer -->
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close" @click="closeModal()">
        Hủy
      </button>
      <button type="button" class="button btn_xl btn_blue" @click="onSave()">
        Lưu
      </button>
    </template>
  </TModal>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { useI18n } from "vue-i18n";
import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
import { commonStore } from "@/stores/common";
import { getDataDetail, saveData, getAllCategories } from '@/stores/foodOrder/productCategory/productCategory.service';
import type { OwnerProductCategoryDetailDTO, OwnerProductCategoryFilterReq, OwnerProductCategoryReq, OwnerProductCategoryResDTO } from '@/stores/foodOrder/productCategory/productCategory.type';
import { PAGINATION_PAGE_SIZE } from '@/constants/screen.const';

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

// Props từ component cha
const props = defineProps<{
  isOpen: boolean,
  dataSelect: string,
}>();

// Emit cho parent
const emit = defineEmits(["closeModal", "confirmAction"]);

const isEditMode = computed(() => !!props.dataSelect);

const formData = ref<OwnerProductCategoryReq>({
  foodStoreSeq: "", // TODO: Lấy từ store của owner
  name: "",
  description: "",
  parentCategorySeq: null,
});

const dataSearch = ref<OwnerProductCategoryFilterReq>({
  name: "",
  foodStoreSeq: "", // TODO: Lấy từ store của owner
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const parentCategoryOptions = ref<OwnerProductCategoryResDTO[]>([]);

onBeforeMount(async () => {
  store.setLoading(true);
  try {
    // Luôn lấy danh sách danh mục cha để hiển thị dropdown
    const categoriesRes = await getAllCategories(dataSearch.value);
    parentCategoryOptions.value = categoriesRes.data.data;
    
    if (isEditMode.value) {
      const res = await getDataDetail(props.dataSelect);
      formData.value = res.data.data as OwnerProductCategoryDetailDTO;
    }
  } catch(e) {
    console.error(e);
  } finally {
    store.setLoading(false);
  }
});

const onSave = async () => {
  if (!formData.value.name) {
    alert(t("common.messageValidateRequired"), t("common.alertTitle"), () => { });
    return;
  }
  confirm(
    t("common.message.confirmSave"),
    t("common.confirmTitle"),
    async () => {
      await saveData(formData.value).then(() => {
        alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {
          emit("confirmAction");
        });
      });
    }
  );
};

const closeModal = () => emit("closeModal");
</script>
