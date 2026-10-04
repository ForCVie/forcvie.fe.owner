<!-- File: src/components/common/RadioBoxBase.vue -->
<template>
  <p 
    v-if="mode !== MODE_HIDDEN" 
    class="radio_row radio_base inline-flex items-center gap-2"
    :class="{ 'opacity-60 cursor-not-allowed': isDisabled }"
  >
    <input
      :id="elementId"
      v-model="computedValue"
      type="radio"
      :name="name"
      :value="value"
      :disabled="isDisabled"
      :class="[
        'w-4 h-4 border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer disabled:cursor-not-allowed transition-colors',
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
    type: [Boolean, String, Number],
    default: undefined
  },
  value: {
    type: [Boolean, String, Number],
    required: true
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

// 3. Tự động sinh ID nếu không truyền để click vào label luôn kích hoạt Radio
const generatedId = `radio_${Math.random().toString(36).substring(2, 9)}`
const elementId = computed(() => props.id || generatedId)

// 4. Computed v-model binding 2 chiều
const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

// Tự động vô hiệu hóa nếu props disabled=true, isDisable=true hoặc đang ở chế độ MODE_DETAIL
const isDisabled = computed(() => {
  return props.disabled || props.isDisable || props.mode === MODE_DETAIL
})

// 5. Handlers
const handleChange = (event: Event) => {
  emit('change', event)
}
</script>

<style scoped>
.radio_base {
  width: auto !important;
  user-select: none;
}
</style>