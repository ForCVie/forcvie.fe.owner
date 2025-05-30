<template>
  <span class="is_disabled" v-if="isDisable">{{ showValue }}</span>
  <div v-else class="group_checkbox">
    <input @click="toggleDropdown" :value="showValue" readonly class="select_component_custom" ref="checkboxInput">
    <teleport to="#app" v-if="showList">
      <ul
          class="list_select_custom"
          :class="{on:showList}"
          :style="{ width: `${widthUl}px`,top:`${topUl}px`,left:`${leftUl}px`,right:'auto'}"
          ref="ulPosition"
      >
        <li @click.prevent="toggleCheckAll">
          <CheckboxBase v-model="checkBoxDataAll" :value="checkAll" :label="labelAll" :id="checkAll"
                        :name="checkAll" @change.stop.prevent="checkAll"></CheckboxBase>
        </li>
        <li v-for="option in filteredOptions" :key="option.cdId" @click.prevent="toggleCheck(option)">
          <CheckboxBase v-model="checkBoxData" :value="option.cdId" :label="option.cdNm" :id="option.cdId"
                        :name="option.id" @change.stop.prevent="changOne"></CheckboxBase>
        </li>
      </ul>
    </teleport>
  </div>
</template>

<script lang="ts">
import {ref, computed, onBeforeUnmount, onMounted} from 'vue';
import CodeMngModel from '../../../model/common/CodeMngModel'
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";

export default {
  components: {CheckboxBase},

  props: {
    modelValue: [String, Number],
    className: String,
    mode: {
      type: String,
      default: ''
    },
    id: String,
    name: String,
    valueDefault: {
      type: String,
      default: ''
    },
    nameDefault: {
      type: String,
      default: ''
    },
    data: Array as () => Array<CodeMngModel>,
    isDisable: {
      type: Boolean,
      default: false
    },
    valueSelect: String,
    isShowCheckAll:{
      type:Boolean,
      default: false
    }
  }
  , component: {
    CheckboxBase,
  },
  beforeMount() {
    this.showValue = this.valueSelect ? this.valueSelect : '';
  }
  ,
  setup(props) {
    const checkBoxData = ref([]);
    const checkBoxDataAll = ref(false);
    const searchQuery = ref('');
    const showDropdown = ref(false);
    const showValue = ref('');
    const showList = ref(false)
    const checkboxInput = ref<HTMLInputElement | null>(null)
    const ulPosition = ref<HTMLUListElement | null>(null)
    const widthUl = ref<number>(0)
    const topUl = ref<number>(0)
    const leftUl = ref<number>(0)
    const labelAll = ref('전체')

    const filteredOptions = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return props.data.filter(option =>
          option.cdNm.toLowerCase().includes(query)
      );
    });

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
      showList.value = true
      positionSelectbox()
      document.addEventListener('mousedown', handleClickOutside)
    };

    watch(() => props.modelValue, (newValue, oldValue) => {
      if (!props.modelValue) {
        checkBoxData.value = [];
        showValue.value = '';
        checkBoxDataAll.value = false
      }
    })

    onBeforeUnmount(()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    })

    const handleClickOutside = (event: MouseEvent) => {
      const ul = ulPosition.value
      const input = checkboxInput.value
      if (ul && !ul.contains(event.target as Node) && input && !input.contains(event.target as Node)) {
        showList.value = false
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }

    const positionSelectbox = () => {
      if (checkboxInput.value) {
        const inputRect = checkboxInput.value.getBoundingClientRect()
        widthUl.value = inputRect.width
        const inputTop = inputRect.top + window.scrollY
        const inputLeft = inputRect.left + window.scrollX
        topUl.value = inputTop + 40
        leftUl.value = inputLeft
      }
    }
    return {
      searchQuery,
      showDropdown,
      filteredOptions,
      toggleDropdown,
      checkBoxData,
      checkBoxDataAll,
      showValue,
      showList,
      checkboxInput,
      ulPosition,
      widthUl,
      labelAll,
      topUl,
      leftUl
    };
  }, data() {
    return {
      selectedOption: '',

    }

  },
  mounted() {
    if (this.data?.length && this.modelValue !== undefined) {
      const option = this.data.find(item => item?.cdId == this.modelValue)
      this.showValue = option?.cdNm || ""
      if(option?.cdId) this.toggleCheck(option)
      if(this.isShowCheckAll) this.toggleCheckAll()
    }
  },
  methods: {
    selectOption(option: any) {
      this.selectedOption = option.cdId;
      this.showValue = option.cdNm;
      // this.showDropdown = false;
      this.$emit('update:modelValue', this.selectedOption);
    },
    checkAll() {
      if (this.checkBoxData.length < this.filteredOptions.length) {
        this.checkBoxData = [];
        this.showValue = '';
        this.filteredOptions.forEach((element, index) => {
          this.checkBoxData.push(element.cdId);
          if (index < this.filteredOptions.length - 1) {

            this.showValue += element.cdNm + ', ';
          } else {
            this.showValue += element.cdNm
          }
        })

      } else {
        this.checkBoxData = [];
        this.showValue = '';
      }
      this.$emit('update:modelValue', this.checkBoxData)
    },
    changOne() {
      if (this.checkBoxData.length < this.filteredOptions.length) {
        this.checkBoxDataAll = false;
      } else {
        this.checkBoxDataAll = true;
      }
      this.$emit('update:modelValue', this.checkBoxData)
      let newValue = '';
      this.filteredOptions.forEach(element => {
        this.checkBoxData.forEach(item => {
          if (element.cdId == item) {
            if (!newValue) {
              newValue += element.cdNm;
            } else {
              newValue += ',' + element.cdNm
            }
          }
        })
      });
      this.showValue = newValue;
    },

    toggleCheck(option) {
      const index = this.checkBoxData.indexOf(option.cdId);
      if (index > -1) {
        this.checkBoxData.splice(index, 1);
      } else {
        this.checkBoxData.push(option.cdId);
      }
      this.changOne();
      this.showList = false
    },
    toggleCheckAll() {
      this.checkBoxDataAll = !this.checkBoxDataAll;
      this.checkAll()
      this.showList = false
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
