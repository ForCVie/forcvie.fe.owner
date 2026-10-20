<template>
  <div class="textarea-wrapper" :class="{ 'has-error': hasError }">
    <label v-if="label" :for="elementId" class="textarea-label">
      {{ label }}
      <span v-if="isRequired" class="required-star">*</span>
    </label>

    <div class="textarea-field-container">
      <textarea
        :id="elementId"
        ref="textareaRef"
        v-bind="attrs"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        class="custom-textarea"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
    </div>

    <span v-if="showMess && errorMessage" class="error-text">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, onUpdated, useAttrs, nextTick } from 'vue'
import { commonStore } from '@/stores/common'

// 1. Props Definition
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  rows?: number | string
  resizeAuto?: boolean
  showMess?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  rows: 4,
  resizeAuto: false,
  showMess: true
})

// 2. Emits
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const attrs = useAttrs()
const store = commonStore()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const errorMessage = ref('')
const hasError = computed(() => !!errorMessage.value)
let timeout: ReturnType<typeof setTimeout> | null = null

// Tự sinh ID nếu không truyền
const elementId = computed(() => (attrs.id as string) || `textarea-${Math.random().toString(36).substring(2, 9)}`)
const isRequired = computed(() => attrs.required !== undefined && attrs.required !== false)

// Tự động điều chỉnh chiều cao theo nội dung
const adjustHeight = () => {
  if (!props.resizeAuto || !textareaRef.value) return
  const el = textareaRef.value
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

// Validation logic
const validateInput = (val: string) => {
  if (isRequired.value && (!val || val.trim() === '')) {
    errorMessage.value = 'Trường này là bắt buộc'
  } else {
    errorMessage.value = ''
  }
}

// Event Handlers
const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const val = target.value

  if (props.resizeAuto) {
    adjustHeight()
  }

  // Debounce ngắn để sync v-model
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('update:modelValue', val)
  }, 50)

  validateInput(val)
}

const onBlur = (event: FocusEvent) => {
  const target = event.target as HTMLTextAreaElement
  validateInput(target.value)
  emit('blur', event)
}

const onFocus = (event: FocusEvent) => {
  const target = event.target as HTMLTextAreaElement
  validateInput(target.value)
  emit('focus', event)
}

// Watcher & Lifecycle Hooks
watch(
  () => props.modelValue,
  (newVal) => {
    validateInput(newVal || '')
    store.checkRequired()
    nextTick(() => {
      if (props.resizeAuto) adjustHeight()
    })
  }
)

onMounted(() => {
  const id = elementId.value
  if (isRequired.value && id) {
    store.setRequired(id)
  }
  store.checkRequired()
  if (props.resizeAuto) {
    adjustHeight()
  }
})

onBeforeUnmount(() => {
  const id = elementId.value
  if (isRequired.value && id) {
    store.removeRequired(id)
  }
  if (timeout) clearTimeout(timeout)
})

onUpdated(() => {
  store.checkRequired()
})
</script>

<style scoped>
.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-bottom: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Label chuẩn hóa đồng bộ với CustomInput & SelectBoxBase */
.textarea-label {
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

.textarea-field-container {
  width: 100%;
}

.custom-textarea {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #1e293b; /* slate-800 */
  background-color: #ffffff;
  border: 1px solid #cbd5e1; /* slate-300 */
  border-radius: 4px; /* Bo góc 4px đồng bộ */
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
  resize: vertical; /* Cho phép kéo giãn dọc theo mặc định */
}

.custom-textarea:focus {
  border-color: #f97316; /* Viền màu cam focus đồng bộ */
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
}

.custom-textarea::placeholder {
  color: #94a3b8; /* slate-400 */
}

/* Trạng thái Lỗi */
.has-error .custom-textarea {
  border-color: #ef4444;
}

.has-error .custom-textarea:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

.error-text {
  font-size: 12px;
  color: #ef4444;
  margin-top: 2px;
}
</style>