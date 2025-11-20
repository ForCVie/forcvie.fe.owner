<template>
    <!-- Start Popup Select Food -->
    <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal">
        <!-- Header -->
        <template #title>
            <strong>Cập nhật size</strong>
        </template>
        <!-- Body -->
        <template #default>
            <div class="box_section">
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 18%" />
                        <col style="width: auto" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row" class="required">Tiêu đề</th>
                            <td class="td_input">
                                <InputBase id="nm" required v-model="formData.name" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <button type="button" class="button btn_xl btn_white popup_close" @click="cancelAction()">
                {{ t("common.list") }}
            </button>
            <button type="button" class="button btn_xl btn_blue" @click="onSave()">
                {{ t("common.confirm") }}
            </button>
        </template>
    </TModal>
    <!-- End Popup Select Food -->
</template>

<script setup lang="ts">
import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
import { commonStore } from "@/stores/common";
import { getDataDetail, saveData } from "@/stores/foodOrder/sizeMng/sizeMng.service";
import { OwnerProductSizeDetailDTO, OwnerProductSizeReq } from "@/stores/foodOrder/sizeMng/sizeMng.type";
import { useI18n } from "vue-i18n";

// i18n
const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

onBeforeMount(async () => {
    if (props.dataSelect) {
        const res = await getDataDetail(props.dataSelect);
        formData.value = res.data.data as OwnerProductSizeDetailDTO;
    }
});

// Props từ component cha
const props = defineProps({
    isOpen: { type: Boolean, default: false },
    dataSelect: { type: String, default: "" },
});

// Emit cho parent
const emit = defineEmits(["closeModal", "clearFormSearch", "searchFormData", "confirmAction", "cancelAction"]);

const formData = ref<OwnerProductSizeReq>({
    sizeSeq: "",
    name: "",
    delYn: "",
    foodStoreSeq: "",
});

// Gọi hàm emit
const closeModal = () => emit("closeModal");
const confirmAction = () => emit("confirmAction");
const cancelAction = () => emit("cancelAction");

const onSave = async () => {

  if (!formData.value.name) {
    alert(t("common.messageValidateRequired"), t("common.alertTitle"), () => { });
    return;
  }
    confirm(
        t("common.message.confirmSave"),
        t("common.confirmTitle"),
        async () => {
            const dataSave = {
                ...formData.value,
            } as OwnerProductSizeReq;
            await saveData(dataSave).then((res) => {
                alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {
                    // closeModal();
                    confirmAction();
                });
            });
        }
    );
};
</script>
