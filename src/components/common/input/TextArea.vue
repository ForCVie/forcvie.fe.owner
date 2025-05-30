<template>
  <textarea
      v-bind="attrs"
      :value="props.modelValue"
      @input="onInput"
      rows="5"
      class="custom-input"
      @focus="checkError"
      @keyup="checkError"
  />
</template>

<script setup lang="ts">
import {defineProps, defineEmits, onMounted, onBeforeUnmount, onUpdated, useAttrs} from 'vue'
import {commonStore} from '@/stores/common'

const attrs = useAttrs()
const props = defineProps(['modelValue', 'resizeAuto'])
const emit = defineEmits(['update:modelValue'])

const store = commonStore()
let timeout: NodeJS.Timeout | null = null

onMounted(() => {
  if (props.resizeAuto && attrs.id) {
    const textArea = document.getElementById(attrs.id as string) as HTMLTextAreaElement;

    const computedStyle = window.getComputedStyle(textArea);
    const paddingNode = {
      top: parseFloat(computedStyle.paddingTop),
      right: parseFloat(computedStyle.paddingRight),
      bottom: parseFloat(computedStyle.paddingBottom),
      left: parseFloat(computedStyle.paddingLeft),
    };
    const borderNode = {
      top: parseFloat(computedStyle.borderTopWidth),
      right: parseFloat(computedStyle.borderRightWidth),
      bottom: parseFloat(computedStyle.borderBottomWidth),
      left: parseFloat(computedStyle.borderLeftWidth),
    };

    const nodeReality = textArea.getBoundingClientRect().height
        - paddingNode.top
        - paddingNode.bottom
        - borderNode.top
        - borderNode.bottom;

    const heightRow = nodeReality / textArea.rows;

    const parentNode = textArea.parentElement as HTMLElement;
    if (!parentNode) {
      console.error('Parent node not found.');
      return;
    }

    const computedStyleParentNode = window.getComputedStyle(parentNode);
    const paddingParentNode = {
      top: parseFloat(computedStyleParentNode.paddingTop),
      right: parseFloat(computedStyleParentNode.paddingRight),
      bottom: parseFloat(computedStyleParentNode.paddingBottom),
      left: parseFloat(computedStyleParentNode.paddingLeft),
    };
    const borderParentNode = {
      top: parseFloat(computedStyleParentNode.borderTopWidth),
      right: parseFloat(computedStyleParentNode.borderRightWidth),
      bottom: parseFloat(computedStyleParentNode.borderBottomWidth),
      left: parseFloat(computedStyleParentNode.borderLeftWidth),
    };

    const parentNodeReality = parentNode.getBoundingClientRect().height
        - paddingParentNode.top
        - paddingParentNode.bottom
        - borderParentNode.top
        - borderParentNode.bottom;

    if (heightRow > 0) {
      textArea.rows = Math.floor(parentNodeReality / heightRow) - 2;
    } else {
      console.error('Invalid height per row.');
    }
  }
});

const onInput = (event) => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }

  timeout = setTimeout(() => {
    emit('update:modelValue', event.target.value)
  }, 50)
}

onMounted(() => {
  if (attrs.id && attrs.required !== undefined) {
    store.setRequired(attrs.id)
    store.checkRequired()
  }
})

onBeforeUnmount(() => {
  if (attrs.id && attrs.required !== undefined) {
    store.removeRequired(attrs.id)
  }
  clearTimeout(timeout)
})

onUpdated(() => {
  store.checkRequired()
})

const checkError = () => {
  if (attrs.id && attrs.required !== undefined) {
    const input = document.getElementById(attrs.id)
    if (input && !input.value) {
      input.classList.add('error_validate')
    } else if (input) {
      input.classList.remove('error_validate')
    }
  }
}
</script>

<style scoped>
</style>
