```vue
<template>
  <div class="flex flex-col gap-1.5 w-full" :class="{ 'has-error': isError }">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="isRequired" class="text-red-500">*</span>
    </label>

    <!-- Vue DatePicker -->
    <VueDatePicker
      :uid="inputId"
      v-model="dateValue"
      :placeholder="inputPlaceholder"
      :disabled="isDisable"
      :format="dateFormat"
      :model-type="dateFormat"
      :month-picker="type === 'month'"
      :year-picker="type === 'year'"
      :time-picker="type === 'time'"
      :year-range="[1950, 2100]"
      auto-apply
      :enable-time-picker="type === 'time'"
      class="w-full"
    >
      <!-- Gắn ID vào input thực tế để store đọc được giá trị -->
      <template #dp-input="{ value, onInput, onBlur: slotBlur, onKeydown }">
        <input
          :id="inputId"
          type="text"
          class="dp__input"
          :value="value ?? ''"
          :placeholder="inputPlaceholder"
          :disabled="isDisable"
          @input="onInput"
          @blur="handleBlur(slotBlur)"
          @keydown="onKeydown"
        />
      </template>
    </VueDatePicker>

    <!-- Thông báo lỗi -->
    <span v-if="errorMessage && showMess" class="error-text">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  useAttrs,
  watch,
} from 'vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { commonStore } from '@/stores/common'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  modelValue?: string | Date | object | null
  label?: string
  placeholder?: string
  required?: boolean
  isDisable?: boolean
  type?: 'date' | 'month' | 'year' | 'time'
  id?: string
  showMess?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  placeholder: 'YYYY-MM-DD',
  required: false,
  isDisable: false,
  type: 'date',
  showMess: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | Date | object | null): void
  (e: 'changeData', value: string | Date | object | null): void
}>()

const attrs = useAttrs()
const store = commonStore()

// ID ổn định trong suốt vòng đời component
const inputId = computed(
  () =>
    props.id ||
    (typeof attrs.id === 'string' ? attrs.id : '') ||
    `datepicker-${Math.random().toString(36).substring(2, 9)}`,
)

const isRequired = computed(
  () => props.required || attrs.required !== undefined && attrs.required !== false,
)

const errorMessage = ref('')
const isError = ref(false)

// Format theo loại dữ liệu
const dateFormat = computed(() => {
  switch (props.type) {
    case 'month':
      return 'yyyy-MM'
    case 'year':
      return 'yyyy'
    case 'time':
      return 'HH:mm'
    default:
      return 'yyyy-MM-dd'
  }
})

const inputPlaceholder = computed(() => {
  if (props.placeholder !== 'YYYY-MM-DD') {
    return props.placeholder
  }

  switch (props.type) {
    case 'month':
      return 'YYYY-MM'
    case 'year':
      return 'YYYY'
    case 'time':
      return 'HH:mm'
    default:
      return props.placeholder
  }
})

// Binding hai chiều
const dateValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('changeData', val)
    validateInput(val)
  },
})

// Kiểm tra giá trị rỗng
const isEmptyValue = (val: unknown): boolean => {
  if (val === null || val === undefined) {
    return true
  }

  if (typeof val === 'string') {
    return val.trim() === ''
  }

  return false
}

// Validate riêng DatePicker, không kiểm tra toàn bộ form
const validateInput = (val: unknown) => {
  isError.value = isRequired.value && isEmptyValue(val)

  errorMessage.value = isError.value
    ? 'Trường này là bắt buộc'
    : ''
}

const handleBlur = (slotBlur: () => void) => {
  slotBlur()
  validateInput(props.modelValue)
}

// Đồng bộ trạng thái lỗi khi dữ liệu ban đầu hoặc dữ liệu API thay đổi
watch(
  () => props.modelValue,
  (newVal) => {
    validateInput(newVal)
  },
  { immediate: true },
)

// Đăng ký ID để store kiểm tra khi nhấn Save
onMounted(() => {
  if (isRequired.value && inputId.value) {
    store.setRequired(inputId.value)
  }
})

// Xóa ID khi component bị hủy
onBeforeUnmount(() => {
  if (isRequired.value && inputId.value) {
    store.removeRequired(inputId.value)
  }
})
</script>

<style>
.dp__theme_light {
  --dp-primary-color: #f97316 !important;
  --dp-border-radius: 4px !important;
  --dp-font-family: inherit !important;
}

.dp__input {
  height: 42px !important;
  padding-left: 12px !important;
  padding-right: 12px !important;
  font-size: 14px !important;
  color: #1e293b !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 4px !important;
  transition: all 0.2s ease !important;
  width: 100%;
  outline: none;
}

.dp__input:hover {
  border-color: #cbd5e1 !important;
}

.dp__input:focus {
  border-color: #f97316 !important;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12) !important;
}

.has-error .dp__input {
  border-color: #ef4444 !important;
}

.has-error .dp__input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12) !important;
}

.error-text {
  font-size: 12px;
  color: #ef4444;
  margin-top: 2px;
}
</style>
```