<template>
  <TModal
    :size="'sm'"
    :is-open="modalOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal(1)"
  >
    <template #title>
      <strong class="bold">Xác nhận chọn bàn {{ '(Tên Bàn)' }}</strong>
    </template>
    <template #default>
      <div>
        <div class="ta_c">
          <QRCode
            :urlValue="'Hello fskajfhah dfsahfsadkjfh sdkajfhsad fhkasdfsjdafhsadjkfhsakjfhsdajkfhsad '"
          />
        </div>
        <span></span>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal(1)"
      >
        닫기
      </button>
      <button
        type="button"
        class="button btn_xl btn_blue"
        @click="closeModal(1)"
      >
        확인
      </button>
    </template>
  </TModal>
</template>
<script setup lang="ts">
defineProps({
  modalOpen: {
    type: Boolean,
    default: false,
  },
  closeModal: {
    type: Function,
    required: true,
  },
});
</script>