<!-- File: src/components/common/grid/GridBase.vue -->
<template>
  <div class="w-full rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden relative">
    
    <!-- ==================== HEADER BAR (ĐÃ ĐƯA SANG BÊN TRÁI) ==================== -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 bg-slate-50/50">
      
      <!-- Bên trái: Tổng số bản ghi, số phần tử/trang & trạng thái đã chọn -->
      <div class="flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <!-- Dropdown chọn số phần tử trên 1 trang -->
        <div class="flex items-center gap-1.5">
          <select
            :value="pageSize"
            class="h-8 rounded border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
            @change="onPageSizeChange"
          >
            <option v-for="size in pageSizeOptions" :key="size" :value="size">
              {{ size }} / trang
            </option>
          </select>
        </div>
        <!-- Tổng số bản ghi -->
        <span>
          Tổng số: <strong class="font-semibold text-slate-800">{{ totalRecords }}</strong> bản ghi
        </span>


        <!-- Trạng thái đã chọn (Chỉ hiện khi có dòng được chọn) -->
        <div v-if="selectable" class="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200/60">
          <span class="text-slate-600">Đã chọn <strong class="font-semibold text-orange-600">{{ selectedRows.length }}</strong> mục</span>
          <span
            type="button"
            class="font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
            @click="clearSelection"
          >
            Bỏ chọn
          </span>
        </div>
      </div>

      <!-- Bên phải: Slot toolbar tùy biến (nếu cần) -->
      <div class="flex items-center gap-3">
        <slot name="toolbar-right" />
      </div>
    </div>

    <!-- ==================== TABLE BODY ==================== -->
    <div class="relative overflow-x-auto">
      <!-- Lớp phủ Loading -->
      <div
        v-if="loading"
        class="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[1px]"
      >
        <div class="flex items-center gap-2.5 rounded-lg bg-white px-4 py-2.5 shadow-md border border-slate-100">
          <i class="ph ph-spinner animate-spin text-xl text-orange-500"></i>
          <span class="text-sm font-medium text-slate-700">Đang tải dữ liệu...</span>
        </div>
      </div>

      <table class="w-full border-collapse text-left">
        <!-- Table Header -->
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <!-- Cột Checkbox Chọn tất cả -->
            <th v-if="selectable" class="w-12 px-4 py-3.5 text-center">
              <div class="flex justify-center">
                <CheckboxBase
                  :model-value="isAllSelected"
                  :indeterminate="isIndeterminate"
                  :disabled="data.length === 0"
                  @change="toggleSelectAll"
                />
              </div>
            </th>

            <!-- Cột STT -->
            <th v-if="showIndex" class="w-14 px-4 py-3.5 text-center">
              STT
            </th>

            <!-- Các cột dữ liệu động -->
            <th
              v-for="col in columns"
              :key="col.key"
              :style="getColStyle(col)"
              :class="getHeaderColClass(col)"
              @click="onHeaderClick(col)"
            >
              <div
                class="inline-flex items-center gap-1.5"
                :class="getHeaderFlexAlign(col)"
              >
                <span>{{ col.label }}</span>
                <span v-if="col.sortable" class="flex flex-col text-[10px] leading-none text-slate-400">
                  <i class="ph ph-caret-up -mb-0.5" :class="{ 'text-orange-500 font-bold': isSortedAsc(col.key) }"></i>
                  <i class="ph ph-caret-down" :class="{ 'text-orange-500 font-bold': isSortedDesc(col.key) }"></i>
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Rows -->
        <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
          <template v-if="data.length > 0">
            <tr
              v-for="(row, rowIndex) in data"
              :key="getRowKey(row, rowIndex)"
              :class="[
                'transition-colors duration-150 hover:bg-orange-50/40',
                isRowSelected(row) ? 'bg-orange-50/70' : 'bg-white',
                rowClickable ? 'cursor-pointer' : ''
              ]"
              @click="handleRowClick(row, rowIndex)"
            >
              <!-- Checkbox từng dòng -->
              <td v-if="selectable" class="w-12 px-4 py-3.5 text-center" @click.stop>
                <div class="flex justify-center">
                  <CheckboxBase
                    :model-value="isRowSelected(row)"
                    @change="toggleSelectRow(row)"
                  />
                </div>
              </td>

              <!-- Số thứ tự -->
              <td v-if="showIndex" class="w-14 px-4 py-3.5 text-center font-medium text-slate-500 tabular-nums">
                {{ (currentPage - 1) * pageSize + rowIndex + 1 }}
              </td>

              <!-- Dữ liệu từng ô -->
              <!-- Trong phần <tbody> của GridBase.vue -->
              <td
                v-for="col in columns"
                :key="col.key"
                :class="getBodyCellClass(col)"
                @click="onCellClick($event, col.key)"
              >
                <!-- Cho phép custom toàn bộ nội dung ô thông qua scoped slot #cell-{key} -->
                <slot
                  :name="`cell-${col.key}`"
                  :row="row"
                  :value="row[col.key]"
                  :index="rowIndex"
                >
                  <!-- Mặc định nếu không truyền slot riêng thì hiện text -->
                  {{ formatCellValue(row[col.key], col) }}
                </slot>
              </td>
            </tr>
          </template>

          <!-- Trạng thái Không có dữ liệu -->
          <tr v-else>
            <td :colspan="totalColumnsCount" class="px-6 py-14 text-center">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center">
                  <div class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-3">
                    <i class="ph ph-database text-3xl"></i>
                  </div>
                  <p class="text-sm font-semibold text-slate-700">{{ emptyText }}</p>
                  <p class="mt-1 text-xs text-slate-400">Không tìm thấy bản ghi nào phù hợp.</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ==================== FOOTER / PAGING (CĂN GIỮA) ==================== -->
    <div
      v-if="pagination && totalPages > 1"
      class="flex items-center justify-center border-t border-slate-100 bg-slate-50/40 px-6 py-4"
    >
      <div class="flex items-center gap-1">
        <ButtonBase
          variant="outline"
          size="sm"
          class="!px-2.5"
          :disabled="currentPage <= 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="ph ph-caret-left text-sm"></i>
        </ButtonBase>

        <template v-for="(page, idx) in visiblePages" :key="idx">
          <span v-if="page === '...'" class="px-2 text-xs font-medium text-slate-400 select-none">...</span>
          <ButtonBase
            v-else
            :variant="page === currentPage ? 'primary' : 'outline'"
            size="sm"
            class="min-w-[32px] !px-2.5 tabular-nums"
            @click="changePage(Number(page))"
          >
            {{ page }}
          </ButtonBase>
        </template>

        <ButtonBase
          variant="outline"
          size="sm"
          class="!px-2.5"
          :disabled="currentPage >= totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="ph ph-caret-right text-sm"></i>
        </ButtonBase>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import Swal from 'sweetalert2'
import ButtonBase from '@/components/common/button/ButtonBase.vue'
import CheckboxBase from '@/components/common/input/CheckboxBase.vue'

export interface GridColumn {
  key: string
  label: string
  width?: string
  minWidth?: string
  align?: string
  sortable?: boolean
  className?: string
  formatter?: (val: any, row?: any) => string
}

const props = defineProps({
  columns: { type: Array as PropType<GridColumn[]>, default: () => [] },
  data: { type: Array as PropType<Record<string, any>[]>, default: () => [] },
  rowKey: { type: String, default: 'id' },
  loading: { type: Boolean, default: false },
  selectable: { type: Boolean, default: false },
  selectedRows: { type: Array as PropType<Record<string, any>[]>, default: () => [] },
  showIndex: { type: Boolean, default: true },
  pagination: { type: Boolean, default: true },
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  totalRecords: { type: Number, default: 0 },
  pageSizeOptions: { type: Array as PropType<number[]>, default: () => [10, 20, 50, 100] },
  emptyText: { type: String, default: 'Không có dữ liệu' },
  rowClickable: { type: Boolean, default: false },
  showViewBtn: { type: Boolean, default: false },
  showEditBtn: { type: Boolean, default: true },
  showDeleteBtn: { type: Boolean, default: true },
  showBulkDelete: { type: Boolean, default: true }
})

const emit = defineEmits([
  'update:selectedRows',
  'update:currentPage',
  'update:pageSize',
  'page-change',
  'sort-change',
  'row-click',
  'view',
  'edit',
  'delete',
  'bulk-delete'
])

const isBulkMode = computed(() => props.selectable && props.selectedRows.length > 0)

const alignClasses: Record<string, string> = { left: 'text-left', center: 'text-center', right: 'text-right' }

const getColStyle = (col: GridColumn) => ({ width: col.width || 'auto', minWidth: col.minWidth || 'auto' })
const getHeaderColClass = (col: GridColumn) => ['px-4 py-3.5 select-none', alignClasses[col.align || 'left'], col.sortable ? 'cursor-pointer hover:text-orange-600 transition-colors' : '']
const getHeaderFlexAlign = (col: GridColumn) => ({ 'justify-center': col.align === 'center', 'justify-end': col.align === 'right' })
const getBodyCellClass = (col: GridColumn) => ['px-4 py-3.5', alignClasses[col.align || 'left'], col.className || '']
const onCellClick = (event: MouseEvent, key: string) => { if (key === 'actions') event.stopPropagation() }

const totalColumnsCount = computed(() => props.columns.length + (props.selectable ? 1 : 0) + (props.showIndex ? 1 : 0))
const getRowKey = (row: Record<string, any>, index: number) => row[props.rowKey] !== undefined ? row[props.rowKey] : index

const isRowSelected = (row: Record<string, any>) => props.selectedRows.some((item) => item[props.rowKey] === row[props.rowKey])
const isAllSelected = computed(() => props.data.length > 0 && props.data.every((row) => isRowSelected(row)))
const isIndeterminate = computed(() => {
  if (props.data.length === 0) return false
  const count = props.data.filter((row) => isRowSelected(row)).length
  return count > 0 && count < props.data.length
})

const toggleSelectRow = (row: Record<string, any>) => {
  const key = row[props.rowKey]
  const updated = isRowSelected(row) ? props.selectedRows.filter((item) => item[props.rowKey] !== key) : [...props.selectedRows, row]
  emit('update:selectedRows', updated)
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const keys = new Set(props.data.map((r) => r[props.rowKey]))
    emit('update:selectedRows', props.selectedRows.filter((r) => !keys.has(r[props.rowKey])))
  } else {
    const keys = new Set(props.selectedRows.map((r) => r[props.rowKey]))
    emit('update:selectedRows', [...props.selectedRows, ...props.data.filter((r) => !keys.has(r[props.rowKey]))])
  }
}

const clearSelection = () => emit('update:selectedRows', [])

const sortField = ref('')
const sortOrder = ref('')
const isSortedAsc = (key: string) => sortField.value === key && sortOrder.value === 'asc'
const isSortedDesc = (key: string) => sortField.value === key && sortOrder.value === 'desc'

const onHeaderClick = (col: GridColumn) => {
  if (!col.sortable) return
  if (sortField.value !== col.key) { sortField.value = col.key; sortOrder.value = 'asc' }
  else if (sortOrder.value === 'asc') { sortOrder.value = 'desc' }
  else { sortField.value = ''; sortOrder.value = '' }
  emit('sort-change', { field: sortField.value, order: sortOrder.value })
}

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalRecords / props.pageSize)))

const visiblePages = computed(() => {
  const total = totalPages.value, current = props.currentPage, result: Array<any> = []
  if (total <= 7) { for (let i = 1; i <= total; i++) result.push(i) }
  else {
    result.push(1)
    if (current > 3) result.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) result.push(i)
    if (current < total - 2) result.push('...')
    result.push(total)
  }
  return result
})

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === props.currentPage) return
  emit('update:currentPage', page)
  emit('page-change', { page, pageSize: props.pageSize })
}

const onPageSizeChange = (e: Event) => {
  const size = Number((e.target as HTMLSelectElement).value)
  emit('update:pageSize', size)
  emit('update:currentPage', 1)
  emit('page-change', { page: 1, pageSize: size })
}

const formatCellValue = (val: any, col: GridColumn) => col.formatter ? col.formatter(val) : (val ?? '---')
const handleRowClick = (row: Record<string, any>, idx: number) => { if (props.rowClickable) emit('row-click', row, idx) }

// const confirmSingleDelete = (row: Record<string, any>) => {
//   Swal.fire({
//     title: 'Xác nhận xóa?', text: 'Dữ liệu sau khi xóa sẽ không thể khôi phục!', icon: 'warning',
//     showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b',
//     confirmButtonText: 'Đồng ý xóa', cancelButtonText: 'Hủy bỏ'
//   }).then((r) => { if (r.isConfirmed) emit('delete', row) })
// }

// const confirmBulkDelete = () => {
//   Swal.fire({
//     title: `Xóa ${props.selectedRows.length} mục đã chọn?`, text: 'Hành động này không thể hoàn tác!', icon: 'warning',
//     showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b',
//     confirmButtonText: 'Xóa tất cả', cancelButtonText: 'Hủy bỏ'
//   }).then((r) => { if (r.isConfirmed) emit('bulk-delete', props.selectedRows) })
// }
</script>