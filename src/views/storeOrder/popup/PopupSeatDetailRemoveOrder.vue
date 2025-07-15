<template>
    
  <TModal
    :size="'md'"
    :is-open="modalOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal(3)"
  >
    <template #title>
      <strong class="bold">Xác nhận hủy món {{'(Tên Món ăn)'}}</strong>
    </template>
    <template #default>
      <div>
        <div class="box_section">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 28%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">Người Hủy</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">Chức vụ</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">Lý do</th>
                <td class="td_input">
                  <TextArea />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal(3)"
      >
        닫기
      </button>
      <button
        type="button"
        class="button btn_xl btn_blue"
        @click="closeModal(3)"
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