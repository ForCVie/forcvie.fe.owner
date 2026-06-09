<template>
    

        <!-- ================= GLOBAL HEADER ================= -->
        <header class="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-40 shadow-sm relative">
            <div class="flex items-center gap-3 sm:gap-6">
                <!-- Mobile Sidebar Toggle -->
                <button @click.stop="mobileSidebarOpen = !mobileSidebarOpen" class="md:hidden text-gray-500 hover:text-orange-500 focus:outline-none transition-colors">
                    <i class="ph ph-list text-2xl"></i>
                </button>

                <!-- Logo -->
                <a href="#" class="text-xl sm:text-2xl font-bold flex items-center gap-1 text-gray-900 shrink-0">
                    <span class="hidden sm:inline">For</span>
                    <span class="bg-orange-500 text-white px-2 py-0.5 rounded-lg">C</span>
                    <span>VIE</span>
                    <span class="text-xs font-normal text-gray-500 ml-1 hidden sm:inline">Biz</span>
                </a>

                <div class="h-8 w-px bg-gray-200 hidden md:block"></div>

                <!-- Store Switcher -->
                <div class="relative">
                    <button @click.stop="storeMenuOpen = !storeMenuOpen" :class="{'bg-gray-50': storeMenuOpen}" class="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl transition-colors focus:outline-none">
                        <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 border border-orange-200/50">E</div>
                        <div class="text-left hidden sm:block">
                            <h2 class="text-sm font-bold text-gray-900 leading-tight">El Gaucho - Hai Bà Trưng</h2>
                            <p class="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">Chi nhánh hiện tại</p>
                        </div>
                        <i class="ph ph-caret-down text-gray-400 text-sm ml-1 transition-transform" :class="{'rotate-180 text-orange-500': storeMenuOpen}"></i>
                    </button>

                    <!-- Dropdown Store -->
                    <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <div v-show="storeMenuOpen" class="absolute top-full mt-2 left-0 w-64 sm:w-72 bg-white border border-gray-200 shadow-xl rounded-xl py-2 flex flex-col z-50 origin-top-left">
                            <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chi nhánh của bạn</div>
                            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors bg-orange-50/50 relative">
                                <div class="w-8 h-8 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">E</div>
                                <div class="flex-1 min-w-0">
                                    <span class="text-sm font-medium text-orange-700 block truncate">El Gaucho - Hai Bà Trưng</span>
                                    <span class="text-[10px] text-orange-500">Đang chọn</span>
                                </div>
                                <i class="ph-fill ph-check-circle text-orange-500 absolute right-4"></i>
                            </a>
                            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                                <div class="w-8 h-8 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">T</div>
                                <div class="flex-1 min-w-0">
                                    <span class="text-sm font-medium text-gray-700 block truncate">El Gaucho - Thảo Điền</span>
                                </div>
                            </a>
                            <div class="border-t border-gray-100 mt-2 pt-2">
                                <a href="admin-stores.html" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                                    <i class="ph ph-storefront text-lg"></i> Xem tất cả chi nhánh
                                </a>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- PHẢI: User Profile -->
            <div class="flex items-center gap-2 sm:gap-4">
                <div class="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <i class="ph-fill ph-clock text-gray-400"></i>
                    <span class="text-xs font-medium text-gray-600">Ca làm: Sáng (08:00 - 15:00)</span>
                </div>

                <div class="relative sm:ml-2 sm:pl-4 sm:border-l border-gray-200">
                    <button @click.stop="profileMenuOpen = !profileMenuOpen" class="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-200 shadow-sm">
                        <div class="hidden md:block text-left">
                            <p class="text-sm font-bold text-gray-900 leading-tight">Admin User</p>
                            <p class="text-[10px] text-gray-500 font-medium uppercase mt-0.5">Quản lý</p>
                        </div>
                        <i class="ph ph-caret-down text-gray-400 text-sm hidden md:block"></i>
                    </button>

                    <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <div v-show="profileMenuOpen" class="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-200 shadow-xl rounded-xl py-2 flex flex-col z-50 origin-top-right">
                            <div class="px-4 py-3 border-b border-gray-100 md:hidden">
                                <p class="text-sm font-bold text-gray-900">Admin User</p>
                                <p class="text-xs text-gray-500">admin@forcvie.vn</p>
                            </div>
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors">
                                <i class="ph ph-user-circle text-lg"></i> Thông tin cá nhân
                            </a>
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors">
                                <i class="ph ph-gear text-lg"></i> Cài đặt tài khoản
                            </a>
                            <div class="border-t border-gray-100 my-1"></div>
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                                <i class="ph ph-sign-out text-lg"></i> Đăng xuất
                            </a>
                        </div>
                    </Transition>
                </div>
            </div>
        </header>
</template>

<script setup>

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

<style>
</style>
