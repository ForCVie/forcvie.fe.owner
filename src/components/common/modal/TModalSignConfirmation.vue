<template>
    <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :modal-id="modalId" @close-modal="closeModal">
        <!-- Modal content goes here -->
        <template #title>
            <strong>서명하기</strong>
        </template>
        <template #default>
            <!-- Component input draw -->
            <InputDrawBase ref="componentInputDraw" :width="650" :height="300"></InputDrawBase>
        </template>
        <template #footer>
            <!-- Footer content goes here -->
            <!-- Button close modal -->
            <button type="button" @click="closeModal" class="btn_md btn_white popup_close">닫기</button>
            <!-- Button Clear Draw -->
            <button type="button" @click="clearSignature" class="btn_md text-white bg-red-500">
                삭제
            </button>
            <!-- Button Save Draw  -->
            <button type="button" @click="saveSignature" class="btn_md btn_black">저장</button>
        </template>
    </TModal>
    <!-- Confirm successful save -->
    <TModalComfirm :is-open="modalOpenConfirm" :is-show-header="true" :is-show-footer="true" :modal-id="'modalId'"
        :title="'저장정보 확인'" :message="`서명이 성공적으로 저장되었습니다!!!`" :size="'xs'" @close-modal="closeModalConfirm"></TModalComfirm>
    <TModalModify :is-open="modalOpenModify" :is-show-header="true" :is-show-footer="false" :modal-id="'modalIdModify'"
        :size="'xs'" @modifyAction="modifyAction" @close-modal="closeModalModify" :title="'저장정보 확인'" :message="`저장하시겠습니까?`">
    </TModalModify>
    <!-- Confirm not saved -->
    <TModalModify :is-open="modalOpenModifyDontSave" :is-show-header="true" :is-show-footer="false"
        :modal-id="'modalIdModifyDontSave'" :size="'xs'" @modifyAction="modifyActionDontSave"
        @close-modal="closeModalModifyDontSave" :title="'정보 확인'" :message="`서명 정보가 삭제됩니다. 저장하지 않고 나가시겠습니까?`"></TModalModify>
</template>
<script>
import TModal from '@/components/common/modal/TModal.vue'
import RadiobuttonBase from '@/components/common/input/RadiobuttonBase.vue'
import InputDrawBase from '@/components/common/input/InputDrawBase.vue'


export default {
    name: "TModalDignConfirmation",
    props: {
        isOpen: Boolean,
    },
    data() {
        return {
            modalId: 'demo',
            isDrawing: "그리기",
            canvas: null,
            context: null,
            drawing: false,
            listRadio1: [
                { id: '그리기', name: '그리기' },
                { id: '서명파일 등록', name: '서명파일 등록' }
            ],
            fileName: "프로필 사진 선택",
            modalOpenConfirm: false,
            modalOpenModify: false,
            modalOpenModifyDontSave: false
        }
    },
    components: {
        TModal,
        RadiobuttonBase,
        InputDrawBase
    },
    methods: {
        saveSignature() {
            this.modalOpenModify = true
        },
        modifyAction() {
            // use dataInput ==> data in input
            const blob = this.$refs.componentInputDraw.dataInput
            // Handle logic other
            this.$emit('sendImageFromChilds', blob);
            this.modalOpenModify = false
            this.modalOpenConfirm = true
            this.clearSignature();
            this.clearFileInput();
        },
        clearSignature() {
            // use function in input
            this.$refs.componentInputDraw.clearSignature()
        },
        closeModal() {
            this.modalOpenModifyDontSave = true
        },
        clearFileInput() {
            // use function in input
            this.$refs.componentInputDraw.clearFileInput()
        },
        closeModalConfirm() {
            // Thêm loading page nếu cần
            this.modalOpenConfirm = false
            this.$emit('close-modal')
            // Thưc hiện chuyển hướng đến route mong muốn
        },
        openModalModify() {
            this.modalOpenModify = true
        },
        closeModalModify() {
            this.modalOpenModify = false
        },
        modifyActionDontSave() {
            this.$emit('close-modal')
            this.clearSignature();
            this.clearFileInput();
            this.modalOpenModifyDontSave = false;
        },
        closeModalModifyDontSave() {
            this.modalOpenModifyDontSave = false
        }
    }
}
</script>
<style scoped></style>
  