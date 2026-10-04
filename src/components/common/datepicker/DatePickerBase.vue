<!-- File: src/components/common/DatePickerBase.vue -->
<template>
  <div class="flex flex-col gap-1.5 w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Vue DatePicker Component -->
    <VueDatePicker
      v-model="dateValue"
      :placeholder="!type ? placeholder : type === 'year' ? 'YYYY' : 'YYYY-MM'"
      :disabled="isDisable"
      :format="dateFormat"
      :model-type="dateFormat"
      :month-picker="type === 'month'"
      :year-picker="type === 'year'"
      :year-range="[1950, 2100]"
      auto-apply
      :enable-time-picker="false"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  modelValue: {
    type: [String, Date, Object],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  required: {
    type: Boolean,
    default: false
  },
  isDisable: {
    type: Boolean,
    default: false
  },
  // Thêm prop 'type' để chuyển đổi chế độ chọn: 'date' | 'month' | 'year'
  type: {
    type: String,
    default: 'date',
    validator: (val: string) => ['date', 'month', 'year'].includes(val)
  }
})

const emit = defineEmits(['update:modelValue', 'changeData'])

// Tự động điều chỉnh Format dựa trên kiểu chọn (Date / Month / Year)
const dateFormat = computed(() => {
  if (props.type === 'month') return 'yyyy-MM'
  if (props.type === 'year') return 'yyyy'
  return 'yyyy-MM-dd'
})

// Binding 2 chiều chuẩn Vue 3
const dateValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('changeData', val)
  }
})
</script>

<style>
/* Tùy chỉnh màu sắc đồng bộ với InputBase */
.dp__theme_light {
  --dp-primary-color: #f97316 !important; 
  --dp-border-radius: 4px !important;
  --dp-font-family: inherit !important;
}

/* Style cho Input tương thích hoàn toàn với InputBase */
.dp__input {
  height: 42px !important;
  padding-left: 40px !important;
  font-size: 14px !important;
  color: #1e293b !important;
  border-color: #cbd5e1 !important;
  border-radius: 4px !important;
  transition: all 0.2s ease !important;
}

.dp__input:hover {
  border-color: #cbd5e1 !important;
}

.dp__input:focus {
  border-color: #f97316 !important;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12) !important;
}

.dp__input_icon {
  left: 10px !important;
  color: #64748b !important;
}
</style>