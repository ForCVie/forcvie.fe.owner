<template>
  <label class="switch" :style="{ width: width + 'px', height: height + 'px' }">
    <input 
      type="checkbox" 
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)" 
    />
    <span 
      class="slider" 
      :style="{ borderRadius: height + 'px', backgroundColor: modelValue ? activeColor : inactiveColor }"
    >
      <span 
        class="thumb"
        :style="{
          width: thumbSize + 'px',
          height: thumbSize + 'px',
          transform: modelValue ? `translateX(${translateX}px)` : 'translateX(0)'
        }"
      ></span>
    </span>
  </label>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  size: { type: [String, Number], default: "medium" },
  activeColor: { type: String, default: "var(--primary)" },
  inactiveColor: { type: String, default: "#ccc" }
})

defineEmits(['update:modelValue'])

const width = computed(() => {
  if (props.size === "small") return 40
  if (props.size === "large") return 60
  if (props.size === "medium") return 50
  if (typeof props.size === "number") return props.size
  return 50
})

const height = computed(() => {
  if (props.size === "small") return 20
  if (props.size === "large") return 30
  if (props.size === "medium") return 24
  if (typeof props.size === "number") return Math.round(props.size / 2.5)
  return 24
})

const thumbSize = computed(() => height.value - 4) // nút tròn
const translateX = computed(() => width.value - height.value) // hành trình trượt
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  padding: 2px;
  box-sizing: border-box;
}

.thumb {
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
}
</style>
