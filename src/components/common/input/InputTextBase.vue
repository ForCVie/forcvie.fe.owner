<template>
  <input :id="id" :name="name" v-if="(mode == modeShow || !mode) && !isDisable && !formatMoney" :class="classInput"
         :type="type" :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout"
         @change="change" @focus="focus" @keyup="keyup" :maxlength="maxlength">
  <input :id="id" :name="name" v-if="mode == modeHidden && !formatMoney" :class="classInput" :type="type"
         :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout" @change="change"
         hidden
         @focus="focus">
  <input :id="id" :name="name" v-if="mode == modeShow && isDisable && !formatMoney" :class="classInput" :type="type"
         :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout" @change="change"
         disabled @focus="focus">


  <input :id="id" :name="name" v-if="(mode == modeShow || !mode) && !isDisable && formatMoney" :class="classInput"
         :type="type" :placeholder="placeholder" v-model="showValue" @focusout="focusout" @change="change"
         @focus="focus"
         @keyup="keyup" :maxlength="maxlength" style="text-align: right !important ;">
  <input :id="id" :name="name" v-if="mode == modeHidden && formatMoney" :class="classInput" :type="type"
         style="text-align: right !important ;" :placeholder="placeholder" v-model="showValue" @focusout="focusout"
         @change="change" hidden @focus="focus">
  <input :id="id" :name="name" v-if="mode == modeShow && isDisable && formatMoney" :class="classInput" :type="type"
         style="text-align: right !important ;" :placeholder="placeholder" v-model="showValue" @focusout="focusout"
         @change="change" disabled @focus="focus">
    <label v-if="mode == modeDetail && !formatMoney" :class="className">{{ modelValue }}</label>
    <!-- <label name="errInput" v-if="isErrInput && isRequire && !formatMoney"
           style="color: #EE4B3C; top: 0; left: 0; position: relative">* 미입력 항목이 있습니다</label> -->
    <label v-if="mode == modeDetail && formatMoney" :class="className">{{ showValue }} 원</label>
    <!-- <label name="errInput" v-if="isErrInput && isRequire && formatMoney"
           style="color: #EE4B3C">* 미입력 항목이 있습니다</label> -->
</template>
<script lang="ts">
import { format } from 'date-fns'
import { MODE_SHOW } from '../../../constants/screen.const'
import { MODE_HIDDEN, TYPE_FORMAT_DATE } from '../../../constants/screen.const'
import { MODE_DETAIL } from '../../../constants/screen.const'
import { commonStore } from '../../../stores/common'
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: [String, Number, Date],
    placeholder: String,
    className: String,
    mode: String,
    id: String,
    name: String,
    isDisable: {
      type: Boolean,
      default: false
    },
    isRequire: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    type: String,
    formatMoney: {
      type: Boolean,
      default: false
    },
    maxlength: Number
  },
  emits: [
    'update:modelValue',
    'focusout',
    'change',
    'focus',
    'keyup'
  ],
  inheritAttrs: false,
  setup(props, { emit }) {
    const typeFormatDate = TYPE_FORMAT_DATE
    const isErrInput = ref<boolean>(false)
    const classInput = ref<string>(props.className)
    const store = commonStore()
    const updateValue = (event: any) => emit('update:modelValue', event.target.value)
    const focusout = (event: any) => {
      let value = event.target.value
      if (!value && props.isRequire && (props.mode == MODE_SHOW || props.mode == '')) {
        store.upDateListItemRequire({ id: props.id, required: false })
        isErrInput.value = true
        classInput.value = props.className + ' boder_err'
        store.checkItemRequired()
      } else {
        store.upDateListItemRequire({ id: props.id, required: true })
        isErrInput.value = false
        classInput.value = props.className
        store.checkItemRequired()
      }
      emit('focusout')
    }
    const keyup = (event: any) => {
      let value = event.target.value
      if (!value && props.isRequire && (props.mode == MODE_SHOW || props.mode == '')) {
        store.upDateListItemRequire({ id: props.id, required: false })
        isErrInput.value = true
        classInput.value = props.className + ' boder_err'
        store.checkItemRequired()
      } else {
        store.upDateListItemRequire({ id: props.id, required: true })
        isErrInput.value = false
        classInput.value = props.className
        store.checkItemRequired()
      }
      emit('keyup')
    }
    const change = (event: any) => {
      emit('change')
    }
    const focus = () => {
      emit('focus')
    }
    const modeShow = MODE_SHOW
    const modeHidden = MODE_HIDDEN
    const modeDetail = MODE_DETAIL
    //check requried
    watch(() => props.isCheck, (newValue, oldValue) => {
      if (!props.modelValue && props.isRequire && (props.mode == MODE_SHOW || props.mode == '')) {
        //store.setIsRequired(false)
        store.upDateListItemRequire({ id: props.id, required: false })
        isErrInput.value = true
        classInput.value = props.className + ' boder_err'
        store.checkItemRequired()
      } else {
        //store.setIsRequired(true)
        store.upDateListItemRequire({ id: props.id, required: true })
        isErrInput.value = false
        classInput.value = props.className
        store.checkItemRequired()
      }

    })
    watch(() => props.modelValue, (newValue, oldValue) => {
      if (!oldValue && !newValue) return
      if (!props.modelValue && props.isRequire && (props.mode == MODE_SHOW || props.mode == '')) {
        //store.setIsRequired(false)
        store.upDateListItemRequire({ id: props.id, required: false })
        isErrInput.value = true
        classInput.value = props.className + ' boder_err'
        store.checkItemRequired()
      } else {
        //store.setIsRequired(true)
        store.upDateListItemRequire({ id: props.id, required: true })
        isErrInput.value = false
        classInput.value = props.className
        store.checkItemRequired()
      }

    })
    return {
      updateValue,
      focusout,
      change, modeShow, modeHidden, modeDetail,
      focus,
      store,
      isErrInput,
      classInput,
      typeFormatDate,
      keyup
    }
  },
  beforeMount() {
    if (this.isRequire && !this.modelValue) {
      this.store.setIsRequired(false)
      this.store.setListItemRequire({ id: this.id, required: false })
    }
    if (this.isRequire && this.modelValue) {
      this.store.setIsRequired(false)
      this.store.setListItemRequire({ id: this.id, required: true })
    }
  },
  mounted() {
    if ((this.modelValue && this.modelValue == 0) || !this.modelValue) {
      this.showValue = ''
    } else {
      if (this.formatMoney && this.modelValue) {
        let money
        if (typeof this.modelValue == 'number') {
          money = this.modelValue.toString().replace(/\D/g, '')
        }
        if (typeof this.modelValue == 'string') {
          money = this.modelValue.replace(/\D/g, '')
        }
        money = money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.showValue = money
      }
    }
  },
  data() {
    return {
      showValue: ''
    }
  }
  ,
  methods: {
    formatMoneyValue() {
      if (this.$props.formatMoney) {
        let money = this.showValue.replace(/\D/g, '')
        money = money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.showValue = money
        this.$emit('update:modelValue', money.replace(/,/g, ''))
      }
    }
  },
  watch: {
    showValue: function() {
      this.formatMoneyValue()

    },
    modelValue: function() {
      if (this.formatMoney && this.modelValue) {
        let money
        if (typeof this.modelValue == 'number') {
          money = this.modelValue.toString().replace(/\D/g, '')
        }
        if (typeof this.modelValue == 'string') {
          money = this.modelValue.replace(/\D/g, '')
        }
        money = money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.showValue = money
      }
    }
  }
}
</script>
<style scoped>
.boder_err {
  border-color: #EE4B3C;
}

input.boder_err {
  position: relative;
}

input.boder_err + label {
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
}
</style>
