<!-- File: src/components/common/InputFileBase.vue -->
<template>
  <div class="flex flex-col gap-1.5 w-full">
    <!-- 1. LABEL TỔNG -->
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Subtitle / Warning Message -->
    <p v-if="subTitle" class="text-xs text-amber-600 font-medium">{{ subTitle }}</p>

    <!-- 2. CHẾ ĐỘ PREVIEW ẢNH (Image Preview Mode) -->
    <div v-if="previewFlag" class="flex flex-wrap gap-3 items-center mt-1">
      <!-- Danh sách ảnh -->
      <div 
        v-for="(item, index) in allFileList" 
        :key="item.id || item.fileUrl || index" 
        class="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50 cursor-pointer"
        @click="openImageModal(index)"
      >
        <img 
          :src="item.url || item.fileUrl" 
          alt="Preview" 
          class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />

        <!-- Overlay hiệu ứng kính lúp khi Hover -->
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
          </svg>
        </div>
        
        <!-- Nút xoá ảnh -->
        <button
          v-if="mode !== MODE_DETAIL"
          type="button"
          @click.stop="handleRemove(item)"
          class="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow z-10"
          title="Xoá ảnh"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Ô chọn ảnh mới -->
      <label 
        v-if="mode !== MODE_DETAIL && !isLimitReached"
        :for="id"
        class="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50/50 cursor-pointer transition-all group"
      >
        <svg class="w-6 h-6 text-gray-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        <span class="text-xs text-gray-500 group-hover:text-orange-500 mt-1 font-medium">Thêm ảnh</span>
      </label>
    </div>

    <!-- 3. CHẾ ĐỘ UPLOAD FILE THƯỜNG -->
    <div v-else class="flex flex-col gap-2 mt-1">
      <div v-if="mode !== MODE_DETAIL && !isLimitReached">
        <label 
          :for="id" 
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer shadow-sm transition-colors"
        >
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {{ buttonText || 'Chọn tệp đính kèm' }}
        </label>
      </div>

      <!-- Danh sách File -->
      <div v-if="allFileList.length > 0" class="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div 
          v-for="(item, index) in allFileList" 
          :key="item.id || item.fileName || index"
          class="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50"
        >
          <div class="flex items-center gap-2 truncate pr-2">
            <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span class="text-gray-700 font-medium truncate">{{ item.fimOrgName || item.fileName }}</span>
            <span v-if="item.size" class="text-xs text-gray-400">({{ item.size }} KB)</span>
          </div>

          <div class="flex items-center gap-1 shrink-0">
            <button 
              v-if="item.isUploaded"
              type="button" 
              @click="handleDownload(item.fileName)"
              class="p-1 text-gray-500 hover:text-blue-600 rounded transition-colors"
              title="Tải xuống"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </button>

            <button 
              v-if="mode !== MODE_DETAIL"
              type="button" 
              @click="handleRemove(item)"
              class="p-1 text-gray-500 hover:text-red-600 rounded transition-colors"
              title="Xoá"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden Input HTML Native -->
    <input
      ref="inputFileRef"
      type="file"
      :id="id"
      :name="name"
      :accept="acceptType"
      :multiple="multiple"
      :disabled="isLimitReached || mode === MODE_DETAIL"
      class="hidden"
      @change="handleFileChange"
    />

    <!-- 4. MODAL ADVANCED LIGHTBOX (ZOOM + NEXT/PREV) -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="zoomedIndex !== null" 
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md select-none"
          @click="closeImageModal"
          @wheel.prevent="handleWheel"
        >
          <!-- BỘ CÔNG CỤ ĐIỀU KHIỂN DÒNG TRÊN (TOP TOOLBAR) -->
          <div class="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20 pointer-events-auto">
            <!-- Đếm số trang ảnh -->
            <div class="text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
              {{ zoomedIndex + 1 }} / {{ allFileList.length }}
            </div>

            <!-- Các nút thao tác Zoom & Đóng -->
            <div class="flex items-center gap-2 bg-black/50 p-1.5 rounded-full border border-white/10">
              <!-- Nút Thu nhỏ -->
              <button 
                type="button" 
                class="p-1.5 hover:bg-white/20 rounded-full transition" 
                @click.stop="zoomOut" 
                title="Thu nhỏ"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0M13 10H7"/>
                </svg>
              </button>

              <!-- Hiển thị tỉ lệ Zoom -->
              <span class="text-xs font-mono w-12 text-center" @click.stop="resetZoom">
                {{ Math.round(zoomScale * 100) }}%
              </span>

              <!-- Nút Phóng to -->
              <button 
                type="button" 
                class="p-1.5 hover:bg-white/20 rounded-full transition" 
                @click.stop="zoomIn" 
                title="Phóng to"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0M10 7v6m3-3H7"/>
                </svg>
              </button>

              <!-- Nút Reset Kích thước -->
              <button 
                type="button" 
                class="p-1.5 hover:bg-white/20 rounded-full transition text-xs font-semibold px-2" 
                @click.stop="resetZoom" 
                title="Kích thước ban đầu"
              >
                1:1
              </button>

              <div class="w-[1px] h-4 bg-white/20 my-auto mx-1"></div>

              <!-- Nút Đóng -->
              <button 
                type="button" 
                class="p-1.5 hover:bg-red-500 rounded-full transition" 
                @click="closeImageModal" 
                title="Đóng (Esc)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- NÚT PREVIOUS (Lùi ảnh) -->
          <button 
            v-if="allFileList.length > 1"
            type="button" 
            class="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition border border-white/10 z-20"
            @click.stop="prevImage"
            title="Ảnh trước (Mũi tên trái)"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- KHUNG HIỂN THỊ ẢNH -->
          <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              :src="currentZoomedImageSrc" 
              alt="Zoomed Image" 
              class="max-w-full max-h-[85vh] object-contain rounded-lg transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
              :style="{ transform: `scale(${zoomScale})` }"
              @click.stop
            />
          </div>

          <!-- NÚT NEXT (Tiến ảnh) -->
          <button 
            v-if="allFileList.length > 1"
            type="button" 
            class="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition border border-white/10 z-20"
            @click.stop="nextImage"
            title="Ảnh tiếp theo (Mũi tên phải)"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'
import { fileMngStore } from '@/stores/common/fileMng'
import {
  FILE_TYPE_IMAGE,
  FILE_TYPE_OFFICE,
  FILE_TYPE_VIDEO,
  ACCEPTTYPE_OFICE,
  ACCEPTTYPE_IMG,
  ACCEPTTYPE_VIDEO,
  ACCEPTTYPE_All,
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS
} from '@/constants/screen.const'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  id: { type: String, default: 'file_input' },
  name: { type: String, default: '' },
  type: { type: String, default: '' },
  label: { type: String, default: '' },
  buttonText: { type: String, default: '' },
  required: { type: Boolean, default: false },
  subTitle: { type: String, default: '' },
  mode: { type: String, default: MODE_CREATE },
  previewFlag: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  maxFile: { type: Number, default: 1 },
  maxSize: { type: Number, default: 10 },
  category: { type: String, default: '' },
  orgName: { type: String, default: '' },
  sectionName: { type: String, default: '' },
  referKey: { type: Number, default: null }
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const store = fileMngStore()

const inputFileRef = ref<HTMLInputElement | null>(null)
const localFiles = ref<any[]>([])
const uploadedFiles = ref<any[]>([])

// State Modal Zoom/Lightbox
const zoomedIndex = ref<number | null>(null)
const zoomScale = ref<number>(1)

const allFileList = computed(() => [...uploadedFiles.value, ...localFiles.value])

const currentZoomedImageSrc = computed(() => {
  if (zoomedIndex.value === null || !allFileList.value[zoomedIndex.value]) return ''
  const item = allFileList.value[zoomedIndex.value]
  return item.url || item.fileUrl || ''
})

// Mở Modal Preview tại vị trí index
const openImageModal = (index: number) => {
  zoomedIndex.value = index
  zoomScale.value = 1
  window.addEventListener('keydown', handleKeyDown)
}

// Đóng Modal Preview
const closeImageModal = () => {
  zoomedIndex.value = null
  zoomScale.value = 1
  window.removeEventListener('keydown', handleKeyDown)
}

// Điều khiển Next / Prev
const nextImage = () => {
  if (zoomedIndex.value === null) return
  zoomedIndex.value = (zoomedIndex.value + 1) % allFileList.value.length
  zoomScale.value = 1
}

const prevImage = () => {
  if (zoomedIndex.value === null) return
  zoomedIndex.value = (zoomedIndex.value - 1 + allFileList.value.length) % allFileList.value.length
  zoomScale.value = 1
}

// Điều khiển Zoom Phóng to / Thu nhỏ
const zoomIn = () => {
  if (zoomScale.value < 3) zoomScale.value += 0.25
}

const zoomOut = () => {
  if (zoomScale.value > 0.5) zoomScale.value -= 0.25
}

const resetZoom = () => {
  zoomScale.value = 1
}

// Cuộn chuột để Zoom
const handleWheel = (event: WheelEvent) => {
  if (event.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

// Lắng nghe phím tắt bàn phím (Mũi tên & Esc)
const handleKeyDown = (event: KeyboardEvent) => {
  if (zoomedIndex.value === null) return
  if (event.key === 'ArrowRight') nextImage()
  if (event.key === 'ArrowLeft') prevImage()
  if (event.key === 'Escape') closeImageModal()
}

const acceptType = computed(() => {
  switch (props.type) {
    case FILE_TYPE_IMAGE: return ACCEPTTYPE_IMG
    case FILE_TYPE_OFFICE: return ACCEPTTYPE_OFICE
    case FILE_TYPE_VIDEO: return ACCEPTTYPE_VIDEO
    default: return ACCEPTTYPE_All
  }
})

const isLimitReached = computed(() => allFileList.value.length >= props.maxFile)

onMounted(() => {
  if (props.mode !== MODE_CREATE) {
    fetchUploadedFiles()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const fetchUploadedFiles = async () => {
  const params = {
    fimFileCategory: props.category,
    fimFileOrgName: props.orgName,
    fimSectionName: props.sectionName,
    fimReferKeyId: props.referKey
  }
  await store.getListFileUpload(params)
  
  if (store.status === SUCCSESS_STATUS) {
    uploadedFiles.value = (store.fileUploadedInfoList || []).map((item: any) => ({
      id: item.id,
      fileName: item.fimFileName,
      fimOrgName: item.fimOrgName,
      url: item.urlFile,
      size: (item.size / 1024).toFixed(2),
      isUploaded: true
    }))
    updateModelValue()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return

  const selectedFiles = Array.from(target.files)

  if (allFileList.value.length + selectedFiles.length > props.maxFile) {
    Swal.fire({
      text: `Chỉ được tải lên tối đa ${props.maxFile} file!`,
      confirmButtonText: t('common.confirm')
    })
    target.value = ''
    return
  }

  for (const file of selectedFiles) {
    if (file.size > props.maxSize * 1024 * 1024) {
      Swal.fire({
        text: `${file.name} vượt quá dung lượng cho phép (${props.maxSize}MB).`,
        confirmButtonText: t('common.confirm')
      })
      continue
    }

    localFiles.value.push({
      file,
      fileName: file.name,
      fimOrgName: file.name,
      fileUrl: URL.createObjectURL(file),
      size: (file.size / 1024).toFixed(2),
      isUploaded: false
    })
  }

  target.value = ''
  updateModelValue()
}

const handleRemove = (item: any) => {
  if (item.isUploaded) {
    Swal.fire({
      text: t('common.message.deleteFile'),
      showCancelButton: true,
      confirmButtonText: t('common.delete'),
      cancelButtonText: t('common.cancel')
    }).then(async (result) => {
      if (result.isConfirmed) {
        await store.deleteFileMng(item.fileName)
        uploadedFiles.value = uploadedFiles.value.filter(f => f.fileName !== item.fileName)
        updateModelValue()
        Swal.fire({ text: t('common.message.deleteFileOk'), confirmButtonText: t('common.confirm') })
      }
    })
  } else {
    localFiles.value = localFiles.value.filter(f => f.fileUrl !== item.fileUrl)
    updateModelValue()
  }
}

const handleDownload = async (fileName: string) => {
  await store.getFileDowload({ encodedFileName: fileName })
  if (store.status === SUCCSESS_STATUS && store.fileDowload) {
    const url = window.URL.createObjectURL(new Blob([store.fileDowload], { type: store.type }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }
}

const updateModelValue = () => {
  emit('update:modelValue', allFileList.value)
}

defineExpose({
  uploadFile: async (referKeyId: number) => {
    if (localFiles.value.length === 0) return
    const formData = new FormData()
    formData.append('orgName', props.orgName)
    formData.append('category', props.category)
    formData.append('sectionName', props.sectionName)
    formData.append('referKeyId', String(referKeyId))

    localFiles.value.forEach(item => {
      formData.append('files', item.file)
    })

    await store.addfile(formData)
    if (store.status === SUCCSESS_STATUS) {
      return store.dataFileUpload
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>