<template>
  <div
    class="input-wrapper"
    :class="{ 'has-error': showMess && !!errorMessage }"
  >
    <!-- Label -->
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="isRequired" class="required-star">*</span>
    </label>

    <div class="input-field-container">
      <input
        :id="inputId"
        type="text"
        v-bind="attrs"
        :value="inputValue"
        :placeholder="placeholder"
        class="custom-input"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
    </div>

    <!-- Thông báo lỗi -->
    <span v-if="showMess && errorMessage" class="error-text">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  useAttrs,
  onMounted,
  onBeforeUnmount,
} from 'vue'

import { commonStore } from '@/stores/common'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  isNumber?: boolean
  minValue?: number
  maxValue?: number
  decimalPlaces?: number
  id?: string
  showMess?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  isNumber: false,
  decimalPlaces: 2,
  showMess: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const attrs = useAttrs()
const store = commonStore()

// ID ổn định trong suốt vòng đời component
const inputId = computed(
  () =>
    props.id ||
    (typeof attrs.id === 'string' ? attrs.id : '') ||
    `input-${Math.random().toString(36).substring(2, 9)}`,
)

const isRequired = computed(
  () => props.required !== false &&
    attrs.required !== undefined &&
    attrs.required !== false,
)

const errorMessage = ref('')

let timeout: ReturnType<typeof setTimeout> | null = null
let stampValue = ''

const regex = computed(
  () => new RegExp(`^[0-9]*\\.?[0-9]{0,${props.decimalPlaces}}$`),
)

// Binding hai chiều
const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string | number) => emit('update:modelValue', val),
})

// Validate riêng input
const validateInput = (val: unknown) => {
  const isEmpty =
    val === null ||
    val === undefined ||
    String(val).trim() === ''

  errorMessage.value =
    isRequired.value && isEmpty
      ? 'Trường này là bắt buộc'
      : ''
}

// Input handler
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let val = target.value

  if (props.isNumber) {
    // Chỉ giữ lại số và dấu chấm
    val = val.replace(/[^0-9.]/g, '')

    // Chỉ cho phép một dấu chấm thập phân
    const firstDot = val.indexOf('.')
    if (firstDot !== -1) {
      val =
        val.substring(0, firstDot + 1) +
        val.substring(firstDot + 1).replace(/\./g, '')
    }

    // Xử lý số 0 ở đầu
    if (val.length > 1 && val.startsWith('0') && !val.startsWith('0.')) {
      val = val.replace(/^0+/, '')
    }

    if (regex.value.test(val)) {
      stampValue = val
    } else {
      val = stampValue
    }

    // Thêm 0 nếu bắt đầu bằng dấu chấm
    if (val.startsWith('.')) {
      val = '0' + val
    }

    // Kiểm tra min/max khi giá trị là số hoàn chỉnh
    const numericValue = parseFloat(val)

    if (!isNaN(numericValue)) {
      if (
        props.minValue !== undefined &&
        numericValue < props.minValue
      ) {
        val = props.minValue.toString()
      } else if (
        props.maxValue !== undefined &&
        numericValue > props.maxValue
      ) {
        val = props.maxValue.toString()
      }
    }

    // Cập nhật ngay để tránh Save trước khi debounce chạy
    inputValue.value = val
    target.value = val
  } else {
    // Xóa timeout cũ và cập nhật ngay model khi nhập
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    inputValue.value = val
  }

  validateInput(val)
}

const onBlur = (event: FocusEvent) => {
  // Đảm bảo giá trị mới nhất đã được đồng bộ
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }

  validateInput(inputValue.value)
  emit('blur', event)
}

const onFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Đồng bộ lỗi khi modelValue được truyền vào hoặc thay đổi từ bên ngoài
watch(
  () => props.modelValue,
  (newVal) => {
    validateInput(newVal)
  },
  { immediate: true },
)

// Đăng ký các trường required
onMounted(() => {
  if (isRequired.value && inputId.value) {
    store.setRequired(inputId.value)
  }
})

// Gỡ đăng ký khi component bị hủy
onBeforeUnmount(() => {
  if (isRequired.value && inputId.value) {
    store.removeRequired(inputId.value)
  }

  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
})
</script>

<style scoped>
.input-field-container {
  width: 100%;
}

.custom-input {
  width: 100%;
  height: 42px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #1e293b;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.custom-input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
}

.custom-input::placeholder {
  color: #94a3b8;
}

.has-error .custom-input {
  border-color: #ef4444;
}

.has-error .custom-input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

.error-text {
  font-size: 12px;
  color: #ef4444;
  margin-top: 2px;
}
</style>