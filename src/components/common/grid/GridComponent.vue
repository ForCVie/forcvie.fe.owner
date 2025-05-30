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
        <span v-if="isShowAll && !paginationClientFlag">총 {{ totalRecord }}건</span>
      </div>
    </div>
    <div class="button-list">
      <slot name="button"> </slot>
    </div>
  </div>
  <AgGridVue
    id="myGrid"
    ref="agGrid"
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
    :rowData="rowData"
    :columnDefs="columnDefs"
    :pagination="true"
    :paginationPageSize="paginationPageSize"
    :paginationPageSizeSelector="paginationPageSizeSelector"
    :gridOptions="gridOptions"
    @grid-ready="onGridReady"
    @selectionChanged="onSelectionChanged"
    @first-data-rendered="onFirstDataRendered"
    @rowClicked="rowClick"
    overlayNoRowsTemplate="조회된 데이터가 없습니다"
    :rowClassRules="rowClassRules"
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
      >{{ item }}</a
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
      >{{ item }}</a
    >
    <a href="javascript:void(0);" class="func next" @click="gotoNextGroupPage">Next page</a>
    <a href="javascript:void(0);" class="func last" @click="gotoLastGroupPage">Last page</a>
  </div>
</template>
<script lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { ref, defineEmits } from 'vue'
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
    customPagination: null
  },
  components: {
    AgGridVue
  },
  beforeMount() {
    this.paginationPageSizeSelect = this.paginationPageSize
  },
  mounted() {
    this.targetPage = 1
    this.gotoPage(1)
    if (this.newGridOptions) {
      this.gridOptions = this.newGridOptions
    }
    this.endDisplayedRow = this.paginationPageSize
    this.rowDataForPageSize = this.rowData
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
      domLayout: 'autoHeight',
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
      if (this.paginationClientFlag) {
        if (this.checkSize) {
          rowCount = this.rowDataForPageSize.length
          this.totalRecordClient = this.rowDataForPageSize.length
        } else {
          rowCount = this.rowData.length
          this.totalRecordClient = this.rowData.length
        }
      } else {
        rowCount = this.totalRecord ? this.totalRecord : 0
      }

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
      if (this.paginationClientFlag) {
        if (this.checkSize) {
          rowCount = this.rowData.length
          this.totalRecordClient = this.rowDataForPageSize.length
        } else {
          rowCount = this.rowData.length
          this.totalRecordClient = this.rowData.length
        }
      } else {
        rowCount = this.totalRecord ? this.totalRecord : 0
      }

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
    this.columnDefs.forEach((column) => {
      if (column.field !== undefined) {
        column.valueGetter = function (params) {
          const fieldParts = column.field.split('.')
          let value = params.data
          for (const part of fieldParts) {
            if (value && value.hasOwnProperty(part)) {
              value = value[part]
              if (!value) {
                value = ' - '
              }
            } else {
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
         'error-row':  params => params.data.hasError === true,

     }
    }
  },
  methods: {
    addRowData(data) {
      //this.rowData = data;
      this.gridApi.setGridOption('rowData', data)
      this.setHeightGrid()
      this.totalRecordClient = data.length
    },
    rowClick(params) {
      this.$emit('rowClick', params.data)
    },
    onFirstDataRendered(params) {
      const nodesToSelect = []
      params.api.forEachNode((node) => {
        if (node.data) {
          let checkSelected = 0
          if (this.keySelected) {
            this.keySelected.forEach((item) => {
              if (item.value.includes(node.data[item.field])) {
                checkSelected++
              }
            })

            if (checkSelected == this.keySelected.length && checkSelected > 0) {
              nodesToSelect.push(node)
            }
          }
        }
      })
      params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true })
    },
    setHeightGrid() {
      this.$refs.agGrid.api.setGridOption('paginationPageSize', this.paginationPageSizeSelect)
      if (!this.paginationClientFlag) {
        const rowCount = this.totalRecordClient
        if (rowCount < this.paginationPageSizeSelect) {
          this.$refs.agGrid.api.setGridOption('paginationPageSize', this.paginationPageSizeSelect)
        }
      }
    },
    setSeletedRows() {
      const nodesToSelect = []
      const params = this.$refs.agGrid
      params.api.forEachNode((node) => {
        if (node.data) {
          let checkSelected = 0
          if (this.keySelected) {
            this.keySelected.forEach((item) => {
              if (item.value.includes(node.data[item.field])) {
                checkSelected++
              }
            })

            if (checkSelected == this.keySelected.length  && checkSelected > 0) {
              nodesToSelect.push(node)
            }
          }
          if (this.selectedRows.length > 0) {
            this.selectedRows.forEach((item) => {
              if (item.rowNum == node.data.rowNum) {
                nodesToSelect.push(node)
              }
            })
          }
        }
      })
      params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true })
    },
    async handlePaginationPageSizeChange() {
      this.targetPage = 1
      if (this.paginationClientFlag) {
        this.setHeightGrid()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
        }
      }
    },
    onSelectionChanged(event) {
      const selectedRows = this.$refs.agGrid.api.getSelectedRows()
      if (!this.paginationClientFlag) {
        if (this.selectedRows.length == 0) {
          this.selectedRows = selectedRows
        } else {
          if (selectedRows.length > 0) {
            const newselectedRows = [...this.selectedRows, ...selectedRows]
            this.selectedRows = [
              ...new Map(newselectedRows.map((item) => [item.rowNum, item])).values()
            ]
          }
        }
      } else {
        this.selectedRows = selectedRows
      }
      this.$emit('update:modelValue', this.selectedRows)
    },
    countRowOfPage() {
      this.firstDisplayedRow = this.$refs.agGrid.api.getFirstDisplayedRow() + 1
      const endRowCount = this.firstDisplayedRow + this.paginationPageSizeSelect - 1
      if (endRowCount < this.totalRecordClient) {
        this.endDisplayedRow = endRowCount
      } else {
        this.endDisplayedRow = this.totalRecordClient
      }
      const rowCount = this.endDisplayedRow - this.firstDisplayedRow
      if (rowCount < this.paginationPageSize) {
        this.$refs.agGrid.api.setGridOption('paginationPageSize', this.paginationPageSizeSelect)
      }
    },
    async gotoPage(pageNumber) {
      if (this.paginationClientFlag) {
        this.$refs.agGrid.api.paginationGoToPage(pageNumber - 1)
        this.targetPage = pageNumber
        this.rowCount = this.$refs.agGrid.api.paginationGetRowCount()
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(pageNumber, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.targetPage = pageNumber
          this.setSeletedRows()
        }
      }
    },
    async gotoFisrtPage() {
      this.targetPage = 1
      if (this.paginationClientFlag) {
        this.$refs.agGrid.api.paginationGoToFirstPage()

        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
    },
    async gotoPrePage() {
      const newTarget = this.targetPage - 1
      this.targetPage = newTarget > 0 ? newTarget : 1
      if (this.paginationClientFlag) {
        this.$refs.agGrid.api.paginationGoToPreviousPage(this.targetPage)
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
    },

    async gotoNextPage() {
      const newTarget = this.targetPage + 1
      this.targetPage =
        newTarget <= this.pagesSize[this.pagesSize.length - 1]
          ? newTarget
          : this.pagesSize[this.pagesSize.length - 1]
      if (this.paginationClientFlag) {
        this.$refs.agGrid.api.paginationGoToNextPage(this.targetPage)
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
    },
    async gotoLastPage() {
      this.targetPage = this.pagesSize[this.pagesSize.length - 1]
      if (this.paginationClientFlag) {
        this.$refs.agGrid.api.paginationGoToLastPage()
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
    },
    async gotoFisrtGroupPage() {
      this.targetPage = 1
      this.currentGroupPage = 1
      if (this.paginationClientFlag) {
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
      this.gotoPage(1)
    },
    async gotoPreGroupPage() {
      const newTarget = this.currentGroupPage > 1 ? this.currentGroupPage - 1 : 1
      this.currentGroupPage = newTarget > 0 ? newTarget : 1
      this.targetPage = this.pageInGroup * this.currentGroupPage - this.pageInGroup + 1
      if (this.paginationClientFlag) {
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
      this.gotoPage(this.targetPage)
    },
    async gotoNextGroupPage() {
      const newTarget = this.currentGroupPage + 1
      this.currentGroupPage = newTarget <= this.totalGroup ? newTarget : this.totalGroup
      this.targetPage = this.pageInGroup * this.currentGroupPage - this.pageInGroup + 1
      if (this.paginationClientFlag) {
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
      this.gotoPage(this.targetPage)
    },
    async gotoLastGroupPage() {
      this.currentGroupPage = this.totalGroup
      this.targetPage = this.totalPageGroup
      if (this.paginationClientFlag) {
        this.countRowOfPage()
      } else {
        if (typeof this.customPagination === 'function') {
          await this.customPagination(this.targetPage, this.paginationPageSizeSelect)
          this.setHeightGrid()
          this.setSeletedRows()
        }
      }
      this.gotoPage(this.targetPage)
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
.ag-header-cell:first-child {
  border-left: none !important;
}

.ag-ltr .ag-cell,
.ag-ltr .ag-cell * {
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ag-ltr .ag-cell:first-child {
  border-left: none !important;
}
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
.error-row {background-color: red !important;}

.ag-header {
  border-bottom: none;
}
.ag-head {
  margin-bottom: 16px;
}
.ag-head select {
  margin-right: 12px !important;
  padding: 0 30px 0 12px;
  min-width: 130px; height: 40px;
  font-size: 16px; font-weight: 500;
  border: 1px solid #D6DBE2;
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
.ag-checkbox .ag-input-wrapper, .ag-radio-button .ag-input-wrapper {
  width: 20px; height: 20px;
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
.ag-cell, .ag-full-width-row .ag-cell-wrapper.ag-row-group {
  padding-left: 12px; padding-right: 12px;
}
.ag-checkbox-input-wrapper::before {
  display: none !important;
}
.ag-checkbox-input-wrapper::after {
  display: none !important;
}
@media screen and (max-width: 768px) {
  .ag-head{
    display: flex;
    flex-direction: column-reverse;
  }
  .ag-head .button-list{
    justify-content: flex-start;
    margin-bottom: 24px;
  }
  .ag-head .button-list > * {
    margin-right: 5px;
  }
}
@media screen and (max-width: 480px) {
  .ag-head .button-list{
    justify-content: flex-start;
    flex-wrap: wrap;
    gap:10px;
    margin-bottom: 24px;
  }
}
</style>
