<template>
  <p class="check_row" :class="isRemoveCheckBox ? 'flex items-center': '' ">
    <input :id="id" v-model="computedValue" type="checkbox" :name="name" :indeterminate="indeterminate" :disabled="isDisable"
      :true-value="trueValue" :false-value="falseValue" :value="value" :checked="checked" @change="handleChange" :class="className" />
    <label :for="id">{{ label }}
    </label>
  </p>
</template>

<script lang="ts">
import { computed } from "vue";
import { MODE_SHOW } from '@/constants/screen.const';
import { MODE_HIDDEN } from '@/constants/screen.const';
import { MODE_DETAIL } from '@/constants/screen.const';
export default {

  props: {
    isRemoveCheckBox:Boolean,
    modelValue: [
      Boolean,
      String,
      Number,
      Array as () => Array<string | number>,
    ],
    value: [String, Number, Array as () => Array<string>],
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    checked: Boolean,
    id: String,
    name: String,
    round: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    mode: {
      type: String,
      default: ''
    },
    className: String,
    label: String,
    isDisable: {
      type: Boolean,
      default: false
    },
    flagCheckAll: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "change"],
  setup: (props, {emit}) => {
    const computedValue = computed({
      get(): boolean | string | number | (string | number)[] | undefined {
        return props.modelValue;
      },
      set(value: boolean | string | number | (string | number)[] | undefined) {
        emit("update:modelValue", value);
      },
    });
    const handleChange = (event: Event) => {
      emit("change", event);
    };
    const modeShow = MODE_SHOW;
    const modeHidden = MODE_HIDDEN;
    const modeDetail = MODE_DETAIL;
    return {computedValue, modeShow, modeHidden, modeDetail, handleChange};
  }
}

;
</script>

<style scoped>

</style>

