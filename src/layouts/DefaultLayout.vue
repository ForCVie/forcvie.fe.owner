<template>
  <!-- <Loading /> -->
  <div class="bg-[#f4f7f9] text-gray-800 font-sans antialiased flex flex-col h-screen overflow-hidden">
    <!-- header -->
    <THeader />

    <!-- ================= KHU VỰC DƯỚI (SIDEBAR + MAIN CONTENT) ================= -->
    <div class="flex-1 flex overflow-hidden relative">
        
        <!-- SIDEBAR OVERLAY (Mobile) -->
        <div id="sidebarOverlay" onclick="toggleSidebar()" class="fixed inset-0 bg-gray-900/50 z-40 hidden md:hidden backdrop-blur-sm transition-opacity"></div>

        <!-- SPACER (Giữ không gian tĩnh 80px cho Mini Sidebar trên Desktop để content không bị trượt) -->
        <div class="hidden md:block w-[80px] shrink-0"></div>

        <!-- COLLAPSIBLE SIDEBAR (Mini Sidebar on Desktop) -->
        <!-- Đã chuyển từ md:static sang md:absolute để menu nổi (overlay) lên trên content -->
        <aside id="mainSidebar" class="fixed md:absolute inset-y-0 left-0 bg-white border-r border-gray-200 flex flex-col z-50 md:z-30 transform -translate-x-full md:translate-x-0 transition-[width,transform] duration-300 ease-in-out shrink-0 shadow-2xl md:shadow-[4px_0_24px_rgba(0,0,0,0.05)] w-64 md:w-[80px] md:hover:w-64 group/sidebar overflow-x-hidden overflow-y-auto h-full">
            
            <div class="flex items-center justify-between px-6 py-4 md:hidden border-b border-gray-100 bg-gray-50 shrink-0">
                <span class="font-bold text-gray-900">Menu Hệ thống</span>
                <button onclick="toggleSidebar()" class="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:text-orange-500"><i class="ph ph-x"></i></button>
            </div>

            <nav class="flex-1 py-4 overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
                
                <!-- Nhóm 1 -->
                <div class="relative h-8 mt-2 mb-1">
                    <div class="min-h-[58px] absolute inset-0 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap flex items-center">
                        Quản trị Chi nhánh
                    </div>
                    <!-- Đường kẻ phân cách chỉ hiện khi thu gọn -->
                    <div class="hidden md:flex absolute inset-0 items-center justify-center opacity-100 group-hover/sidebar:opacity-0 transition-opacity duration-300">
                        <div class="w-8 h-px bg-gray-200"></div>
                    </div>
                </div>

                <a href="#" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph ph-squares-four text-xl text-gray-400"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Tổng quan</span>
                </a>
                
                <a href="admin-orders.html" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph ph-calculator text-xl text-gray-400"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Máy POS (Gọi món)</span>
                </a>
                
                <!-- Icon có Badge thông báo -->
                <a href="admin-orders.html" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0 relative">
                        <i class="ph ph-calendar-check text-xl text-gray-400"></i>
                        <!-- Dấu chấm thông báo khi Sidebar thu gọn -->
                        <span class="hidden md:block group-hover/sidebar:hidden absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Danh sách Đặt chỗ</span>
                    <span class="absolute right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">3</span>
                </a>
                
                <a href="admin-menu.html" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph ph-fork-knife text-xl text-gray-400"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Quản lý Thực đơn</span>
                </a>
                
                <a href="admin-tables.html" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph ph-armchair text-xl text-gray-400"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Bàn & Sơ đồ</span>
                </a>
                
                <!-- ACTIVE MENU: NHÂN SỰ -->
                <a href="#" class="min-h-[58px] flex items-center px-3 py-3 bg-orange-50 text-orange-600 rounded-xl font-medium transition-colors mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph-fill ph-users text-xl"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Quản lý Nhân sự</span>
                </a>
                
                <a href="#" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph ph-chart-line-up text-xl text-gray-400"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Báo cáo doanh thu</span>
                </a>

                <!-- Nhóm 2 -->
                <div class="my-2 mx-6">
                    <div class="h-px bg-gray-100 w-full opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div class="relative h-8 mt-1 mb-1">
                    <div class="min-h-[58px] absolute inset-0 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap flex items-center">
                        Hệ thống
                    </div>
                    <div class="hidden md:flex absolute inset-0 items-center justify-center opacity-100 group-hover/sidebar:opacity-0 transition-opacity duration-300">
                        <div class="w-8 h-px bg-gray-200"></div>
                    </div>
                </div>

                <a href="admin-stores.html" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph ph-storefront text-xl text-gray-400"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Danh sách Cửa hàng</span>
                </a>
                <a href="#" class="min-h-[58px] flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium mx-2 whitespace-nowrap overflow-hidden relative group/link">
                    <div class="flex items-center justify-center w-8 shrink-0"><i class="ph ph-gear text-xl text-gray-400"></i></div>
                    <span class="ml-3 opacity-100 md:opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">Cài đặt chung</span>
                </a>
            </nav>
        </aside>

        
        <!-- MAIN CONTENT -->
        <div class="flex-1 flex flex-col h-full overflow-y-auto relative w-full bg-[#f4f7f9]">
          <router-view v-slot="{ Component, route }">
            <transition
              :enter-active-class="`animate__faster animate__animated animate__fadeInRight`"
              :leave-active-class="`animate__faster animate__animated animate__fadeOutLeft`"
              mode="out-in"
            >
              <div :key="route.name">
                <component :is="Component"></component>
              </div>
            </transition>
          </router-view>
        </div>
    </div>
    <!-- footer -->
    <!-- <TFooter /> -->
  </div>
  <LoadingComponent v-if="store.loading"></LoadingComponent>
</template>

<script setup lang="ts">
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import LoadingComponent from "@/components/common/loading/LoaddingComponent.vue";
import { commonStore } from "@/stores/common";
import CommonService from "@/service/common/CommonService";

const store = commonStore();

                // --- Trạng thái UI (UI State) ---
                const mobileSidebarOpen = ref(false);
                const storeMenuOpen = ref(false);
                const profileMenuOpen = ref(false);
                const currentTab = ref('employees');
                
                // --- Trạng thái Bộ lọc (Filter State) ---
                const filterKeyword = ref('');
                const filterRole = ref('all');
                
                // --- Trạng thái Modals ---
                const isModalOpen = ref(false);
                const isDeleteModalOpen = ref(false);
                const modalMode = ref('add');
                
                // --- Dữ liệu Mẫu (Mock Data) ---
                const employees = ref([
                    { id: 1, code: 'NV001', name: 'Nguyễn Văn Tuấn', role: 'Quản lý', phone: '0901.234.567', email: 'tuan.nv@forcvie.vn', status: true, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', shift: 'Sáng', checkIn: '07:55', checkOut: '' },
                    { id: 2, code: 'NV002', name: 'Trần Thị Mai', role: 'Thu ngân', phone: '0987.654.321', email: 'mai.tt@forcvie.vn', status: true, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', shift: 'Sáng', checkIn: '08:05', checkOut: '15:10' },
                    { id: 3, code: 'NV003', name: 'Lê Tuấn Anh', role: 'Phục vụ', phone: '0912.345.678', email: 'anh.lt@forcvie.vn', status: true, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', shift: 'Chiều', checkIn: '14:50', checkOut: '' },
                    { id: 4, code: 'NV004', name: 'Phạm Minh Bếp', role: 'Đầu bếp', phone: '0933.111.222', email: 'bep.pm@forcvie.vn', status: true, img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop', shift: 'Full', checkIn: '07:30', checkOut: '' },
                    { id: 5, code: 'NV005', name: 'Vũ Hoàng Nam', role: 'Phục vụ', phone: '0909.888.999', email: 'nam.vh@forcvie.vn', status: false, img: 'https://ui-avatars.com/api/?name=Vu+Nam&background=f3f4f6&color=6b7280', shift: 'OFF', checkIn: '', checkOut: '' }
                ]);
                
                const mockSchedule = ref([
                    { empId: 1, mon: 'S', tue: 'S', wed: 'S', thu: 'O', fri: 'S', sat: 'S', sun: 'S' },
                    { empId: 2, mon: 'C', tue: 'C', wed: 'C', thu: 'C', fri: 'C', sat: 'O', sun: 'C' },
                    { empId: 3, mon: 'O', tue: 'S', wed: 'C', thu: 'S', fri: 'C', sat: 'F', sun: 'F' },
                    { empId: 4, mon: 'F', tue: 'F', wed: 'O', thu: 'F', fri: 'F', sat: 'F', sun: 'F' },
                    { empId: 5, mon: 'S', tue: 'O', wed: 'S', thu: 'C', fri: 'O', sat: 'S', sun: 'C' }
                ]);

                // --- Cấu hình Giao diện (Configs) ---
                const roleConfig = {
                    'Quản lý': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: 'ph-shield-star' },
                    'Thu ngân': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'ph-calculator' },
                    'Phục vụ': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'ph-tray' },
                    'Đầu bếp': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: 'ph-cooking-pot' }
                };

                const shiftConfig = {
                    'S': { label: 'Sáng', class: 'bg-blue-50 text-blue-700 border-blue-200' },
                    'C': { label: 'Chiều', class: 'bg-orange-50 text-orange-700 border-orange-200' },
                    'F': { label: 'Full', class: 'bg-purple-50 text-purple-700 border-purple-200' },
                    'O': { label: 'OFF', class: 'bg-gray-50 text-gray-400 border-gray-200' }
                };

                // --- Form State ---
                const editingEmployee = ref({ id: null, code: '', name: '', role: 'Phục vụ', phone: '', email: '', status: true, img: '' });
                const deletingEmployee = ref({ id: null, name: '' });

                // --- Thuộc tính Tính toán (Computed) ---
                const filteredEmployees = computed(() => {
                    let result = employees.value;
                    if (filterRole.value !== 'all') {
                        result = result.filter(e => e.role === filterRole.value);
                    }
                    if (filterKeyword.value.trim() !== '') {
                        const kw = filterKeyword.value.toLowerCase();
                        result = result.filter(e => 
                            e.name.toLowerCase().includes(kw) || 
                            e.phone.includes(kw) || 
                            e.code.toLowerCase().includes(kw)
                        );
                    }
                    return result;
                });

                // --- Watchers ---
                watch(() => editingEmployee.value.name, (newVal) => {
                    if (modalMode.value === 'add') {
                        if (newVal) {
                            editingEmployee.value.img = `https://ui-avatars.com/api/?name=${encodeURIComponent(newVal)}&background=f3f4f6&color=6b7280`;
                        } else {
                            editingEmployee.value.img = `https://ui-avatars.com/api/?name=New+User&background=f3f4f6&color=6b7280`;
                        }
                    }
                });

                // --- Phương thức (Methods) ---
                const closeAllDropdowns = () => {
                    storeMenuOpen.value = false;
                    profileMenuOpen.value = false;
                };

                const getRoleConfig = (role) => {
                    return roleConfig[role] || roleConfig['Phục vụ'];
                };

                const getShiftDisplay = (shift) => {
                    if(shift === 'Sáng') return 'Ca Sáng (08:00 - 15:00)';
                    if(shift === 'Chiều') return 'Ca Chiều (15:00 - 22:00)';
                    if(shift === 'Full') return 'Full time (08:00 - 22:00)';
                    return 'Hôm nay nghỉ (OFF)';
                };

                const getSchedule = (empId) => {
                    return mockSchedule.value.find(s => s.empId === empId) || { mon:'O', tue:'O', wed:'O', thu:'O', fri:'O', sat:'O', sun:'O' };
                };

                const getShiftConfig = (shiftVal) => {
                    return shiftConfig[shiftVal] || shiftConfig['O'];
                };

                const openEmployeeModal = (mode, emp = null) => {
                    modalMode.value = mode;
                    if (mode === 'add') {
                        editingEmployee.value = {
                            id: null,
                            code: 'NV' + Math.floor(Math.random() * 900 + 100),
                            name: '',
                            role: 'Phục vụ',
                            phone: '',
                            email: '',
                            status: true,
                            img: 'https://ui-avatars.com/api/?name=New+User&background=f3f4f6&color=6b7280'
                        };
                    } else if (mode === 'edit' && emp) {
                        editingEmployee.value = { ...emp };
                    }
                    isModalOpen.value = true;
                };

                const saveEmployee = () => {
                    if (!editingEmployee.value.name || !editingEmployee.value.phone) return;

                    if (modalMode.value === 'add') {
                        const newId = employees.value.length > 0 ? Math.max(...employees.value.map(e => e.id)) + 1 : 1;
                        employees.value.unshift({ 
                            ...editingEmployee.value, 
                            id: newId, 
                            shift: 'OFF', 
                            checkIn: '', 
                            checkOut: '' 
                        });
                        mockSchedule.value.push({ empId: newId, mon: 'O', tue: 'O', wed: 'O', thu: 'O', fri: 'O', sat: 'O', sun: 'O' });
                    } else {
                        const index = employees.value.findIndex(e => e.id === editingEmployee.value.id);
                        if (index !== -1) {
                            employees.value[index] = { ...employees.value[index], ...editingEmployee.value };
                        }
                    }
                    isModalOpen.value = false;
                };

                const openDeleteModal = (emp) => {
                    deletingEmployee.value = { id: emp.id, name: emp.name };
                    isDeleteModalOpen.value = true;
                };

                const confirmDelete = () => {
                    employees.value = employees.value.filter(e => e.id !== deletingEmployee.value.id);
                    isDeleteModalOpen.value = false;
                };
</script>

<style scoped>
.nav-tree {
  list-style: none;
  padding-left: 20px;
}
.nav-tree details {
  margin-bottom: 5px;
}
.nav-tree summary {
  cursor: pointer;
  font-weight: bold;
}
.nav-tree ul {
  list-style: none;
  padding-left: 20px;
}
</style>
