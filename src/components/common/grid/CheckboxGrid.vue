<template>
  <input
      v-if="params.type === 'selectAll'"
      style="width: 18px !important"
      type="checkbox"
      @change="addEvent"
      :id="selectAllGridId"
      :name="selectAllGridId"
  />
  <input
      v-if="params.type === 'selectChild'"
      style="width: 18px !important"
      type="checkbox"
      v-model="value"
      @change="addEvent"
      :name="childName"
  />
  <input
      v-if="params.type === 'selectChildCheckShow' && params.data.checkedShow"
      style="width: 18px !important"
      type="checkbox"
      v-model="value"
      @change="addEvent"
      :name="childName"
  />
  <input
      v-if="params.type === 'disabledChildCheckShow'"
      style="width: 18px !important"
      type="checkbox"
      v-model="value"
      @change="addEvent"
      :disabled="params.data.disabledCheckbox"
      :name="childName"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    params: {},
  },
  data() {
    return {
      value:false,
      selectAllGridId: '',
      childName: '',
      childSet: ''
    }
  },
  mounted() {
    this.value = this.params.value
    this.selectAllGridId = this.params.selectAllGridId
    this.childName = this.params.childName
  },
  watch(){
    this.value = this.params.value
  },
  methods: {
    addEvent() {
      if(this.params.type === 'selectAll'){
        if (typeof this.params.onCustomEvent === 'function') {
          const checkAll = document.querySelectorAll(`input[type="checkbox"][name="${this.selectAllGridId}"]`)
          this.params.onCustomEvent(checkAll[0].checked,this.params.data)
          const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${this.childName}"]`)
          checkboxes.forEach((checkbox) => {
            checkbox.checked  = checkAll[0].checked;
      })
          
        }
      } else {
        if (typeof this.params.onCustomEvent === 'function') {
          this.params.onCustomEvent(this.value,this.params.data)
          this.checkRowSelected(this.value)
        }
      }
    },
    checkRowSelected(value) {
      const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${this.childName}"]`)
      let count = 0
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          count++
        }
      })
      const checkAll = document.querySelectorAll(`input[type="checkbox"][name="${this.selectAllGridId}"]`)
      if (!value) {
          checkAll[0].checked = false
      } else {
        if (count == checkboxes.length) {
          checkAll[0].checked = true
        } else {
          checkAll[0].checked = false
        }
      }
    }
  }
})
</script>
