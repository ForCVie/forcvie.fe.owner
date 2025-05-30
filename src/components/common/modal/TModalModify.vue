<template>
  <TModal
      :is-open="isOpen"
      :is-show-header="isShowHeaderModify"
      :is-show-footer="isShowFooterModify"
      :modal-id="modalId"
      :size="size"
      @close-modal="$emit('close-modal')"
  >
    <template #default>
      <h4 class="text-center">{{ message }}</h4>
      <div class="btn_area">
        <button type="button" class="btn_md btn_blue" @click="modifyAction">확인</button>
        <button type="button" class="btn_md btn_white popup_close" @click="$emit('close-modal')">
          취소
        </button>
      </div>
    </template>
  </TModal>
</template>

<script lang="ts">
import TModal from '@/components/common/modal/TModal.vue'

export default {
  components: { TModal },
  props: {
    title: String,
    message: String,
    isOpen: Boolean,
    size: String,
    isShowHeader: {
      type: Boolean,
      default: false
    },
    isShowFooter: {
      type: Boolean,
      default: false
    },
    modalId: String
  },
  data() {
    return {
      isShowHeaderModify: false,
      isShowFooterModify: false
    }
  },
  methods: {
    click() {
      this.openModal()
    },
    modifyAction() {
      this.$emit('modifyAction')
    }
  }
}
</script>

<style lang="scss" scoped>
.popup_wrap .btn_area {
  border-top: none;
}
</style>
