<template>
  <div class="ag-head">
    <div class="page-size">
      <select
        id="paginationPageSize"
        @change="handlePaginationPageSizeChange"
        v-model="paginationPageSizeSelect"
      >
        <option :value="rowData.length" v-if="isShowAll && paginationClientFlag">전체</option>
        <option :value="totalRecord" v-if="isShowAll && !paginationClientFlag">전체</option>
        <option
          v-for="(item, index) in paginationPageSizeSelector"
          :key="index"
          :value="item"
          :selected="item == paginationPageSizeSelect"
        >
          {{ item }}건씩 보기
        </option>
      </select>
      <div class="total-record">
        <span v-if="isShowAll && paginationClientFlag">총 {{ totalRecordClient }}건</span>
        <span v-if="isShowAll && !paginationClientFlag && totalRecord >= 0">총 {{ totalRecord }}건</span>
      </div>
    </div>
    <div class="button-list">
      <slot name="button"> </slot>
    </div>
  </div>
  <AgGridVue
    :id="id"
    ref="agGrid"
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
    :rowData="rowData"
    :columnDefs="columnDefs"
    :pagination="true"
    :paginationPageSize="paginationPageSize"
    :paginationPageSizeSelector="paginationPageSizeSelector"
    :gridOptions="newGridOptions ? newGridOptions : gridOptions"
    @grid-ready="onGridReady"
    @first-data-rendered="onFirstDataRendered"
    @rowClicked="rowClick"
    overlayNoRowsTemplate="조회된 데이터가 없습니다"
    :rowClassRules="rowClassRules"
    @sortChanged="onSortChanged"
  >
  </AgGridVue>
  <div class="pagination_wrap" v-if="pagesSize.length < 11">
    <a href="javascript:void(0);" class="func first" @click="gotoFisrtPage">First page</a>
    <a href="javascript:void(0);" class="func back" @click="gotoPrePage">back page</a>
    <a
      href="javascript:void(0);"
      :class="{ active: item == targetPage }"
      v-for="(item, index) in pagesSize"
      @click="gotoPage(item)"
    ><p>{{ item }}</p></a
    >
    <a href="javascript:void(0);" class="func next" @click="gotoNextPage">Next page</a>
    <a href="javascript:void(0);" class="func last" @click="gotoLastPage">Last page</a>
  </div>

  <div class="pagination_wrap" v-if="pagesSize.length > 10">
    <a href="javascript:void(0);" class="func first" @click="gotoFisrtGroupPage">First page</a>
    <a href="javascript:void(0);" class="func back" @click="gotoPreGroupPage">back page</a>
    <a
      href="javascript:void(0);"
      :class="{ active: item == targetPage }"
      v-for="(item, index) in pagesSizeGroup"
      @click="gotoPage(item)"
      ><p>{{ item }}</p></a
    >
    <a href="javascript:void(0);" class="func next" @click="gotoNextGroupPage">Next page</a>
    <a href="javascript:void(0);" class="func last" @click="gotoLastGroupPage">Last page</a>
  </div>
</template>
<script lag="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { ref, defineEmits , defineComponent} from 'vue'
import {
  PAGE_IN_GROUP,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR
} from '../../../constants/screen.const'
export default {
  props: {
    modelValue: [],
    rowData: [],
    columnDefs: [],
    pagination: Boolean,
    paginationPageSize: {
      type: Number,
      default: PAGINATION_PAGE_SIZE
    },
    paginationPageSizeSelector: {
      type: Array,
      default: PAGINATION_PAGE_SIZE_SELECTOR
    },
    newGridOptions: {},
    isShow: {
      type: Boolean,
      default: false
    },
    checkSize: {
      type: Boolean,
      default: false
    },
    keySelected: [],
    isShowAll: {
      type: Boolean,
      default: true
    },
    paginationClientFlag: {
      type: Boolean,
      default: true
    },
    totalRecord: Number,
    id: {
      type: String,
      default :'myGrid'
    }
    // customPagination: null
  },
  components: {
    AgGridVue
  },
  beforeMount() {
    this.paginationPageSizeSelect = this.paginationPageSize
  },
  mounted() {
    this.targetPage = 1
    this.endDisplayedRow = this.paginationPageSize
    this.rowDataForPageSize = this.rowData
    this.gotoPage(1)
  },
  setup(props) {
    const gridApi = ref()
    const onGridReady = (params) => {
      gridApi.value = params.api
    }
    const onBtExport = () => {
      gridApi.value.exportDataAsExcel()
    }

    const gridOptions = {
      defaultColDef: {
        flex: 1,
        minWidth: 50,
        resizable: true,
        suppressMovable: true
      },
      rowSelection: 'multiple',
      suppressRowClickSelection: true,
      domLayout: 'autoHeight'
    }

    return {
      onGridReady,
      onBtExport,
      gridOptions,
      gridApi
    }
  },
  computed: {
    pagesSize() {
      let rowCount
      let totalpage = 0

      rowCount = this.totalRecord ? this.totalRecord : 0
      totalpage = Math.ceil(rowCount / this.paginationPageSizeSelect)
      let size = [1]
      for (let i = 2; i <= totalpage; i++) {
        size.push(i)
      }

      return size
    },
    pagesSizeGroup() {
      let rowCount
      let totalpage = 0

      rowCount = this.totalRecord ? this.totalRecord : 0
      

      totalpage = Math.ceil(rowCount / this.paginationPageSizeSelect)
      this.totalGroup = Math.ceil(totalpage / this.pageInGroup)
      this.totalPageGroup = totalpage
      let currentSize = this.pageInGroup * this.currentGroupPage - this.pageInGroup + 1
      let size = [currentSize]
      for (let i = currentSize + 1; i <= this.pageInGroup * this.currentGroupPage; i++) {
        if (i <= totalpage) {
          size.push(i)
        }
      }
      return size
    }
  },
  created() {

    this.columnDefs?.forEach((column) => {
      if (column.field !== undefined) {
        column.valueGetter = function (params) {
          const fieldParts = column.field.split('.')
          let value = params.data
          for (const part of fieldParts) {
            if (value && value.hasOwnProperty(part)) {
              value = value[part]
              if (value == '' || value == null) {
                value = ' - '
              }
            } 
            else {
              value = ' - '
            }
          }
          return value
        }
      }
    })
  },
  data() {
    return {
      rowCount: 0,
      paginationPageSizeSelect: null,
      targetPage: 1,
      firstDisplayedRow: 1,
      endDisplayedRow: 1,
      rowDataForPageSize: [],
      selectedRows: [],
      totalRecordClient: 0,
      currentGroupPage: 1,
      pageInGroup: PAGE_IN_GROUP,
      totalGroup: 1,
      totalPageGroup: 0,
      rowClassRules: {
        'error-row': (params) => params.data.hasError === true
      },
      sortField: "",
      sortType: ""
    }
  },
  methods: {
    async onSortChanged(event) {
      const sortModel = event.columns;
      
      if (sortModel.length != 0) {
        const { colId, sort } = sortModel.length == 1 ? sortModel[0] : sortModel[1];
        this.sortType = sort == undefined ? "" : sort.toUpperCase();
        
        this.sortField = colId;
      }
      await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
    },
     countRowOfPage() {
           const gridApi = this.$refs.agGrid.api;
            this.firstDisplayedRow = gridApi.getFirstDisplayedRow() + 1;
            const mygrid = document.getElementById(this.id);
            const agRootWrapperBody = mygrid.querySelector('.ag-root-wrapper-body')

            const endRowCount = this.firstDisplayedRow + this.paginationPageSizeSelect -1;
            
            if (endRowCount < this.rowData.length) {
                this.endDisplayedRow = endRowCount;
            } else {
                this.endDisplayedRow = this.rowData.length;
            }
            const rowCount = this.endDisplayedRow - this.firstDisplayedRow;
            const numberRowData = 11;
            let height = 0;
            setTimeout(() => {
            const node = this.$refs.agGrid.api.getRenderedNodes();
            if(node[0]){
              height = node[0].rowHeight + 5;
            }
            if (rowCount < this.paginationPageSize) {
              gridApi.setGridOption('paginationPageSize', this.paginationPageSizeSelect);
              gridApi.setGridOption('domLayout', 'normal');
              const h = height * (rowCount + 2);
                if (agRootWrapperBody) {
                     if(rowCount < 1) {
                       agRootWrapperBody.style.height = `125px`;
                     } else {
                       agRootWrapperBody.style.height = `${height * (rowCount + 2) + 2}px`;
                     }
                  }
            }
            else {
                gridApi.setGridOption('paginationPageSize', this.paginationPageSizeSelect);
                gridApi.setGridOption('domLayout', 'normal');
                if (agRootWrapperBody) {
                      agRootWrapperBody.style.height = `${height * (numberRowData + 2)}px`;
                  }
                gridApi.onSortChanged()
            }
             },0)
        },
   async customPagination(pageNumber, paginationPageSizeSelect) {
     await this.$emit('customPagination', pageNumber, paginationPageSizeSelect, this.sortField, this.sortType)
    },
    rowClick(params) {
      this.$emit('rowClick', params.data)
    },
    onFirstDataRendered(params) {
      this.countRowOfPage();
    },
 
    async handlePaginationPageSizeChange() {
      this.targetPage = 1
      if (this.paginationClientFlag) {
        this.setHeightGrid()
      } else {
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
        this.countRowOfPage();
      }
    },

    async gotoPage(pageNumber) {

        await this.customPagination(pageNumber, this.paginationPageSizeSelect)
        this.targetPage = pageNumber
        this.$refs.agGrid.api.paginationGoToPage(pageNumber - 1);
    },
    async gotoFisrtPage() {
      this.targetPage = 1
      if (this.paginationClientFlag) {
        this.$refs.agGrid.api.paginationGoToFirstPage()
        await this.$refs.agGrid.api.forEachNode((node) => {
          let count = 0
          this.selectedRows.forEach((data) => {
            if (node.data.rowNum == data.rowNum) {
              count++
            }
          })
          if (count == 0) {
            node.setSelected(false)
          }
        })
        
      } else {
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
        ;
      }
    },
    async gotoPrePage() {
      const newTarget = this.targetPage - 1
      this.targetPage = newTarget > 0 ? newTarget : 1

      await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
      this.$refs.agGrid.api.paginationGoToPreviousPage(this.targetPage)

    },

    async gotoNextPage() {
      const newTarget = this.targetPage + 1
      this.targetPage =
        newTarget <= this.pagesSize[this.pagesSize.length - 1]
          ? newTarget
          : this.pagesSize[this.pagesSize.length - 1]
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
        this.$refs.agGrid.api.paginationGoToNextPage(this.targetPage)
        

    },
    async gotoLastPage() {
      this.targetPage = this.pagesSize[this.pagesSize.length - 1]
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
        this.setHeightGrid()
        this.$refs.agGrid.api.paginationGoToLastPage()
        
    },
    async gotoFisrtGroupPage() {
      this.targetPage = 1
      this.currentGroupPage = 1
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
      this.gotoPage(1)
      
    },
    async gotoPreGroupPage() {
      const newTarget = this.currentGroupPage > 1 ? this.currentGroupPage - 1 : 1
      this.currentGroupPage = newTarget > 0 ? newTarget : 1
      this.targetPage = this.pageInGroup * this.currentGroupPage - this.pageInGroup + 1
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
      this.gotoPage(this.targetPage)
      
    },
    async gotoNextGroupPage() {
      const newTarget = this.currentGroupPage + 1
      this.currentGroupPage = newTarget <= this.totalGroup ? newTarget : this.totalGroup
      this.targetPage = this.pageInGroup * this.currentGroupPage - this.pageInGroup + 1
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
      this.gotoPage(this.targetPage)
      
    },
    async gotoLastGroupPage() {
      this.currentGroupPage = this.totalGroup
      this.targetPage = this.totalPageGroup
        await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
      
      this.gotoPage(this.targetPage)
      ;
    }
  },
  watch: {
    rowData(newValue){
      this.countRowOfPage();
    }
  }
}
</script>

<style>
.ag-theme-alpine > .ag-root-wrapper {
  border: none;
}
.ag-ltr .ag-header-cell {
  border-left: 0.5px var(--light-gray) solid;
  background: var(--white-color);
}
.ag-ltr .ag-cell {
  color: var(--drank-gray);
}
.ag-header-cell:last-child {
  border-right: none !important;
}
/* .ag-header-cell:first-child {
  border-left: none !important;
} */

.ag-ltr .ag-cell,
.ag-ltr .ag-cell * {
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* .ag-ltr .ag-cell:first-child {
  border-left: none !important;
} */
.ag-ltr .ag-cell:last-child {
  border-right: none !important;
}
.ag-header-cell-label {
  align-items: center;
}
.ag-header-cell {
  border-bottom: 0.5px #000000 solid;
  border-top: 0.5px #000000 solid;
}
.ag-header-cell,
.ag-header-cell * {
  color: #898d9c;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
}

.ag-header-cell-resize {
  width: 4px;
  background-color: none;
  right: -2px !important;
}

.ag-header-cell-resize::after {
  content: '';
  display: none;
}
.ag-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.ag-head .button-list {
  display: flex;
  justify-content: flex-end;
}

.ag-head .button-list > * {
  margin-left: 5px;
}

.ag-head .page-size {
  display: flex;
  align-items: center;
}

.ag-head .page-size > * {
  margin-right: 5px;
}

.page-size .total-record {
  display: flex;
  align-items: center;
}

.ag-paging-panel {
  display: none !important;
}

.ag-center-cols-viewport {
  min-height: unset !important;
}

.height-grid {
  min-height: 1310px !important;
}
.ag-overlay {
  position: static;
  font-size: 24px;
  font-weight: 700;
}
.error-row {
  background-color: red !important;
}

.ag-header {
  border-bottom: none;
}
.ag-head {
  margin-bottom: 16px;
}
.ag-head select {
  margin-right: 12px !important;
  padding: 0 30px 0 12px;
  min-width: 130px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #d6dbe2;
  border-radius: 4px;
  background: url('@/assets/images/icon_arrow_down.png') no-repeat right 10px center;
  -webkit-appearance: none !important;
  appearance: none !important;
}
.ag-overlay-no-rows-wrapper.ag-layout-auto-height {
  padding: 80px 0 60px !important;
}
.ag-checkbox-input-wrapper.ag-checked::after {
  color: #6ec5ff !important;
}
.ag-cell-wrapper {
  display: block;
}
.ag-cell-wrapper > *:not(.ag-cell-value):not(.ag-group-value) {
  margin: 0;
  justify-content: center;
}
.ag-checkbox .ag-input-wrapper,
.ag-radio-button .ag-input-wrapper {
  width: 20px;
  height: 20px;
  background-color: var(--white-color);
  border: 1px solid var(--gray-lavender);
  border-radius: 4px;
}
.ag-checkbox-input-wrapper.ag-checked {
  border-color: #6ec5ff;
  background-color: #6ec5ff;
  background-image: url(@/assets/images/icon_check.png);
  background-repeat: no-repeat;
  background-position: center;
}
.ag-checkbox-input-wrapper.ag-disabled {
  border-color: var(--gray-lavender);
  background-color: var(--gray-lavender);
}
.ag-cell,
.ag-full-width-row .ag-cell-wrapper.ag-row-group {
  padding-left: 12px;
  padding-right: 12px;
}
.ag-checkbox-input-wrapper::before {
  display: none !important;
}
.ag-checkbox-input-wrapper::after {
  display: none !important;
}
.ag-cell, .ag-full-width-row .ag-cell-wrapper.ag-row-group {
  border-left: 1px solid #B3B3B3 ;
}
.ag-grid-custom .ag-row {
  height: 20px !important;
}
.ag-header-cell, .ag-header-cell * {
  display: flex;
}
.ag-ltr .ag-cell > span {
  cursor: pointer;
}
.ag-ltr .ag-cell > a.on {
  color: #00800D !important;
}
.ag-ltr .ag-cell > span.active {
  color: #ef480c !important;
}
.button-list{
  display: flex;
  justify-content: center;
  align-items: center;
  gap:8px;
}

.linkGrid {
  color: #F15922
}
.ag-column-first{
  border-left: none !important;
}
</style>
