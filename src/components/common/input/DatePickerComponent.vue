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
      :placeholder="placeholder"
      :disabled="isDisable"
      format="yyyy-MM-dd"
      model-type="yyyy-MM-dd"
      auto-apply
      :enable-time-picker="false"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css' // Import CSS mặc định của thư viện

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
  }
})

const emit = defineEmits(['update:modelValue', 'changeData'])

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
  /* Thay màu xanh mặc định thành màu cam chủ đạo (hoặc đổi thành mã màu dự án của bạn, ví dụ: #f97316) */
  --dp-primary-color: #f97316 !important; 
  --dp-border-radius: 4px !important;
  --dp-font-family: inherit !important;
}

/* Style cho Input tương thích hoàn toàn với InputBase */
.dp__input {
  height: 42px !important; /* Chiều cao đồng bộ với InputBase */
  padding-left: 40px !important; /* Đẩy text sang phải để không dính icon */
  font-size: 14px !important;
  color: #1e293b !important;
  border-color: #cbd5e1 !important;
  border-radius: 4px !important;
  transition: all 0.2s ease !important;
}

/* Trạng thái Hover & Focus giống InputBase */
.dp__input:hover {
  border-color: #cbd5e1 !important;
}

.dp__input:focus {
  border-color: #f97316 !important; /* Màu viền khi click vào */
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12) !important; /* Hiệu ứng Shadow cam */
}

/* Căn chỉnh lại vị trí Icon lịch */
.dp__input_icon {
  left: 10px !important;
  color: #64748b !important;
}
</style>