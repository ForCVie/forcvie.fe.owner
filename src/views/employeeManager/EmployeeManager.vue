<template>
  <section id="content" class="flex-1 flex flex-col h-screen overflow-hidden" tabindex="0">
            <!-- Điều hướng Sub-tabs Nghiệp vụ Nhân sự -->
            <div class="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm overflow-x-auto hide-scrollbar">
                <div class="flex gap-2 bg-gray-100 p-1 rounded-xl">
                    <button onclick="switchMainTab('employees')" id="tabBtnEmp" class="px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold bg-white text-gray-900 shadow-sm transition-all flex items-center gap-2 whitespace-nowrap">
                        <i class="ph-fill ph-users text-lg"></i> Danh sách Nhân viên
                    </button>
                    <button onclick="switchMainTab('schedule')" id="tabBtnSchedule" class="px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 transition-all flex items-center gap-2 whitespace-nowrap">
                        <i class="ph ph-calendar-blank text-lg"></i> Lịch làm việc
                    </button>
                </div>
            </div>

            <!-- ================= TAB 1: DANH SÁCH NHÂN SỰ ================= -->
            <main id="viewEmployees" class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
                
                <!-- HEADER & TOOLBAR -->
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Danh sách Nhân sự</h2>
                        <p class="text-xs sm:text-sm text-gray-500 mt-1">Quản lý thông tin, phân quyền và trạng thái làm việc của nhân viên tại chi nhánh.</p>
                    </div>
                    <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <!-- Lọc theo chức vụ -->
                        <div class="relative flex-1 sm:flex-none">
                            <select id="roleFilter" onchange="filterEmployees()" class="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium outline-none focus:border-orange-500 w-full sm:w-48 appearance-none cursor-pointer">
                                <option value="all">Tất cả Chức vụ</option>
                                <option value="Quản lý">Quản lý</option>
                                <option value="Thu ngân">Thu ngân</option>
                                <option value="Phục vụ">Phục vụ</option>
                                <option value="Đầu bếp">Đầu bếp</option>
                            </select>
                            <i class="ph ph-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                        
                        <button onclick="openEmployeeModal('add')" class="bg-gray-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm shrink-0 shadow-sm">
                            <i class="ph ph-plus"></i> <span class="hidden sm:inline">Thêm Nhân viên</span>
                        </button>
                    </div>
                </div>

                <!-- THANH TÌM KIẾM -->
                <div class="mb-4">
                    <div class="relative w-full max-w-md">
                        <i class="ph ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                        <input type="text" id="searchInput" onkeyup="filterEmployees()" placeholder="Tìm kiếm theo tên, SĐT, mã NV..." class="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-xl py-2 pl-10 pr-4 text-sm outline-none transition-all shadow-sm">
                    </div>
                </div>

                <!-- BẢNG DỮ LIỆU -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="overflow-x-auto w-full hide-scrollbar">
                        <table class="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr class="bg-white border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    <th class="px-4 sm:px-6 py-4">Nhân viên</th>
                                    <th class="px-4 sm:px-6 py-4">Vai trò (Phân quyền)</th>
                                    <th class="px-4 sm:px-6 py-4">Thông tin liên hệ</th>
                                    <th class="px-4 sm:px-6 py-4">Ca hôm nay (In - Out)</th>
                                    <th class="px-4 sm:px-6 py-4">Trạng thái HĐ</th>
                                    <th class="px-4 sm:px-6 py-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="employeeTableBody">
                                <!-- JS render rows here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Trạng thái trống -->
                <div id="emptyState" class="hidden flex-col items-center justify-center py-12 text-gray-400">
                    <i class="ph ph-users text-5xl mb-3 text-gray-300 block"></i>
                    <p class="text-sm font-medium text-gray-500">Không tìm thấy nhân viên nào.</p>
                </div>
            </main>

            <!-- ================= TAB 2: LỊCH LÀM VIỆC (THỜI KHÓA BIỂU) ================= -->
            <main id="viewSchedule" class="hidden flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
                
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Lịch làm việc trong tuần</h2>
                        <p class="text-xs sm:text-sm text-gray-500 mt-1">Phân ca và theo dõi lịch đăng ký của nhân viên.</p>
                    </div>
                    <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <!-- Chọn Tuần -->
                        <div class="relative flex-1 sm:flex-none flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <button class="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors"><i class="ph ph-caret-left"></i></button>
                            <span class="text-xs sm:text-sm font-medium px-2 text-gray-700 whitespace-nowrap">Tuần 23/10 - 29/10</span>
                            <button class="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors"><i class="ph ph-caret-right"></i></button>
                        </div>
                        
                        <button class="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition-colors border border-blue-200 flex items-center justify-center gap-2 text-xs sm:text-sm shrink-0 shadow-sm">
                            <i class="ph ph-calendar-plus"></i> <span class="hidden sm:inline">Xếp ca tự động</span>
                        </button>
                    </div>
                </div>

                <!-- Bảng Thời Khóa Biểu -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="overflow-x-auto w-full hide-scrollbar">
                        <table class="w-full text-center border-collapse min-w-[1000px] table-fixed">
                            <thead>
                                <tr class="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600">
                                    <th class="px-4 py-4 w-48 text-left border-r border-gray-200 bg-white sticky left-0 z-10">Nhân viên</th>
                                    <th class="px-2 py-4 border-r border-gray-100">T2<br><span class="text-[10px] font-normal text-gray-400">23/10</span></th>
                                    <th class="px-2 py-4 border-r border-gray-100">T3<br><span class="text-[10px] font-normal text-gray-400">24/10</span></th>
                                    <th class="px-2 py-4 border-r border-gray-100">T4<br><span class="text-[10px] font-normal text-gray-400">25/10</span></th>
                                    <th class="px-2 py-4 border-r border-gray-100">T5<br><span class="text-[10px] font-normal text-gray-400">26/10</span></th>
                                    <th class="px-2 py-4 border-r border-gray-100">T6<br><span class="text-[10px] font-normal text-gray-400">27/10</span></th>
                                    <th class="px-2 py-4 border-r border-gray-100 text-orange-600">T7<br><span class="text-[10px] font-normal text-orange-400">28/10</span></th>
                                    <th class="px-2 py-4 text-red-600">CN<br><span class="text-[10px] font-normal text-red-400">29/10</span></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="scheduleTableBody">
                                <!-- JS render schedule here -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Chú thích -->
                <div class="mt-4 flex flex-wrap gap-4 text-xs font-medium text-gray-600 bg-white p-4 rounded-xl border border-gray-100">
                    <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-blue-100 border border-blue-300"></span> Ca Sáng (08:00 - 15:00)</div>
                    <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-orange-100 border border-orange-300"></span> Ca Chiều (15:00 - 22:00)</div>
                    <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-purple-100 border border-purple-300"></span> Full time (08:00 - 22:00)</div>
                    <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-gray-100 border border-gray-200"></span> Nghỉ (OFF)</div>
                </div>

            </main>
  </section>
</template>

<script setup lang="ts">
</script>
