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
            <button type="button" class="button btn_xl btn_white popup_close" @click="saveData()">
                닫기
            </button>
            <button type="button" class="button btn_xl btn_blue" @click="cancelAction">
                확인
            </button>
        </template>
    </TModal>
    <!-- End Popup Select Food -->
</template>

<script setup lang="ts">
import { OwnerProductSizeReq } from "@/stores/foodOrder/sizeMng/sizeMng.type";
import { useI18n } from "vue-i18n";

// i18n
const { t } = useI18n();

onBeforeMount(() => {
    if (props.dataSelect) {
        console.log("Edit size", props.dataSelect);
    } else {
        console.log("Create size");
    }
});

// Props từ component cha
const props = defineProps({
    isOpen: { type: Boolean, default: false },
    dataSelect: { type: Object }
});

// Emit cho parent
const emit = defineEmits(["closeModal", "clearFormSearch", "searchFormData", "confirmAction", "cancelAction"]);
const formData = ref<OwnerProductSizeReq>({
    sizeSeq: "",
    name: "",
    description: "",
    foodStoreSeq: "",
});

// Gọi hàm emit
const closeModal = () => emit("closeModal");
const confirmAction = () => emit("confirmAction");
const cancelAction = () => emit("cancelAction");

const saveData = async () => {
    // Logic lưu dữ liệu
    console.log("Lưu dữ liệu size");
    const res = await getDataDetail(props.dataSelect!.sizeSeq);
        formData.value = res.data.data as OwnerProductSizeDetailDTO;
    confirmAction();
};
</script>
