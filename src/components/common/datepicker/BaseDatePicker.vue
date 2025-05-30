<template>
  <div class="datepicker_container" ref="datepickerContainer">
    <input
        v-bind="attrs"
        :value="value ? format(value, 'yyyy-MM-dd') : ''"
        readonly
        class="datepick"
        @click.stop.prevent="handleSelectDate"
        ref="datepickerInput"
    />
    <teleport to="#app" v-if="stateDatePicker">
      <div v-if="stateDatePicker" class="datepicker-wrapper" :class="datepickerClass" ref="datepicker">
        <v-locale-provider locale="ko">
          <v-date-picker
              v-model="picker"
              @update:modelValue="handleDateSelect"
              :view-mode="'month'"
              color="info"
              title="Select day"
              show-adjacent-months

          ></v-date-picker>
        </v-locale-provider>
      </div>
    </teleport>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  nextTick,
  useAttrs,
  onMounted,
  onBeforeUnmount,
  onUpdated,
} from 'vue';
import {format} from 'date-fns';
import {commonStore} from "@/stores/common";

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String,Date,null],
      required: true
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const store = commonStore()
    const picker = ref<Date | null>(null);
    const stateDatePicker = ref(false);
    const currentViewMode = ref('month');
    const datepickerClass = ref('bottom-left');
    const datepickerInput = ref(null)
    const datepicker = ref(null)
    const datepickerContainer = ref(null);
    const value = ref()
    const attrs = useAttrs()

    onBeforeMount(() => {
      picker.value = props.modelValue ? new Date(props.modelValue) : new Date();
      value.value = props.modelValue ? format(props.modelValue, 'yyyy-MM-dd') : props.modelValue;
    });

    onMounted(() => {
      if (attrs.id && props.isRequired !== undefined) {
        store.setRequired(attrs.id)
        store.checkRequired()
      }
    })

    onBeforeUnmount(() => {
      if (attrs.id && props.isRequired !== undefined) {
        store.removeRequired(attrs.id)
      }
    })

    onUpdated(() => {
      value.value = props.modelValue ? format(props.modelValue, 'yyyy-MM-dd') : props.modelValue;
      checkError();
      store.checkRequired()
    })

    const handleClickOutside = (event) => {
      const targetElement = event.target;
      if (
          datepickerContainer.value &&
          !datepickerContainer.value.contains(targetElement) &&
          !(targetElement instanceof HTMLElement && targetElement.closest('.datepicker-wrapper'))
      ) {
        stateDatePicker.value = false;
        document.removeEventListener('mousedown', handleClickOutside);
      }
      checkError();
    };

    const handleSelectDate = async () => {
      stateDatePicker.value = !stateDatePicker.value;
      if (stateDatePicker.value) {
        await nextTick();
        document.addEventListener('mousedown', handleClickOutside);
        positionDatePicker();
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

    };

    const checkError = () => {
      if (attrs.id && props.isRequired) {
        const input = document.getElementById(attrs.id)
        if (input && !input.value) {
          input.classList.add('error_validate')
        } else
          input?.classList.remove('error_validate')

      }
    }
    const handleDateSelect = (date: Date) => {
      picker.value = date;
      value.value = date;
      emit('update:modelValue', format(date, 'yyyy-MM-dd'));
      stateDatePicker.value = false;
      document.removeEventListener('mousedown', handleClickOutside);

    };

    const positionDatePicker = () => {
      const inputRect = datepickerInput.value.getBoundingClientRect();
      const documentHeight = window.innerHeight;
      const documentWidth = window.innerWidth;

      const inputTop = inputRect.top + scrollY;
      const inputBottom = inputRect.bottom + scrollY;
      const inputLeft = inputRect.left + scrollX;
      const inputRight = inputRect.right + scrollX;

      datepicker.value.style.top = `${inputTop + 40}px`;
      if (inputRect.right > documentWidth * (2 / 3)) {
        datepicker.value.style.right = `${documentWidth - inputRight}px`;
        datepicker.value.style.left = 'auto';
      } else {
        datepicker.value.style.left = `${inputLeft}px`;
        datepicker.value.style.right = 'auto';
      }

      if (inputRect.bottom > documentHeight * (1 / 2)) {
        datepicker.value.style.top = `${inputTop - 295}px`;
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
      datepicker,
      datepickerContainer,
      value,
      attrs,
      checkError
    };
  }
});
</script>

<style lang="scss">
.overlay_popup_datepicker {
  pointer-events: auto;
  background: rgb(var(--v-theme-on-surface));
  border-radius: inherit;
  bottom: 0;
  left: 0;
  opacity: var(--v-overlay-opacity, 0.32);
  position: fixed;
  right: 0;
  top: 0;
}


</style>
