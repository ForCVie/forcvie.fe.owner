<template>
  <div class="select-wrapper" :class="{ 'has-error': hasError }">
    <label v-if="label" :for="elementId" class="select-label">
      {{ label }}
      <span v-if="isRequired" class="required-star">*</span>
    </label>

    <span v-if="isDisable" class="is_disabled_text">
      {{ selectedLabel }}
    </span>

    <div v-else class="select-field-container">
      <v-select
        :id="elementId"
        v-bind="attrs"
        :options="data"
        label="cdNm"
        :reduce="(item: CodeMngModel) => item.cdId"
        :modelValue="modelValue"
        :multiple="multiple"
        :disabled="isDisable"
        :searchable="searchable"
        :placeholder="placeholder"
        :append-to-body="appendToBody"
        @update:modelValue="onValueChange"
        @open="onOpen"
        @close="onClose"
        class="custom-v-select"
      >
        <template #open-indicator="{ attributes }">
          <svg
            v-bind="attributes"
            class="vs__open-indicator"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </template>

        <template #no-options="{ search, searching }">
          <span v-if="searching" class="no-options-text">
            Không tìm thấy "<strong>{{ search }}</strong>"
          </span>
          <span v-else class="no-options-text">Không có dữ liệu</span>
        </template>
      </v-select>

      <!-- Input ẩn để Store kiểm tra trường bắt buộc -->
      <input
        :id="requiredFieldId"
        :value="hiddenInputValue"
        type="text"
        hidden
        readonly
      />
    </div>

    <span v-if="showMess && errorMessage" class="error-text">
      {{ errorMessage }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useAttrs } from 'vue'
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { commonStore } from '@/stores/common'
import type { CodeMngModel } from '@/stores/common/codeMng/codeMng.type'

interface Props {
  modelValue?: string | number | (string | number)[]
  label?: string
  placeholder?: string
  data?: CodeMngModel[]
  isDisable?: boolean
  multiple?: boolean
  appendToBody?: boolean
  searchable?: boolean
  showMess?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Chọn...',
  data: () => [],
  isDisable: false,
  multiple: false,
  appendToBody: false,
  searchable: true,
  showMess: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | (string | number)[] | undefined): void
  (e: 'change', val: string | number | (string | number)[] | undefined): void
  (e: 'focusout'): void
}>()

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const store = commonStore()

const errorMessage = ref('')

const elementId = computed(
  () => (attrs.id as string) || `select-${Math.random().toString(36).substring(2, 9)}`
)

const requiredFieldId = computed(() => `${elementId.value}_check`)

const isRequired = computed(
  () => attrs.required !== undefined && attrs.required !== false
)

const hasError = computed(() => !!errorMessage.value)

const hiddenInputValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.join(',')
  }
  return props.modelValue ?? ''
})

const selectedLabel = computed(() => {
  if (Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 0) return '---'

    const names = props.data
      .filter(item => props.modelValue!.includes(item.cdId))
      .map(item => item.cdNm)

    return names.join(', ') || '---'
  }

  const matched = props.data.find(item => item.cdId == props.modelValue)
  return matched ? matched.cdNm : props.modelValue || '---'
})

const validate = (
  val: string | number | (string | number)[] | undefined
) => {
  if (!isRequired.value) {
    errorMessage.value = ''
    return
  }

  if (Array.isArray(val)) {
    errorMessage.value = val.length === 0
      ? 'Vui lòng chọn ít nhất một lựa chọn'
      : ''
    return
  }

  errorMessage.value =
    val === undefined || val === null || val === ''
      ? 'Vui lòng chọn trường này'
      : ''
}

const onValueChange = (
  val: string | number | (string | number)[] | undefined
) => {
  emit('update:modelValue', val)
  emit('change', val)
  validate(val)
}

const onOpen = () => {
  validate(props.modelValue)
}

const onClose = () => {
  emit('focusout')
}

// Đồng bộ thông báo lỗi khi giá trị thay đổi.
// Không gọi store.checkRequired() ở đây.
watch(
  () => props.modelValue,
  newVal => {
    validate(newVal)
  },
  { immediate: true }
)

// Chỉ đăng ký ID cho Store.
// Việc kiểm tra tổng thể sẽ được thực hiện khi người dùng bấm Lưu.
onMounted(() => {
  if (isRequired.value) {
    store.setRequired(requiredFieldId.value)
  }
})

onBeforeUnmount(() => {
  if (isRequired.value) {
    store.removeRequired(requiredFieldId.value)
  }
})
</script>

<style scoped lang="scss">
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-bottom: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Label đồng bộ với Input */
.select-label {
  font-size: 14px;
  font-weight: 600;
  color: #334155; /* slate-700 */
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 20px;
}

.required-star {
  color: #ef4444;
  font-weight: bold;
}

.select-field-container {
  width: 100%;
}

.is_disabled_text {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 4px; /* Bo góc 4px */
  color: #64748b;
  font-size: 14px;
}

/* Custom vue-select khớp 100% với Input */
:deep(.custom-v-select) {
  .vs__dropdown-toggle {
    width: 100%;
    height: 42px; /* Cùng chiều cao 42px với Input */
    padding: 0 8px;
    border-radius: 4px; /* Bo góc 4px chuẩn */
    border: 1px solid #cbd5e1; /* slate-300 */
    background-color: #ffffff;
    transition: all 0.2s ease;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  /* Trạng thái Focus */
  &.vs--open .vs__dropdown-toggle,
  .vs__dropdown-toggle:focus-within {
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
  }

  .vs__selected-options {
    padding: 0;
    align-items: center;
    gap: 4px;
    flex-grow: 1;
  }

  /* Ô Search Input bên trong */
  .vs__search {
    margin: 0;
    padding: 0 4px;
    font-size: 14px;
    color: #1e293b;
    border: none;
    height: 100%;

    &::placeholder {
      color: #94a3b8; /* slate-400 */
      font-size: 14px;
    }
  }

  .vs__selected {
    margin: 0;
    padding: 0 4px;
    font-size: 14px;
    color: #1e293b;
    border: none;
  }

  /* Icon mũi tên & Nút xóa */
  .vs__actions {
    padding: 0 4px;
    display: flex;
    align-items: center;
  }

  .vs__clear {
    fill: #94a3b8;
    &:hover {
      fill: #64748b;
    }
  }

  .vs__open-indicator {
    fill: #64748b;
    transition: transform 0.2s ease;
  }

  &.vs--open .vs__open-indicator {
    transform: rotate(180deg);
  }

  /* Style cho Tag khi chọn nhiều (Multiple) */
  &.vs--multiple .vs__selected {
    background-color: #fff7ed;
    border: 1px solid #ffedd5;
    color: #ea580c;
    border-radius: 3px;
    font-size: 13px;
    padding: 2px 6px;

    .vs__deselect {
      fill: #ea580c;
    }
  }

  /* Dropdown Menu xổ xuống */
  .vs__dropdown-menu {
    border-radius: 4px; /* Bo góc 4px */
    border: 1px solid #cbd5e1;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 4px;
    margin-top: 4px;
    max-height: 220px;
    z-index: 50;
  }

  .vs__dropdown-option {
    border-radius: 3px;
    padding: 8px 12px;
    font-size: 14px;
    color: #334155;

    &--highlight {
      background-color: #fff7ed;
      color: #ea580c;
    }
  }
}

.no-options-text {
  color: #94a3b8;
  padding: 8px 12px;
  display: block;
  text-align: center;
  font-size: 14px;
}

/* Trạng thái Báo lỗi */
.has-error :deep(.custom-v-select) .vs__dropdown-toggle {
  border-color: #ef4444;
}

.has-error :deep(.custom-v-select.vs--open) .vs__dropdown-toggle {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

.error-text {
  font-size: 12px;
  color: #ef4444;
  margin-top: 2px;
}
</style>