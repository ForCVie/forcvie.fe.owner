<template>
  <section id="content" class="flex-1 flex flex-col h-screen overflow-hidden" tabindex="0">
      <!-- Content Area -->
      <main class="flex-1 overflow-hidden flex flex-col p-8 bg-[#f4f7f9]">
        <!-- HEADER & TOOLBAR -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Quản lý Bàn & Sơ đồ</h2>
              <p class="text-sm text-gray-500 mt-1">Thiết lập danh sách, cấu trúc phòng và vị trí không gian.</p>
            </div>
        </div>
        
        <!-- Zones Navigation & Actions -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <!-- Zone Tabs -->
          <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            <button 
              @click="setActiveZone('all')" 
              class="px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border"
              :class="activeZoneId === 'all' ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'"
            >
              Tất cả khu vực
            </button>
            <button 
              v-for="zone in zones" :key="zone.id"
              @click="setActiveZone(zone.id)" 
              class="px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border"
              :class="activeZoneId === zone.id ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-500 hover:text-orange-600'"
            >
              {{ zone.name }}
            </button>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 shrink-0">
            <!-- View Toggle -->
            <div class="bg-white border border-gray-200 p-1 rounded-xl flex mr-2">
              <button 
                @click="switchView('list')" 
                class="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                :class="currentView === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-800'"
              >
                <i class="ph ph-list-dashes"></i> Danh sách
              </button>
              <button 
                @click="switchView('map')" 
                class="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                :class="currentView === 'map' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-800'"
              >
                <i class="ph ph-map-trifold"></i> Sơ đồ Vị trí
              </button>
            </div>

            <button @click="isZoneModalOpen = true" class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
              <i class="ph ph-squares-four text-lg"></i> Quản lý Khu vực
            </button>
            <button @click="openTableModal('add')" class="bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/30 flex items-center gap-2">
              <i class="ph ph-plus font-bold"></i> Thêm Bàn / Vật thể
            </button>
          </div>
        </div>

        <!-- View 1: Table List Grid -->
        <div v-show="currentView === 'list'" class="flex-1 overflow-y-auto">
          <div v-if="filteredTables.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="table in filteredTables" :key="table.id" class="bg-white rounded-2xl p-5 border border-gray-200 hover:border-orange-300 transition-all relative group flex flex-col h-full shadow-sm">
              <!-- Action Menu -->
              <div class="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button @click="openTableModal('edit', table)" class="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm flex items-center justify-center transition-colors">
                  <i class="ph ph-pencil-simple"></i>
                </button>
                <button @click="initDelete('table', table)" class="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 shadow-sm flex items-center justify-center transition-colors">
                  <i class="ph ph-trash"></i>
                </button>
              </div>

              <!-- Badge Loại -->
              <div class="inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold mb-3 border" :class="getTypeConfig(table.type).color">
                <i :class="getTypeConfig(table.type).icon"></i> {{ getTypeConfig(table.type).label }}
              </div>

              <!-- Header & Desc -->
              <div class="mb-4 pr-16">
                <h3 class="text-xl font-bold text-gray-900">{{ table.name }}</h3>
                <p v-if="table.desc" class="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  <i class="ph ph-info mr-0.5"></i> {{ table.desc }}
                </p>
              </div>
              
              <!-- Footer Info -->
              <div class="flex items-center gap-3 text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                <span v-if="getTypeConfig(table.type).isStruct" class="flex items-center gap-1 text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">
                  <i class="ph ph-bounding-box text-gray-400"></i> Cấu trúc phòng
                </span>
                <span v-else class="flex items-center gap-1 text-gray-700 font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded">
                  <i class="ph-fill ph-users text-orange-500"></i> {{ table.capacity }} ghế
                </span>
                <span class="truncate"><i class="ph ph-map-pin text-gray-400"></i> {{ getZoneName(table.zoneId) }}</span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center text-gray-400 mt-20">
            <i class="ph ph-armchair text-6xl mb-4 text-gray-300"></i>
            <h3 class="text-xl font-bold text-gray-700 mb-1">Chưa có bàn nào</h3>
            <p class="text-sm mb-6">Khu vực này hiện chưa có dữ liệu bàn.</p>
            <button @click="openTableModal('add')" class="bg-orange-50 text-orange-600 px-5 py-2 rounded-xl font-medium hover:bg-orange-100 transition-colors flex items-center gap-2">
              <i class="ph ph-plus"></i> Thêm bàn đầu tiên
            </button>
          </div>
        </div>

        <!-- View 2: Floor Plan (Map) -->
        <div v-show="currentView === 'map'" class="flex-1 flex flex-col overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm relative">
          <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <i class="ph ph-hand-grabbing text-lg"></i> Kéo thả bàn/cửa sổ để phác thảo sơ đồ cho <b class="text-gray-900">{{ currentZoneName }}</b>
            </div>
            <button @click="saveFloorPlan" class="text-sm font-medium bg-orange-100 text-orange-700 px-4 py-1.5 rounded-lg hover:bg-orange-200 transition-colors">
              Lưu vị trí
            </button>
          </div>
          
          <div class="flex-1 overflow-auto relative">
            <div class="floor-plan-grid w-full min-h-full min-w-[1000px] absolute inset-0">
              <!-- Draggable Tables -->
              <div 
                v-for="table in filteredTables" :key="table.id"
                class="table-node"
                :class="[getTypeConfig(table.type).color, getTypeConfig(table.type).shapeClass, { 'dragging-active': draggingTable?.id === table.id }]"
                :style="getTableStyle(table)"
                @mousedown="startDrag($event, table)"
                @touchstart.prevent="startDrag($event, table)"
              >
                <!-- Dành cho Cấu trúc -->
                <div v-if="getTypeConfig(table.type).isStruct" class="font-bold pointer-events-none text-center leading-tight text-xs">
                  {{ table.name }}
                </div>
                <!-- Dành cho Bàn -->
                <template v-else>
                  <div class="font-bold pointer-events-none text-center leading-tight">{{ table.name }}</div>
                  <div class="text-[10px] opacity-70 flex items-center gap-0.5 mt-1 pointer-events-none">
                    <i class="ph-fill ph-users"></i> {{ table.capacity }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

      </main>
  </section>

    <!-- ================= MODALS ================= -->
    <transition name="fade">
      <div v-if="isZoneModalOpen" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col" @click.stop>
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-xl font-bold text-gray-900">Quản lý Khu vực / Tầng</h3>
            <button @click="isZoneModalOpen = false" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <i class="ph ph-x text-lg"></i>
            </button>
          </div>
          <div class="p-6">
            <div class="flex gap-2 mb-6">
              <input v-model="newZoneName" @keyup.enter="addZone" type="text" placeholder="Tên khu vực mới (VD: Tầng 3)" class="flex-1 border border-gray-200 rounded-xl py-2.5 px-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all">
              <button @click="addZone" class="bg-gray-900 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors shrink-0">
                Thêm
              </button>
            </div>
            
            <div class="space-y-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              <div v-for="zone in zones" :key="zone.id" class="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div>
                  <p class="font-medium text-gray-900 text-sm">{{ zone.name }}</p>
                  <p class="text-xs text-gray-500">{{ countTablesInZone(zone.id) }} thực thể</p>
                </div>
                <button @click="initDelete('zone', zone)" class="w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <i class="ph ph-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Thêm/Sửa Bàn -->
    <transition name="fade">
      <div v-if="isTableModalOpen" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-xl font-bold text-gray-900">{{ formMode === 'add' ? 'Thêm Bàn / Vật thể mới' : 'Chỉnh sửa Thông tin' }}</h3>
            <button @click="isTableModalOpen = false" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <i class="ph ph-x text-lg"></i>
            </button>
          </div>
          <div class="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
            <form @submit.prevent="saveTable" class="space-y-5">
              <div class="grid grid-cols-2 gap-5">
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Loại (Hình dáng / Cấu trúc)</label>
                  <select v-model="formData.type" class="w-full border border-gray-200 rounded-xl py-2.5 px-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm bg-white">
                    <optgroup label="Bàn phục vụ khách">
                      <option value="square">Bàn Vuông / Chữ nhật</option>
                      <option value="round">Bàn Tròn</option>
                      <option value="vip">Bàn VIP</option>
                      <option value="sofa">Bàn Sofa</option>
                      <option value="outdoor">Ngoài trời</option>
                    </optgroup>
                    <optgroup label="Cấu trúc / Không gian">
                      <option value="reception">Quầy Lễ Tân / Thu ngân</option>
                      <option value="stairs">Cầu Thang</option>
                      <option value="window">Cửa Sổ / View</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tên định danh <span class="text-red-500">*</span></label>
                  <input v-model="formData.name" type="text" required placeholder="VD: T1-01 hoặc View Hồ" class="w-full border border-gray-200 rounded-xl py-2.5 px-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Thuộc khu vực <span class="text-red-500">*</span></label>
                  <select v-model="formData.zoneId" class="w-full border border-gray-200 rounded-xl py-2.5 px-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm bg-white">
                    <option v-for="z in zones" :key="z.id" :value="z.id">{{ z.name }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả vị trí</label>
                <textarea v-model="formData.desc" rows="2" placeholder="Giới thiệu cho khách..." class="w-full border border-gray-200 rounded-xl py-3 px-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm resize-none"></textarea>
              </div>

              <div :class="{'opacity-40 pointer-events-none': isCurrentTypeStruct}" class="transition-opacity duration-300">
                <label class="block text-sm font-medium text-gray-700 mb-2">Số ghế (Sức chứa) <span class="text-red-500">*</span></label>
                <div class="relative w-1/2">
                  <i class="ph ph-users absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input v-model.number="formData.capacity" type="number" min="0" max="50" class="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm">
                </div>
              </div>
            </form>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
            <button @click="isTableModalOpen = false" class="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Hủy
            </button>
            <button @click="saveTable" class="px-5 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/30 flex items-center gap-2">
              <i class="ph ph-floppy-disk text-lg"></i> Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Xóa -->
    <transition name="fade">
      <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden p-6 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="ph ph-warning-circle text-4xl text-red-500"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Xác nhận xóa?</h3>
          <p class="text-gray-500 text-sm mb-6">Bạn có chắc chắn muốn xóa <strong class="text-gray-800">{{ deleteTarget.item?.name }}</strong>? Dữ liệu không thể hoàn tác.</p>
          
          <div class="flex gap-3 justify-center">
            <button @click="isDeleteModalOpen = false" class="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Hủy
            </button>
            <button @click="confirmDelete" class="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors shadow-sm shadow-red-500/30">
              Xóa ngay
            </button>
          </div>
        </div>
      </div>
    </transition>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';

// --- MOCK DATA ---
const zones = ref([
  { id: 1, name: 'Tầng 1 - Sảnh chính' },
  { id: 2, name: 'Tầng 2 - Ban công' },
  { id: 3, name: 'Phòng VIP' }
]);

const tables = ref([
  { id: 1, name: 'Cửa Sổ Lớn', zoneId: 1, capacity: 0, type: 'window', desc: 'View hướng ra công viên', x: 20, y: 20 },
  { id: 2, name: 'Quầy Lễ Tân', zoneId: 1, capacity: 0, type: 'reception', desc: 'Đón khách & Thanh toán', x: 300, y: 350 },
  { id: 3, name: 'T1-01', zoneId: 1, capacity: 4, type: 'square', desc: 'Gần cửa sổ, ánh sáng tốt', x: 60, y: 80 },
  { id: 4, name: 'T1-02', zoneId: 1, capacity: 2, type: 'round', desc: 'Bàn tròn lãng mạn cho cặp đôi', x: 200, y: 80 },
  { id: 5, name: 'T1-03', zoneId: 1, capacity: 6, type: 'sofa', desc: 'Sofa êm ái, thích hợp gia đình', x: 60, y: 200 },
  { id: 6, name: 'B2-01', zoneId: 2, capacity: 2, type: 'outdoor', desc: 'Ban công thoáng gió', x: 50, y: 50 },
  { id: 7, name: 'Cầu Thang lên T3', zoneId: 2, capacity: 0, type: 'stairs', desc: '', x: 350, y: 50 },
  { id: 8, name: 'VIP-Ruby', zoneId: 3, capacity: 12, type: 'vip', desc: 'Phòng cách âm', x: 100, y: 100 }
]);

const typeConfig = {
  square:    { label: 'Bàn Vuông', color: 'bg-white text-gray-700 border-gray-300', icon: 'ph-square', shapeClass: 'rounded-xl', isStruct: false },
  round:     { label: 'Bàn Tròn', color: 'bg-white text-gray-700 border-gray-300', icon: 'ph-circle', shapeClass: 'rounded-full', isStruct: false },
  vip:       { label: 'Bàn VIP', color: 'bg-yellow-50 text-yellow-700 border-yellow-400', icon: 'ph-fill ph-star', shapeClass: 'rounded-xl', isStruct: false },
  sofa:      { label: 'Sofa', color: 'bg-purple-50 text-purple-700 border-purple-300', icon: 'ph-couch', shapeClass: 'rounded-xl', isStruct: false },
  outdoor:   { label: 'Ngoài trời', color: 'bg-green-50 text-green-700 border-green-400', icon: 'ph-tree', shapeClass: 'rounded-xl', isStruct: false },
  reception: { label: 'Lễ Tân', color: 'bg-reception border-[#0f172a] text-[#f8fafc]', icon: 'ph-desk', shapeClass: 'rounded-md', isStruct: true },
  stairs:    { label: 'Cầu Thang', color: 'bg-stairs border-[#a8a29e] text-[#44403c]', icon: 'ph-steps', shapeClass: 'rounded-sm', isStruct: true },
  window:    { label: 'Cửa Sổ', color: 'bg-window border-[#7dd3fc] text-[#0284c7]', icon: 'ph-windows-logo', shapeClass: 'rounded-md', isStruct: true }
};

// --- STATE ---
const activeZoneId = ref(1);
const currentView = ref('list'); // 'list' | 'map'
const newZoneName = ref('');

// Modal States
const isZoneModalOpen = ref(false);
const isTableModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const formMode = ref('add');
const formData = reactive({ id: null, name: '', zoneId: 1, capacity: 4, type: 'square', desc: '' });
const deleteTarget = reactive({ type: null, item: null });

// --- COMPUTED ---
const filteredTables = computed(() => {
  if (activeZoneId.value === 'all') return tables.value;
  return tables.value.filter(t => t.zoneId === activeZoneId.value);
});

const currentZoneName = computed(() => {
  if (activeZoneId.value === 'all') return 'Tất cả';
  return zones.value.find(z => z.id === activeZoneId.value)?.name || '';
});

const isCurrentTypeStruct = computed(() => {
  return getTypeConfig(formData.type).isStruct;
});

// Watch Type thay đổi để reset/ẩn capacity
watch(() => formData.type, (newType) => {
  if (getTypeConfig(newType).isStruct) {
    formData.capacity = 0;
  } else if (formData.capacity === 0) {
    formData.capacity = 4;
  }
});

// --- METHODS ---
const switchView = (view) => {
  currentView.value = view;
  if (view === 'map' && activeZoneId.value === 'all') {
    activeZoneId.value = zones.value[0]?.id || 'all';
  }
};

const setActiveZone = (id) => {
  if (id === 'all' && currentView.value === 'map') {
    alert("Sơ đồ chỉ hỗ trợ thiết lập cho từng khu vực cụ thể!");
    return;
  }
  activeZoneId.value = id;
};

const getTypeConfig = (type) => typeConfig[type] || typeConfig['square'];
const getZoneName = (id) => zones.value.find(z => z.id === id)?.name || 'Không xác định';
const countTablesInZone = (id) => tables.value.filter(t => t.zoneId === id).length;

// Form Bàn
const openTableModal = (mode, table = null) => {
  formMode.value = mode;
  if (mode === 'add') {
    Object.assign(formData, { id: null, name: '', capacity: 4, type: 'square', desc: '' });
    formData.zoneId = activeZoneId.value !== 'all' ? activeZoneId.value : (zones.value[0]?.id || 1);
  } else {
    Object.assign(formData, { ...table });
  }
  isTableModalOpen.value = true;
};

const saveTable = () => {
  if (!formData.name.trim()) return alert("Vui lòng nhập tên");
  
  if (formMode.value === 'add') {
    const newId = tables.value.length ? Math.max(...tables.value.map(t => t.id)) + 1 : 1;
    tables.value.push({ ...formData, id: newId, x: 20, y: 20 });
  } else {
    const idx = tables.value.findIndex(t => t.id === formData.id);
    if (idx !== -1) {
      const { x, y } = tables.value[idx]; // Giữ nguyên tọa độ
      tables.value[idx] = { ...formData, x, y };
    }
  }
  isTableModalOpen.value = false;
};

// Khu vực
const addZone = () => {
  if (!newZoneName.value.trim()) return;
  const newId = zones.value.length ? Math.max(...zones.value.map(z => z.id)) + 1 : 1;
  zones.value.push({ id: newId, name: newZoneName.value.trim() });
  newZoneName.value = '';
};

// Xóa
const initDelete = (type, item) => {
  deleteTarget.type = type;
  deleteTarget.item = item;
  isDeleteModalOpen.value = true;
};

const confirmDelete = () => {
  if (deleteTarget.type === 'table') {
    tables.value = tables.value.filter(t => t.id !== deleteTarget.item.id);
  } else if (deleteTarget.type === 'zone') {
    if (countTablesInZone(deleteTarget.item.id) > 0) {
      alert("Không thể xóa khu vực đang chứa bàn! Hãy dọn dẹp trước.");
      isDeleteModalOpen.value = false;
      return;
    }
    zones.value = zones.value.filter(z => z.id !== deleteTarget.item.id);
    if (activeZoneId.value === deleteTarget.item.id) {
      activeZoneId.value = zones.value[0]?.id || 'all';
    }
  }
  isDeleteModalOpen.value = false;
};

const saveFloorPlan = () => alert("Đã lưu thành công tọa độ sơ đồ phòng!");

// --- KÉO THẢ SƠ ĐỒ (DRAG & DROP) ---
const draggingTable = ref(null);
const dragOffset = reactive({ x: 0, y: 0 });

const getTableStyle = (table) => {
  let width = 80, height = 80;
  if (table.type === 'window') { width = 160; height = 16; }
  else if (table.type === 'reception') { width = 120; height = 60; }
  else if (table.type === 'stairs') { width = 80; height = 100; }
  else {
    if (table.capacity >= 6) { width = 120; height = 80; }
    else if (table.capacity <= 2) { width = 60; height = 60; }
    if (table.type === 'round') { width = Math.max(width, height); height = width; }
  }

  return {
    width: `${width}px`,
    height: `${height}px`,
    left: `${table.x}px`,
    top: `${table.y}px`,
    zIndex: draggingTable.value?.id === table.id ? 50 : 1
  };
};

const startDrag = (e, table) => {
  draggingTable.value = table;
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
  
  dragOffset.x = clientX - table.x;
  dragOffset.y = clientY - table.y;
};

const onDrag = (e) => {
  if (!draggingTable.value) return;
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

  let newX = clientX - dragOffset.x;
  let newY = clientY - dragOffset.y;
  
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;

  draggingTable.value.x = Math.round(newX);
  draggingTable.value.y = Math.round(newY);
};

const endDrag = () => {
  if (draggingTable.value) draggingTable.value = null;
};

// Đăng ký event chuột lên window để không bị tuột khi kéo nhanh
onMounted(() => {
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchmove', onDrag, { passive: false });
  window.addEventListener('touchend', endDrag);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', endDrag);
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Vue Fade Transition cho Modals */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-active > div, .fade-leave-active > div { transition: transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-from > div, .fade-leave-to > div { transform: scale(0.95); }

/* Sơ đồ bàn (Floor Plan Grid pattern) */
.floor-plan-grid {
  background-color: #f8fafc;
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Bàn & Cấu trúc trên sơ đồ */
.table-node {
  position: absolute;
  cursor: grab;
  transition: box-shadow 0.2s; /* Bỏ transition transform để kéo mượt hơn */
  user-select: none;
  touch-action: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.dragging-active {
  cursor: grabbing;
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Các style đặc biệt cho cấu trúc */
.bg-stairs {
  background-image: repeating-linear-gradient(45deg, #e7e5e4, #e7e5e4 10px, #d6d3d1 10px, #d6d3d1 20px);
}
.bg-window {
  background-color: #e0f2fe;
  box-shadow: inset 0 0 15px rgba(255,255,255,0.7) !important;
}
.bg-reception {
  background-color: #1e293b;
}
</style>