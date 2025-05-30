<template>
  <input
      type="text"
      v-bind="attrs"
      v-model="inputValue"
      @input="onInput"
      class="custom-input"
      @keyup="checkError"
      @focus="checkError">
</template>

<script setup lang="ts">
import {defineProps, defineEmits, onMounted, onBeforeUnmount, onUpdated, useAttrs} from 'vue'
import {commonStore} from '@/stores/common'

const attrs = useAttrs()
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  isNumber: {
    type: Boolean,
    default: false,
  },
  minValue: {
    type: Number,
  },
  maxValue: {
    type: Number,
  },
  decimalPlaces:{
    type: Number,
    default: 2,
  }
});
const emit = defineEmits(['update:modelValue'])

const store = commonStore()
let timeout: NodeJS.Timeout | null = null
const inputValue = ref(props.modelValue)
const regex = new RegExp(`^[0-9]*\\.?[0-9]{0,${props.decimalPlaces}}$`);

let stampValue = '';

const onInput = (event) => {
  if (props.isNumber) {
    const target = event.target as HTMLInputElement
    let value = target.value

    // Step 1: Remove all characters that are not digits or decimal points
    inputValue.value = value.replace(/[^0-9.]/g, '')

    // Step 2: Handle leading zeros if present
    if (inputValue.value.length > 1 && inputValue.value.startsWith('0') && !inputValue.value.startsWith('0.')) {
      inputValue.value = inputValue.value.replace(/^0+/, '');
    }

    // Step 3: Handle decimal points and multiple dots
    if(regex.test(inputValue.value)){
      stampValue = inputValue.value
    }
    inputValue.value = stampValue

    const hasMultipleDots = (inputValue.value.match(/[.]/g) || []).length > 1
    if (hasMultipleDots) {
      inputValue.value = inputValue.value.slice(0, value.length - 1)
    }

    // Step 4: Handle leading decimal points
    if (inputValue.value.startsWith('.')) {
      inputValue.value = '0' + inputValue.value
    }

    // Step 5: Check and handle numeric values
    const numericValue = parseFloat(inputValue.value);
    if (!isNaN(numericValue) && typeof props.minValue !== 'undefined' && typeof props.maxValue !== 'undefined') {
      if (numericValue < +props.minValue) {
        inputValue.value = props.minValue;
      } else if (numericValue > +props.maxValue) {
        inputValue.value = props.maxValue;
      }
    }

    emit('update:modelValue', inputValue.value)
  } else {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    timeout = setTimeout(() => {
      inputValue.value = event.target.value
      emit('update:modelValue', event.target.value)
    }, 50)
  }
}

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

onMounted(() => {
  if (attrs.id && attrs.required !== undefined) {
    store.setRequired(attrs.id)
    store.checkRequired();
  }
  store.checkRequired()
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
watch(() => props.modelValue,()=>{
  inputValue.value = props.modelValue
})
</script>

<style scoped>

</style>
