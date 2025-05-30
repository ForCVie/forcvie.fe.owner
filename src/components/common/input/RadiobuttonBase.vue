<template>
  <p class="radio_row radio_base">
    <input :id="id" v-model="computedValue" type="radio" :name="name" @change="handleChange"
      :indeterminate="indeterminate" :true-value="trueValue" :false-value="falseValue" :value="value" :checked="checked"
      v-if="(mode == modeShow || mode == '') && !isDisable" :class="className" />
    <input  :id="id" v-model="computedValue" type="radio" :name="name"
      :indeterminate="indeterminate" :true-value="trueValue" :false-value="falseValue" :value="value" :checked="checked"
      v-if="mode == modeHidden" :class="className" hidden />
    <input :id="id" v-model="computedValue" type="radio" :name="name"
      :indeterminate="indeterminate" :true-value="trueValue" :false-value="falseValue" :value="value" :checked="checked"
      v-if="isDisable" :class="className" disabled />
    <label :for="id">{{ label }}
    </label>
  </p>
</template>

<script lang="ts">
import { computed } from "vue";
import { MODE_SHOW } from '../../../constants/screen.const';
import { MODE_HIDDEN } from '../../../constants/screen.const';
import { MODE_DETAIL } from '../../../constants/screen.const';
export default {

  props: {
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
    isDisable: Boolean
  },
  emits: ["update:modelValue","change"],
  setup: (props, { emit }) => {
    const computedValue = computed({
      get(): boolean | string | number | (string | number)[] | undefined {
        return props.modelValue;
      },
      set(value: boolean | string | number | (string | number)[] | undefined) {
        emit("update:modelValue", value);
      },
    });
    const modeShow = MODE_SHOW;
    const modeHidden = MODE_HIDDEN;
    const modeDetail = MODE_DETAIL;
    // Function to handle radio button change
    const handleChange = (event: Event) => {
      emit("change", event);
    };
    return { computedValue, modeShow, modeHidden, modeDetail, handleChange };
  },
};
</script>

<style scoped>
.radio_base {
  width: auto !important;
}
</style>
