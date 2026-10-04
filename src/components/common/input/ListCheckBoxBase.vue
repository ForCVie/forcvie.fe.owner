<!-- File: src/components/common/input/ListCheckBoxBase.vue -->
<template>
  <div :class="['flex flex-col gap-1.5', className || customClass]">
    <!-- Label Title của nhóm Checkbox (Tương tự InputBase) -->
    <label v-if="label" class="text-sm font-medium text-gray-700 select-none flex items-center gap-1">
      <span>{{ label }}</span>
      <span v-if="isRequire" class="text-red-500 font-bold">*</span>
    </label>

    <!-- Danh sách Checkbox -->
    <div class="flex flex-wrap items-center gap-4">
      <!-- Checkbox Chọn tất cả -->
      <CheckboxBase
        v-if="hasCheckAll"
        :id="`${id}_all`"
        v-model="isCheckAll"
        :label="checkAllLabel"
        :name="name"
        :is-disable="isDisable"
        :mode="mode"
        @change="handleCheckAllChange"
      />

      <!-- Danh sách Checkbox thành phần -->
      <CheckboxBase
        v-for="option in listData"
        :key="option.cdId"
        :id="`${option.cdId}_${id}`"
        v-model="selectedValues"
        :value="option.cdId"
        :label="option.cdNm"
        :name="name || option.cdId"
        :is-disable="isDisable"
        :mode="mode"
        @change="handleItemChange"
      />
    </div>

    <!-- Thẻ input ẩn phục vụ validate form -->
    <input
      v-if="requireId"
      :id="requireId"
      type="hidden"
      :value="formattedModelValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUpdated } from 'vue'
import CheckboxBase from '@/components/common/input/CheckboxBase.vue'
import { commonStore } from '@/stores/common'
import type { CodeMngModel } from '@/stores/common/codeMng/codeMng.type'

// 1. Props Definitions
const props = defineProps({
  modelValue: {
    type: [String, Number, Array] as () => string | number | Array<string | number>,
    default: () => []
  },
  label: {
    type: String,
    default: '' // Label Title cho cả nhóm Checkbox
  },
  listData: {
    type: Array as () => Array<CodeMngModel>,
    default: () => []
  },
  id: {
    type: String,
    default: 'check_box'
  },
  name: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'show'
  },
  isDisable: {
    type: Boolean,
    default: false
  },
  hasCheckAll: {
    type: Boolean,
    default: false
  },
  checkAllLabel: {
    type: String,
    default: 'Tất cả'
  },
  useArray: {
    type: Boolean,
    default: false
  },
  requireId: {
    type: String,
    default: ''
  },
  isRequire: {
    type: Boolean,
    default: false
  }
})

// Alias cho prop class trùng từ khóa
const customClass = computed(() => props.class)

// 2. Emits
const emit = defineEmits(['update:modelValue', 'change'])

// 3. Store & Reactive States
const store = commonStore()
const selectedValues = ref<Array<string | number>>([])
const isCheckAll = ref(false)

// Giá trị chuỗi/mảng dùng cho thẻ input hidden
const formattedModelValue = computed(() => {
  return Array.isArray(props.modelValue) ? props.modelValue.join(',') : props.modelValue
})

// Sync dữ liệu từ modelValue bên ngoài vào state nội bộ
const syncFromModelValue = () => {
  if (props.modelValue !== undefined && props.modelValue !== null) {
    if (Array.isArray(props.modelValue)) {
      selectedValues.value = [...props.modelValue]
    } else if (typeof props.modelValue === 'string') {
      selectedValues.value = props.modelValue ? props.modelValue.split(',') : []
    } else {
      selectedValues.value = [props.modelValue]
    }
  } else {
    selectedValues.value = []
  }
  updateCheckAllStatus()
}

// Cập nhật trạng thái nút "Chọn tất cả"
const updateCheckAllStatus = () => {
  if (!props.listData || props.listData.length === 0) {
    isCheckAll.value = false
    return
  }
  isCheckAll.value = selectedValues.value.length === props.listData.length
}

// 4. Handlers
const emitValue = () => {
  const result = props.useArray ? selectedValues.value : selectedValues.value.join(',')
  emit('update:modelValue', result)
  emit('change', result)
}

const handleCheckAllChange = () => {
  if (isCheckAll.value) {
    selectedValues.value = props.listData.map((item) => item.cdId)
  } else {
    selectedValues.value = []
  }
  emitValue()
}

const handleItemChange = () => {
  updateCheckAllStatus()
  emitValue()
}

// Watcher theo dõi thay đổi từ ngoài truyền vào hoặc khi listData thay đổi
watch(() => props.modelValue, syncFromModelValue, { deep: true })
watch(() => props.listData, updateCheckAllStatus, { deep: true })

// 5. Lifecycle Hooks
onMounted(() => {
  syncFromModelValue()

  if (props.requireId && props.isRequire) {
    store.setRequired(props.requireId)
    store.checkRequired()
  }
})

onUpdated(() => {
  if (props.requireId && props.isRequire) {
    store.checkRequired()
  }
})
</script>