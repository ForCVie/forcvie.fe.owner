<template>
  <div class="datepicker_container">
    <input
      :value="format(picker, 'yyyy-MM-dd')" readonly
      class="datepick" @click.stop.prevent="handleSelectDate" ref="datepickerInput"/>
    <div class="datepicker_container">
      <div class="datepicker-wrapper" :class="datepickerClass" v-if="stateDatePicker" ref="datepicker">
        <v-locale-provider locale="ko">
          <v-date-picker
            v-model="picker"
            @update:modelValue="handleDateSelect"
            :view-mode="currentViewMode"
            color="primary"
            border
            title="Select day"
            show-adjacent-months
          ></v-date-picker>
        </v-locale-provider>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount, nextTick } from 'vue';
import { format } from 'date-fns';
import { randomUUID } from 'crypto';

export default defineComponent({
  props: {
    modelValue: {
      type: Date,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const picker = ref();
    const stateDatePicker = ref(false);
    const currentViewMode = ref('month');
    const datepickerClass = ref('bottom-left');
    const datepickerInput = ref(null)
    const datepicker = ref(null)

    onBeforeMount(() => {
      picker.value = props.modelValue;
    });

    const handleSelectDate = async () => {
      stateDatePicker.value = !stateDatePicker.value;
      if (stateDatePicker.value) {
        await nextTick();
        positionDatePicker();
        document.addEventListener('click', handleClickOutside);
      }
    }

    const handleClickOutside = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (datepicker.value && datepicker.value.contains(event.target)) {
        return;
      }
      stateDatePicker.value = false;
      document.removeEventListener('click', handleClickOutside);
    };

    const handleDateSelect = (date: Date) => {
      picker.value = date;
      emit('update:modelValue', date);
      stateDatePicker.value = false;
    };

    const positionDatePicker = () => {
      const inputRect = datepickerInput.value.getBoundingClientRect();
      const datePicker = datepicker.value;
      const windowWidth = window.innerWidth;

      if(windowWidth < 690){
        return
      }
      if (inputRect.right + datePicker.offsetWidth > windowWidth) {
        datepickerClass.value = 'bottom-right';
      } else {
        datepickerClass.value = 'bottom-left';
      }
    };

    return {
      picker,
      stateDatePicker,
      format,
      handleSelectDate,
      handleDateSelect,
      currentViewMode,
      datepickerClass,
      datepickerInput,
      datepicker
    };
  }
});
</script>

<style>
</style>
