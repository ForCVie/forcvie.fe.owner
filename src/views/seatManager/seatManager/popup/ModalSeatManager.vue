<template>
    <!-- Start Popup Select Food -->
    <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal">
        <!-- Header -->
        <template #title>
            <strong>Cập nhật thông tin bàn
            </strong>
        </template>
        <!-- Body -->
        <template #default>
            <div class="box_section">
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 28%" />
                        <col style="width: auto" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row" class="required">Tên bàn</th>
                            <td class="td_input">
                                <InputBase id="nm" required />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="required">Nhóm bàn</th>
                            <td class="td_input">
                                <SelectBoxBase />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="required">Mô tả</th>
                            <td class="td_input">
                                <TextArea id="nm" required />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <button type="button" class="button btn_xl btn_white popup_close" @click="confirmAction">
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
import { useI18n } from "vue-i18n";

// i18n
const { t } = useI18n();

// Props từ component cha
defineProps({
    isOpen: { type: Boolean, default: false },
    dataSelect: { type: Object }
});

// Emit cho parent
const emit = defineEmits(["closeModal", "clearFormSearch", "searchFormData", "confirmAction", "cancelAction"]);

// Gọi hàm emit
const closeModal = () => emit("closeModal");
const confirmAction = () => emit("confirmAction");
const cancelAction = () => emit("cancelAction");
</script>
