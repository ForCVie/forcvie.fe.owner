<template>
  <TModal
    :size="'sm'"
    :is-open="modalOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal(2)"
  >
    <template #title>
      <strong class="bold">Chi tiết đặt hàng</strong>
    </template>
    <template #default>
        <div class="ta_c">
          <Timeline :items="timelineData" />
        </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal(2)"
      >
        닫기
      </button>
      <button
        type="button"
        class="button btn_xl btn_blue"
        @click="closeModal(2)"
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

const timelineData = [
  { time: '15/10/2020 10:30', label: 'Ordered', description: 'Order has been placed by the customer.' },
  { time: '15/10/2020 14:00', label: 'Processing', description: 'Order is being prepared.' },
  { time: '15/10/2020 16:15', label: 'Shipped', description: 'Order has left the warehouse.' },
  { time: '16/10/2020 10:00', label: 'Delivered', description: 'Order has been delivered to the customer.' },
];

</script>