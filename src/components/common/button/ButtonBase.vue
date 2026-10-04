<!-- File: src/components/common/button/ButtonBase.vue -->
<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center justify-center font-medium rounded transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
      // Dynamic Size Classes
      sizeClasses[size] || sizeClasses.md,
      // Dynamic Variant Classes
      variantClasses[variant] || variantClasses.primary,
      customClass
    ]"
    :disabled="disabled || loading"
    v-bind="attrs"
    @click="handleClick"
  >
    <!-- Spinner loading khi nút ở trạng thái chờ -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- Slot nội dung hoặc tên nút -->
    <slot>{{ buttonName }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import Swal from 'sweetalert2'
import { checkFlagStore } from '@/stores/common/checkRole'
import { useI18n } from 'vue-i18n'

// 1. Props Definitions
const props = defineProps({
  buttonName: {
    type: String,
    default: ''
  },
  variant: {
    type: String as () => 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost',
    default: 'primary'
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  checkRole: {
    type: Boolean,
    default: false // Đổi thành true nếu muốn kiểm tra quyền truy cập trước khi bấm
  },
  class: {
    type: String,
    default: ''
  }
})

// Alias cho prop class trùng từ khóa
const customClass = computed(() => props.class)

// 2. Emits & Attrs
const emit = defineEmits(['click'])
const attrs = useAttrs()

// 3. Stores & i18n
const { t } = useI18n()
const roleStore = checkFlagStore()

// 4. Variant Styles Mapping
const variantClasses: Record<string, string> = {
  primary: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200'
}

// 5. Size Styles Mapping (Default Height 42px cho 'md')
const sizeClasses: Record<string, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-[42px] px-5 text-sm',
  lg: 'h-12 px-6 text-base'
}

// 6. Click Handler với Role Check tùy chọn & Việt hóa SweetAlert
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return

  // Nếu prop checkRole = true thì kiểm tra phân quyền
  if (props.checkRole && !roleStore.flag) {
    Swal.fire({
      text: t('common.message.warring') || 'Bạn không có quyền thực hiện thao tác này!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#f97316', // Tone màu cam chủ đạo
      confirmButtonText: 'Đồng ý'
    })
    return
  }

  emit('click', event)
}
</script>