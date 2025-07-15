<template>
  <TModal
    :is-open="modalOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal(4)"
  >
    <template #title>
      <strong class="bold">Xác nhận chọn bàn {{ '(Tên Bàn)' }} giúp khách</strong>
    </template>
    <template #default>
        <div class="box_section">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 28%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">Nhân viên đặt bàn</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">Chức vụ nhân viên</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">Mã khách hàng</th>
                <td class="td_input">
                  <InputBase />
                </td>
              </tr>
              <tr>
                <th scope="row">Tên khách hàng</th>
                <td class="td_input">
                  <InputBase />
                </td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td class="td_input">
                  <InputBase />
                </td>
              </tr>
              <tr>
                <th scope="row">Số điện thoại</th>
                <td class="td_input">
                  <InputBase />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal(4)"
      >
        닫기
      </button>
      <button
        type="button"
        class="button btn_xl btn_blue"
        @click="closeModal(4)"
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