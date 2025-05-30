<template>
  <span class="is_disabled" v-if="isDisable">{{name}}</span>
  <div v-else class="group_checkbox">
    <input
        class="select_component_custom"
        v-bind="attrs"
        :value="name"
        @click="focus"
        readonly
        ref="checkboxInput"
    />
    <input
      :id="`${attrs.id}_check`"
      :value="dataCheck"
      @click="focus"
      readonly
      hidden
    />
    <teleport to="#app" v-if="showList">
      <ul
          class="list_select_custom"
          :class="{on:showList}"
          :style="{ width: `${widthUl}px`,top:`${topUl}px`,left:`${leftUl}px`,right:'auto'}"
          ref="ulPosition"
      >
        <li
            v-for="item in data"
            :key="item.cdId"
            @click="updateValue(item.cdId, item.cdNm)">
          {{ item.cdNm }}
        </li>
        <li v-if="data.length === 0" class="disabled" @click="hideList">
          No Result
        </li>
      </ul>
    </teleport>
  </div>
</template>

<script lang="ts">
import {commonStore} from '@/stores/common'
import { CodeMngModel } from '@/stores/common/codeMng/codeMng.type';
import {ref, onMounted, onBeforeUnmount, nextTick, useAttrs, onUpdated} from "vue";

export default {
  props: {
    modelValue: [String, Number],
    data: Array as () => Array<CodeMngModel>,
    isDisable: {
      type: Boolean,
      default: false
    },
  },
  emits: [
    'update:modelValue',
    'focusout',
    'change'
  ],
  inheritAttrs: false,
  setup(props, {emit}) {
    const attrs = useAttrs()

    const store = commonStore()
    const name = ref('');
    const dataCheck = ref('');
    const showList = ref(false)
    const checkboxInput = ref<HTMLInputElement | null>(null)
    const ulPosition = ref<HTMLUListElement | null>(null)
    const widthUl = ref<number>(0)
    const topUl = ref<number>(0)
    const leftUl = ref<number>(0)
    const disabled = ref(false)

    const focusout = () => {
      emit('focusout')
      showList.value = false
    }

    const updateValue = async (cdId: any, cdNm: string) => {
      emit('update:modelValue', cdId)
      name.value = cdNm
      dataCheck.value = cdId;
      showList.value = false
      const input = document.getElementById(attrs.id)
      if (cdNm) {
        input.classList.remove('error_validate')
      }
      emit("change",cdId)
    }

    const focus = async () => {
      await checkError()
      await positionSelectbox()
      showList.value = true
      document.addEventListener('mousedown', handleClickOutside)
    }

    const handleClickOutside = (event: MouseEvent) => {
      const ul = ulPosition.value
      const input = checkboxInput.value
      if (ul && !ul.contains(event.target as Node) && input && !input.contains(event.target as Node)) {
        showList.value = false
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }

    onMounted(() => {
      if (attrs.id && attrs.required !== undefined) {
        store.setRequired(`${attrs.id}_check`)
        store.checkRequired()
      }

      if (props.data?.length && props.modelValue !== undefined) {
        name.value = props.data.find(item => item.cdId == props.modelValue)?.cdNm
        dataCheck.value = props.modelValue + '';
      }
    })

    onUpdated(()=>{
      if (props.data?.length && props.modelValue !== undefined) {
        name.value = props.data.find(item => item.cdId == props.modelValue)?.cdNm
        dataCheck.value = props.modelValue + '';
      }
      
      store.checkRequired()
    })

    onBeforeUnmount(() => {
      if (attrs.id && attrs.required !== undefined) {
        store.removeRequired(attrs.id)
      }
      document.removeEventListener('mousedown', handleClickOutside)
    })

    const checkError = async () => {
      if (attrs.id && attrs.required !== undefined) {
        const input = document.getElementById(attrs.id)
        if (input && !input.value) {
          input.classList.add('error_validate')
        } else if (input) {
          input.classList.remove('error_validate')
        }
      }
    }

    const positionSelectbox = async () => {
      if (checkboxInput.value) {
        const inputRect = checkboxInput.value.getBoundingClientRect()
        widthUl.value = inputRect.width
        const inputTop = inputRect.top + window.scrollY
        const inputLeft = inputRect.left + window.scrollX
        topUl.value = inputTop + 40
        leftUl.value = inputLeft
      }
    }

    const hideList = () => {
      showList.value = false
    }
    return {
      attrs,
      updateValue,
      focusout,
      store,
      name,
      focus,
      showList,
      checkboxInput,
      widthUl,
      ulPosition,
      disabled,
      topUl,
      leftUl,
      hideList,
      dataCheck
    }
  }
}
</script>

<style scoped lang="scss">
/* Thêm style nếu cần */

</style>
