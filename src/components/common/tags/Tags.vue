<template>
  <span
    class="tag"
    :style="{ backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}` }"
  >
    {{ label }}
    <button v-if="closable" class="close-btn" @click="removeTag">×</button>
  </span>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  label: String,
  color: String,
  closable: { type: Boolean, default: true }
});
const emit = defineEmits(['remove']);

// Map preset màu sang mã hex
const presetColors = {
  magenta: '#eb2f96',
  red: '#f5222d',
  volcano: '#fa541c',
  orange: '#fa8c16',
  gold: '#faad14',
  lime: '#a0d911',
  green: '#52c41a',
  cyan: '#13c2c2',
  blue: '#1890ff',
  geekblue: '#2f54eb',
  purple: '#722ed1'
};

const bgColor = computed(() => {
  if (!props.color) return '#f0f0f0';
  if (props.color.startsWith('#')) return props.color;
  return presetColors[props.color] || '#f0f0f0';
});
const textColor = computed(() => {
  // Màu chữ đậm hơn nếu nền sáng
  return ['gold', 'lime', 'orange', 'volcano', 'magenta', 'yellow'].includes(props.color)
    ? '#333'
    : '#fff';
});
const borderColor = computed(() => {
  return bgColor.value;
});

function removeTag() {
  emit('remove');
}
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 3px;
  padding: 0 10px;
  margin: 4px;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  transition: all 0.2s;
}
.close-btn {
  background: none;
  border: none;
  margin-left: 4px;
  font-size: 16px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  padding: 0;
}
.close-btn:hover {
  opacity: 1;
}
</style>
