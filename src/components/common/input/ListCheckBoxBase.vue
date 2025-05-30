<template>
  <div :class="class">
    <CheckboxBase v-if="hasCheckAll" v-model="checkBoxDataAll" :value="modelValue" :label="'전체'" :id="id"
                  :name="name" @change="checkAll" :is-disable="isDisable"></CheckboxBase>
    <CheckboxBase v-for="option in listData" :key="option.cdId" v-model="checkBoxData" :value="option.cdId"
                  :label="option.cdNm" :id="`${option.cdId}_${id}`" :name="option.id" @change="changOne" :is-disable="isDisable"
                  >
    </CheckboxBase>
    <input hidden :id="requireId" :value="modelValue">
  </div>
</template>
<script lang="ts">
import {ref} from 'vue';
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";
import { commonStore } from '@/stores/common';
import { CodeMngModel } from '@/stores/common/codeMng/codeMng.type';

export default {
  components: {CheckboxBase},
  props: {
    modelValue: [String, Number],
    className: String,
    mode: {
      type: String,
      default: 'show'
    },
    id: {
      type:String,
      default:"check_box"
    },
    name: String,
    listData: Array as () => Array<CodeMngModel>,
    isDisable: {
      type: Boolean,
      default: false
    },
    hasCheckAll: {
      type: Boolean,
      default: false
    },
    class: {
      type: String
    },
    useArray: {
      type: Boolean,
      default: false
    },requireId: String,
    isRequire : {
      type: Boolean,
      default : false
    }
  },
  component: {
    CheckboxBase,
  },
  setup(props) {
    const checkBoxData = ref([]);
    const checkBoxDataAll = ref(false);

    const store = commonStore()

    return {
      checkBoxData,
      checkBoxDataAll,
      store
    };
  },
  methods: {
    checkAll() {
      if (this.checkBoxData.length < this.listData.length) {
        this.checkBoxData = [];
        this.listData?.forEach((element, index) => {
          this.checkBoxData.push(element.cdId);
        })
      } else {
        this.checkBoxData = [];
      }
      if(this.useArray) {
        this.$emit('update:modelValue', this.checkBoxData)
      } else {
        this.$emit('update:modelValue', this.checkBoxData.join(','))
      }
    },
    changOne() {
      if (this.checkBoxData.length < this.listData.length) {
        this.checkBoxDataAll = false;
      } else {
        this.checkBoxDataAll = true;
      }
      if(this.useArray) {
        this.$emit('update:modelValue', this.checkBoxData)
      } else {
        this.$emit('update:modelValue', this.checkBoxData.join(','))
      }
    } 
  }, 
  mounted() {
    if (this.modelValue) {
      this.checkBoxData = [];
      if(this.useArray) {
        this.checkBoxData = this.modelValue
      } else {
      this.checkBoxData = this.modelValue.split(',');
      }
      console.log(this.useArray);
      
      if (this.checkBoxData.length == this.listData?.length) {
        this.checkBoxDataAll = true;
      }
    }
    
    if(this.requireId && this.isRequire) {
      this.store.setRequired(this.requireId)
      this.store.checkRequired();
    }
  },
  updated() {
    this.store.checkRequired()
  }
};
</script>

  