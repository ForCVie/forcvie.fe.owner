<template>
  <span class="is_disabled" v-if="isDisable">{{ searchQuery }}</span>
  <div v-else class="group_checkbox">
    <input :value="showValue" @click="focus" class="select_component_custom" :class="{on:showList}" ref="checkboxInput"
        readonly>
    <!-- <input v-model="searchQuery" @keyup="changData($event)" @click="focus" class="select_component_custom" ref="checkboxInput"> -->
    <teleport to="#app" v-if="showList">
      <ul
          class="list_select_custom"
          :class="{on:showList}"
          :style="{ width: `${widthUl}px`,top:`${topUl}px`,left:`${leftUl}px`,right:'auto'}"
          ref="ulPosition"
      >
        <li>
          <input v-model="searchQuery" @keyup="changData($event)" class="search_drop_down">
        </li>
        <li v-for="option in filteredOptions" :class="{'selected' : option.cdNm == showValue}" :key="option.cdId"
            @click="selectOption(option)">
          {{ option.cdNm }}
        </li>
        <li v-if="filteredOptions?.length === 0" class="disabled" @click="hideList">
          No Result
        </li>
      </ul>
    </teleport>
  </div>
</template>
<script lang="ts">
import { CodeMngModel } from '@/stores/common/codeMng/codeMng.type';
import {ref, computed, defineProps, defineEmits, onMounted, onUpdated, onBeforeUnmount, nextTick} from 'vue';

export default {
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
    valueSelectAll: {
      type: String,
      default: "전체"
    }
  },
  emits: [
    'update:modelValue',
    'focusout',
    'change'
  ],
  updated() {
    if (this.valueSelect && this.data?.length)
      this.showValue = this.data?.find(item => item.cdId == this.valueSelect)?.cdNm || "";
  },
  setup(props, {emit}) {
    const searchQuery = ref('');
    const showDropdown = ref(false);
    const showList = ref(false)
    const checkboxInput = ref<HTMLInputElement | null>(null)
    const ulPosition = ref<HTMLUListElement | null>(null)
    const widthUl = ref<number>(0)
    const topUl = ref<number>(0)
    const leftUl = ref<number>(0)
    const showValue = ref('')

    const filteredOptions = computed(() => {
      let query = ""

      if (props.modelValue === "") {
        query = props?.data?.find(item => item.cdId == props.modelValue)?.cdNm || "";
      }

      if (props.modelValue && !showDropdown.value) {
        query = props?.data?.find(item => item.cdId == props.modelValue)?.cdNm || "";
      } else {
        query = (searchQuery.value || "")
      }

      searchQuery.value = query
      query = query.toLowerCase();
      if (query === props.valueSelectAll) {
        query = ""
      }

      return props?.data?.filter(option => {
        const cdNm = (option.cdNm || "").toLowerCase();
        return cdNm.includes(query) || cdNm.includes(props.valueSelectAll);
      });
    });

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    onMounted(() => {
      if (props.data?.length && props.modelValue !== undefined) {
        searchQuery.value = props.data.find(item => item.cdId == props.modelValue)?.cdNm || ""
        showValue.value = searchQuery.value
      }
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside)
    })

    const focus = () => {
      showList.value = true
      positionSelectbox()
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

    const hideList = () => {
      showList.value = false
    }
    return {
      searchQuery,
      showDropdown,
      filteredOptions,
      toggleDropdown,
      showList,
      checkboxInput,
      ulPosition,
      widthUl,
      focus,
      hideList,
      topUl,
      leftUl,
      showValue
    };
  }, data() {
    return {
      selectedOption: '',
    }
  },
  methods: {
    selectOption(option: any) {
      this.showDropdown = false;
      this.showList = false

      if(this.showValue !== this.valueSelectAll) {
        if(option.cdNm===this.valueSelectAll) {
          this.showDropdown = true;
          this.showList = true
        }
      }

      this.selectedOption = option.cdId;
      this.searchQuery = option.cdNm;
      this.showValue = option.cdNm;

      this.$emit('update:modelValue', this.selectedOption);
      this.$emit('change', this.selectedOption);
    },
    changData(event: any) {
      this.showDropdown = true;
      this.searchQuery = event.target.value;
    }
  },
  watch: {
    "modelValue"(newValue, oldValue) {
      this.showValue = this.data.filter(option => option.cdId == newValue).length > 0 ? this.data.filter(option => option.cdId == newValue)[0].cdNm : ""
      this.searchQuery = this.showValue;
    },
  },

};
</script>

<style scoped>
/* Add your styles here */
.search_drop_down:focus {
  border: 1px solid var(--light-blue-gray) !important;
  outline: none;
}

.search_drop_down {
  padding-right: 30px;
  width: 100%;
  background-image: url('../../../assets/images/icon_search.svg');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px 20px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}
</style>
