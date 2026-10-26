<!-- File: src/views/store-manager/StoreListView.vue -->
<template>
  <section id="content" class="p-6 space-y-6">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>
    
    <!-- THANH TÌM KIẾM & BỘ LỌC (Chia cột & Nút căn giữa ở dưới) -->
    <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">
      <!-- Các ô tìm kiếm chia làm 3 cột -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InputBase
          v-model="filters.keyword"
          label="Từ khóa tìm kiếm"
          placeholder="Tìm tên, mã cửa hàng..."
          :show-mess="false"
        />

        <SelectBoxBase
          v-model="filters.status"
          label="Trạng thái cửa hàng"
          placeholder="Tất cả trạng thái"
          :data="statusOptions"
          :show-mess="false"
          @change="handleSearch"
        />

        <!-- Bạn có thể thêm ô lọc thứ 3 ở đây nếu cần, ví dụ: Ngày tạo hoặc Loại hình -->
      </div>

      <!-- Hàng chứa các nút hành động được căn giữa -->
      <div class="flex items-center justify-center gap-3 pt-2 border-t border-slate-100">
        <ButtonBase variant="secondary" size="md" @click="handleSearch">
          <i class="ph ph-magnifying-glass mr-1.5 text-base"></i>
          Tìm kiếm
        </ButtonBase>

        <ButtonBase variant="primary" size="md" @click="handleCreate">
          <i class="ph ph-plus mr-1.5 text-base"></i>
          Thêm mới
        </ButtonBase>

        <ButtonBase variant="outline" size="md" @click="checkSelectRow">
          <i class="ph ph-check-square mr-1.5 text-base"></i>
          Check select row
        </ButtonBase>
      </div>
    </div>

    <!-- BẢNG DỮ LIỆU GRIDBASE -->
    <GridBase
      v-model:selected-rows="selectedRows"
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :columns="columns"
      :data="paginatedTableData"
      :total-records="filteredTableData.length"
      :loading="isLoading"
      selectable
      show-index
      @page-change="fetchData"
      @sort-change="handleSort"
    >
      <!-- Custom cột Tên cửa hàng -->
      <template #cell-storeName="{ row }">
        <div class="font-semibold text-slate-800">{{ row.storeName }}</div>
        <div class="text-xs text-slate-400">{{ row.address }}</div>
      </template>

      <!-- Custom cột Trạng thái -->
      <template #cell-status="{ value }">
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
          :class="value === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'"
        >
          <i class="ph-fill ph-circle text-[8px]" :class="value === 'ACTIVE' ? 'text-emerald-500' : 'text-slate-400'"></i>
          {{ value === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng' }}
        </span>
      </template>

      <!-- Cột Thao tác (Actions) -->
      <template #cell-actions="{ row }">
        <div class="flex items-center justify-center gap-1">
          <ButtonBase
            variant="ghost"
            size="sm"
            class="!px-2 text-slate-600 hover:!text-orange-600 hover:!bg-orange-50"
            title="Chỉnh sửa"
            @click="handleEdit(row)"
          >
            <i class="ph ph-pencil-simple text-lg"></i>
          </ButtonBase>

          <ButtonBase
            variant="ghost"
            size="sm"
            class="!px-2 text-slate-600 hover:!text-red-600 hover:!bg-red-50"
            title="Xóa"
            @click="confirmDelete(row)"
          >
            <i class="ph ph-trash text-lg"></i>
          </ButtonBase>
        </div>
      </template>
    </GridBase>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GridBase, { type GridColumn } from '@/components/common/grid/GridBase.vue'
import type { CodeMngModel } from '@/stores/common/codeMng/codeMng.type'

const pageTitle = ref("Quản lý món ăn");
const breadcrumbItems = ref([{ label: "Trang chủ", link: "/" }, { label: pageTitle.value, link: "" }]);
const router = useRouter()

const isLoading = ref(false)
const selectedRows = ref<Record<string, any>[]>([])

const pagination = reactive({ page: 1, pageSize: 5 })
const filters = reactive({ keyword: '', status: '' })

const statusOptions: CodeMngModel[] = [
  { cdId: 'ACTIVE', cdNm: 'Hoạt động' },
  { cdId: 'INACTIVE', cdNm: 'Tạm ngưng' }
]

const columns: GridColumn[] = [
  { key: 'storeName', label: 'Cửa hàng', minWidth: '220px', sortable: true },
  { key: 'phone', label: 'Số điện thoại', width: '140px' },
  { key: 'owner', label: 'Chủ sở hữu', width: '160px' },
  { key: 'status', label: 'Trạng thái', width: '140px', align: 'center' },
  { key: 'actions', label: 'Thao tác', width: '110px', align: 'center' }
]

const allStoreData = ref([
  { id: 1, storeName: 'El Gaucho - Hai Bà Trưng', address: '11 Tràng Tiền, Hoàn Kiếm, Hà Nội', phone: '0901234567', owner: 'Nguyễn Quốc Huy', status: 'ACTIVE' },
  { id: 2, storeName: 'El Gaucho - Tây Hồ', address: '99 Xuân Diệu, Tây Hồ, Hà Nội', phone: '0909888777', owner: 'Nguyễn Quốc Huy', status: 'ACTIVE' },
  { id: 3, storeName: 'ForCVie Coffee Studio', address: '88 Cầu Giấy, Hà Nội', phone: '0912333444', owner: 'Nguyễn Quốc Huy', status: 'INACTIVE' },
  { id: 4, storeName: 'Phở Thìn Láng Hạ', address: '13 Láng Hạ, Đống Đa, Hà Nội', phone: '0988112233', owner: 'Lê Văn Nam', status: 'ACTIVE' },
  { id: 5, storeName: 'Bún Chả Hàng Mã', address: '25 Hàng Mã, Hoàn Kiếm, Hà Nội', phone: '0977445566', owner: 'Trần Thị Mai', status: 'ACTIVE' },
  { id: 6, storeName: 'Cà Phê Giảng', address: '39 Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội', phone: '0933221144', owner: 'Phạm Minh Tuấn', status: 'ACTIVE' },
  { id: 7, storeName: 'Highlands Coffee Royal City', address: '72 Nguyễn Trãi, Thanh Xuân, Hà Nội', phone: '0966554433', owner: 'Nguyễn Quốc Huy', status: 'INACTIVE' },
  { id: 8, storeName: 'Pizza 4P’s Tràng Tiền', address: '43 Tràng Tiền, Hoàn Kiếm, Hà Nội', phone: '0944332211', owner: 'Hoàng Văn Minh', status: 'ACTIVE' },
  { id: 9, storeName: 'KFC Vincom Bà Triệu', address: '191 Bà Triệu, Hai Bà Trưng, Hà Nội', phone: '0911223344', owner: 'Đỗ Thị Lan', status: 'ACTIVE' },
  { id: 10, storeName: 'Lotteria Cầu Giấy', address: '333 Cầu Giấy, Hà Nội', phone: '0922334455', owner: 'Vũ Hoàng Long', status: 'INACTIVE' },
  { id: 11, storeName: 'The Coffee House Thái Hà', address: '15 Thái Hà, Đống Đa, Hà Nội', phone: '0955667788', owner: 'Nguyễn Quốc Huy', status: 'ACTIVE' },
  { id: 12, storeName: 'Tous les Jours Kim Mã', address: '123 Kim Mã, Ba Đình, Hà Nội', phone: '0988776655', owner: 'Bùi Văn Hùng', status: 'ACTIVE' },
  { id: 13, storeName: 'Bánh Mì 25', address: '25 Hàng Cá, Hoàn Kiếm, Hà Nội', phone: '0933445566', owner: 'Lê Thị Hoa', status: 'ACTIVE' },
  { id: 14, storeName: 'Gogi House Trần Thái Tông', address: '103 Trần Thái Tông, Cầu Giấy, Hà Nội', phone: '0977889900', owner: 'Trần Đức Bo', status: 'INACTIVE' },
  { id: 15, storeName: 'Kichi Kichi Láng Hạ', address: '104 Láng Hạ, Đống Đa, Hà Nội', phone: '0966112233', owner: 'Phạm Quỳnh Nga', status: 'ACTIVE' }
])

const filteredTableData = computed(() => {
  return allStoreData.value.filter((item) => {
    const matchKeyword = !filters.keyword || item.storeName.toLowerCase().includes(filters.keyword.toLowerCase()) || item.phone.includes(filters.keyword)
    const matchStatus = !filters.status || item.status === filters.status
    return matchKeyword && matchStatus
  })
})

const paginatedTableData = computed(() => {
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return filteredTableData.value.slice(start, end)
})

const fetchData = () => { 
  console.log('Fetch page:', pagination.page) 
}

const handleSearch = () => { 
  pagination.page = 1 
}

const handleSort = (payload: { field: string; order: string }) => { 
  console.log('Sort:', payload) 
}

const handleCreate = () => { 
  router.push('/store-manager/store-manager/form') 
}

const handleEdit = (row: Record<string, any>) => { 
  router.push(`/store-manager/store-manager/form?id=${row.id}`)
}

const confirmDelete = (row: Record<string, any>) => {
  allStoreData.value = allStoreData.value.filter(item => item.id !== row.id)
  selectedRows.value = selectedRows.value.filter(item => item.id !== row.id)
}

const checkSelectRow = () => {
  console.log('=== DANH SÁCH CÁC DÒNG ĐÃ CHỌN ===', selectedRows.value)
}
</script>