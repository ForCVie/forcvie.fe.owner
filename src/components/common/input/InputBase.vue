<template>
  <div class="input-wrapper" :class="{ 'has-error': errorMessage }">
    <!-- Label Component -->
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
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        class="custom-input"
        :placeholder="placeholder"
      />
    </div>

    <!-- Thông báo lỗi bên dưới input -->
    <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
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
  onUpdated,
} from "vue";
import { commonStore } from "@/stores/common";

// 1. Props Definition
interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  isNumber?: boolean;
  minValue?: number;
  maxValue?: number;
  decimalPlaces?: number;
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  placeholder: "",
  isNumber: false,
  decimalPlaces: 2,
});

// 2. Emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const attrs = useAttrs();
const store = commonStore();

// Tạo unique ID nếu không truyền id từ attrs
const inputId = computed(
  () =>
    (props.id as string) ||
    `input-${Math.random().toString(36).substring(2, 9)}`,
);
const isRequired = computed(
  () => attrs.required !== undefined && attrs.required !== false,
);

const errorMessage = ref("");
let timeout: ReturnType<typeof setTimeout> | null = null;
let stampValue = "";

// Dynamic Regex theo decimalPlaces
const regex = computed(
  () => new RegExp(`^[0-9]*\\.?[0-9]{0,${props.decimalPlaces}}$`),
);

// Synchronize Value với parent component
const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// 3. Input Handlers
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val = target.value;

  if (props.isNumber) {
    // Chỉ giữ lại số và dấu chấm
    val = val.replace(/[^0-9.]/g, "");

    // Xử lý số 0 ở đầu (ví dụ: "05" -> "5", trừ "0.x")
    if (val.length > 1 && val.startsWith("0") && !val.startsWith("0.")) {
      val = val.replace(/^0+/, "");
    }

    // Xử lý số lượng chữ số thập phân
    if (regex.value.test(val)) {
      stampValue = val;
    } else {
      val = stampValue;
    }

    // Tự động thêm '0' nếu bắt đầu bằng dấu chấm
    if (val.startsWith(".")) {
      val = "0" + val;
    }

    // Kiểm tra min/max
    const numericValue = parseFloat(val);
    if (!isNaN(numericValue)) {
      if (props.minValue !== undefined && numericValue < props.minValue) {
        val = props.minValue.toString();
      } else if (
        props.maxValue !== undefined &&
        numericValue > props.maxValue
      ) {
        val = props.maxValue.toString();
      }
    }

    inputValue.value = val;
  } else {
    // Debounce ngắn cho text thông thường
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      inputValue.value = val;
    }, 50);
  }

  validateInput(val);
};

const onBlur = (event: FocusEvent) => {
  validateInput(inputValue.value.toString());
  emit("blur", event);
};

const onFocus = (event: FocusEvent) => {
  emit("focus", event);
};

// Validation logic
const validateInput = (val: string) => {
  if (isRequired.value && (!val || val.trim() === "")) {
    errorMessage.value = "Trường này là bắt buộc";
  } else {
    errorMessage.value = "";
  }
};

// 4. Lifecycle Hooks & Store Integration
onMounted(() => {
  const id = inputId.value;
  if (isRequired.value && id) {
    store.setRequired(id);
  }
  store.checkRequired();
});

onBeforeUnmount(() => {
  const id = inputId.value;
  if (isRequired.value && id) {
    store.removeRequired(id);
  }
  if (timeout) clearTimeout(timeout);
});

onUpdated(() => {
  store.checkRequired();
});
</script>

<style scoped>
.input-field-container {
  width: 100%;
}

.custom-input {
  width: 100%;
  height: 42px; /* Chiều cao chuẩn */
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #1e293b; /* slate-800 */
  background-color: #ffffff;
  border: 1px solid #cbd5e1; /* slate-300 */
  border-radius: 4px; /* Bo góc 4px */
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.custom-input:focus {
  border-color: #f97316; /* Màu cam focus */
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
}

.custom-input::placeholder {
  color: #94a3b8; /* slate-400 */
}

/* Trạng thái Lỗi */
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