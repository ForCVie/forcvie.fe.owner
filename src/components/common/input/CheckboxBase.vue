<!-- File: src/components/common/CheckBoxBase.vue -->
<template>
  <p 
    v-if="mode !== MODE_HIDDEN" 
    class="check_row flex items-center gap-2" 
    :class="[
      { 'opacity-60 cursor-not-allowed': isDisabled },
      isRemoveCheckBox ? 'flex items-center' : ''
    ]"
  >
    <input
      :id="elementId"
      v-model="computedValue"
      type="checkbox"
      :name="name"
      :value="value"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="isDisabled"
      :indeterminate="indeterminate"
      :class="[
        'w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer disabled:cursor-not-allowed',
        className
      ]"
      @change="handleChange"
    />
    
    <label 
      v-if="label" 
      :for="elementId" 
      class="text-sm font-medium text-gray-700 select-none cursor-pointer disabled:cursor-not-allowed"
    >
      {{ label }}
    </label>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MODE_HIDDEN, MODE_DETAIL } from '@/constants/screen.const'

// 1. Props Definitions
const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number, Array] as Array<any>,
    default: false
  },
  value: {
    type: [String, Number, Array],
    default: undefined
  },
  trueValue: {
    type: [Boolean, String, Number],
    default: true
  },
  falseValue: {
    type: [Boolean, String, Number],
    default: false
  },
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isDisable: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  isRemoveCheckBox: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})

// 2. Emits
const emit = defineEmits(['update:modelValue', 'change'])

// Tự động tạo ID ngẫu nhiên nếu không truyền prop `id` để click vào label luôn ăn vào checkbox
const generatedId = `checkbox_${Math.random().toString(36).substring(2, 9)}`
const elementId = computed(() => props.id || generatedId)

// 3. Computed v-model binding 2 chiều
const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

// Tự động vô hiệu hóa nếu props `disabled=true`, `isDisable=true` hoặc đang ở chế độ `MODE_DETAIL`
const isDisabled = computed(() => {
  return props.disabled || props.isDisable || props.mode === MODE_DETAIL
})

// 4. Handlers
const handleChange = (event: Event) => {
  emit('change', event)
}
</script>

<style scoped>
/* Có thể bổ sung style riêng nếu dự án không dùng Tailwind hoàn toàn */
.check_row {
  user-select: none;
}
</style>