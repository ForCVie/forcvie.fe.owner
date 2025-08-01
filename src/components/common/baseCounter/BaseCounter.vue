<template>
  <div class="base-counter">
    <button
      type="button"
      class="btn_icon icon_only minus"
      @click="decrease"
      :disabled="value <= min"
    >
      감소
    </button>
    <span class="mg_l10 mg_r10">{{ value }}</span>
    <button
      type="button"
      class="btn_icon icon_only plus"
      @click="increase"
      :disabled="max ? value >= max : false"
    >
      증가
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed(() => props.modelValue);

const increase = () => {
  if (props.max === undefined || value.value < props.max) {
    emit('update:modelValue', value.value + 1)
  }
}

const decrease = () => {
  if (props.min === undefined || value.value > props.min) {
    emit('update:modelValue', value.value - 1)
  }
}
</script>

<style scoped>
.base-counter {
  display: flex;
  align-items: center;
}
</style>
