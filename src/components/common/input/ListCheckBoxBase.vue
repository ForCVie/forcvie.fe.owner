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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import CheckboxBase from '@/components/common/input/CheckboxBase.vue'
import { commonStore } from '@/stores/common'
import type { CodeMngModel } from '@/stores/common/codeMng/codeMng.type'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array] as () => string | number | Array<string | number>,
    default: () => []
  },
  label: {
    type: String,
    default: ''
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
  },
  showMess: {
    type: Boolean,
    default: true
  }
})

const customClass = computed(() => props.class)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number>): void
  (e: 'change', value: string | number | Array<string | number>): void
}>()

const store = commonStore()

const selectedValues = ref<Array<string | number>>([])
const isCheckAll = ref(false)

const formattedModelValue = computed(() => {
  return Array.isArray(props.modelValue)
    ? props.modelValue.join(',')
    : props.modelValue ?? ''
})

// Đồng bộ modelValue bên ngoài vào state nội bộ
const syncFromModelValue = () => {
  const value = props.modelValue

  if (Array.isArray(value)) {
    selectedValues.value = [...value]
  } else if (typeof value === 'string') {
    selectedValues.value = value
      ? value.split(',').filter(item => item !== '')
      : []
  } else if (typeof value === 'number') {
    selectedValues.value = [value]
  } else {
    selectedValues.value = []
  }

  updateCheckAllStatus()
}

// Cập nhật trạng thái checkbox "Chọn tất cả"
const updateCheckAllStatus = () => {
  const list = props.listData

  if (!list.length) {
    isCheckAll.value = false
    return
  }

  isCheckAll.value = list.every(item =>
    selectedValues.value.some(value => String(value) === String(item.cdId))
  )
}

// Phát giá trị theo cấu hình useArray
const emitValue = () => {
  const result = props.useArray
    ? [...selectedValues.value]
    : selectedValues.value.join(',')

  emit('update:modelValue', result)
  emit('change', result)
}

// Chọn hoặc bỏ chọn tất cả
const handleCheckAllChange = () => {
  selectedValues.value = isCheckAll.value
    ? props.listData.map(item => item.cdId)
    : []

  updateCheckAllStatus()
  emitValue()
}

// Xử lý khi checkbox thành phần thay đổi
const handleItemChange = () => {
  updateCheckAllStatus()
  emitValue()
}

// Đồng bộ khi modelValue thay đổi từ bên ngoài
watch(
  () => props.modelValue,
  () => syncFromModelValue(),
  { deep: true }
)

// Đồng bộ trạng thái chọn tất cả khi danh sách thay đổi
watch(
  () => props.listData,
  () => updateCheckAllStatus(),
  { deep: true }
)

// Chỉ đăng ký trường bắt buộc; không kiểm tra toàn bộ form tại đây
onMounted(() => {
  syncFromModelValue()

  if (props.requireId && props.isRequire) {
    store.setRequired(props.requireId)
  }
})

// Hủy đúng ID đã đăng ký
onBeforeUnmount(() => {
  if (props.requireId && props.isRequire) {
    store.removeRequired(props.requireId)
  }
})
</script>