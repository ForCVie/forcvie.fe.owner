<template>
  <!-- Layout Container chuẩn -->
  <div class="flex-1 flex flex-col h-full overflow-y-auto relative w-full bg-[#f4f7f9] p-6 pb-14">
    
        <!-- Content Area -->
        <main class="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
            
            <!-- Global Stats / Overview -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <i class="ph-fill ph-storefront"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Tổng cửa hàng</p>
                        <h3 class="text-2xl font-bold text-gray-900">3 <span class="text-sm font-normal text-gray-500">chi nhánh</span></h3>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <i class="ph-fill ph-money"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Doanh thu hôm nay (Toàn HT)</p>
                        <h3 class="text-2xl font-bold text-gray-900">45.2M <span class="text-sm font-normal text-gray-500">VNĐ</span></h3>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-2xl">
                        <i class="ph-fill ph-users"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Đang phục vụ</p>
                        <h3 class="text-2xl font-bold text-gray-900">18 <span class="text-sm font-normal text-gray-500">bàn</span></h3>
                    </div>
                </div>
            </div>

            <!-- Toolbar (Search & Filter) -->
            <div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div class="relative w-full md:w-96">
                    <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                    <input type="text" placeholder="Tìm kiếm tên, địa chỉ cửa hàng..." class="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition-all shadow-sm">
                </div>
                <div class="flex gap-2">
                    
                    <ButtonBase
                        type="button"
                        class="button primary"
                        @click="goActionCreate"
                        :button-name="'Thêm cửa hàng'"
                    />
                    <select class="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-medium outline-none hover:bg-gray-50 focus:border-orange-500">
                        <option>Tất cả trạng thái</option>
                        <option>Đang hoạt động</option>
                        <option>Đang thiết lập</option>
                        <option>Tạm đóng cửa</option>
                    </select>
                </div>
            </div>
<!-- Stores Grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    
    <!-- Store Card 1 (Active) -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col overflow-hidden">
        <div class="h-32 bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80');">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full border border-green-400 shadow-sm flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Đang hoạt động
            </div>
            <div class="absolute bottom-3 left-4 flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-white p-1 shadow-md">
                    <img src="https://ui-avatars.com/api/?name=El+Gaucho&background=ff5c00&color=fff&rounded=true&bold=true" class="w-full h-full rounded-lg">
                </div>
                <h2 class="text-xl font-bold text-white drop-shadow-md">El Gaucho - Hai Bà Trưng</h2>
            </div>
        </div>
        
        <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-start gap-2 text-sm text-gray-500 mb-3">
                <i class="ph ph-map-pin text-lg text-gray-400 shrink-0"></i>
                <p class="line-clamp-2">74/1 Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
            </div>

            <!-- Package Info Banner -->
            <div class="flex items-center justify-between bg-orange-50/80 border border-orange-100 rounded-xl px-3 py-2 mb-4 text-xs">
                <div class="flex items-center gap-1.5 font-medium text-orange-900">
                    <i class="ph ph-crown text-orange-500 text-sm"></i>
                    <span>Gói Doanh Nghiệp</span>
                </div>
                <span class="text-orange-700">Hết hạn: <strong>31/12/2026</strong></span>
            </div>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                    <p class="text-xs text-gray-500 mb-1">Doanh thu (Hôm nay)</p>
                    <p class="font-bold text-gray-900">32.500.000đ</p>
                </div>
                <div>
                    <p class="text-xs text-gray-500 mb-1">Bàn đang phục vụ</p>
                    <p class="font-bold text-gray-900">12 / 45 bàn</p>
                </div>
            </div>

            <div class="mt-auto flex gap-3">
                <ButtonBase
                    type="button"
                    class="button primary flex-1 flex items-center justify-center gap-2"
                    @click="goActionCreate"
                > 
                    <i class="ph ph-sign-in"></i> Vào quản trị
                </ButtonBase>
                <button class="w-11 h-11 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 flex items-center justify-center transition-colors">
                    <i class="ph ph-gear text-lg"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Store Card 2 (Stopped) -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col overflow-hidden">
        <div class="h-32 bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80');">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full border border-red-400 shadow-sm flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Ngừng hoạt động
            </div>
            <div class="absolute bottom-3 left-4 flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-white p-1 shadow-md">
                    <img src="https://ui-avatars.com/api/?name=El+Gaucho&background=ff5c00&color=fff&rounded=true&bold=true" class="w-full h-full rounded-lg">
                </div>
                <h2 class="text-xl font-bold text-white drop-shadow-md">El Gaucho - Thảo Điền</h2>
            </div>
        </div>
        
        <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-start gap-2 text-sm text-gray-500 mb-3">
                <i class="ph ph-map-pin text-lg text-gray-400 shrink-0"></i>
                <p class="line-clamp-2">Lô 8, Đường Xuân Thủy, Phường Thảo Điền, Quận 2, TP. Thủ Đức</p>
            </div>

            <!-- Package Info Banner (Expired State Example) -->
            <div class="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4 text-xs">
                <div class="flex items-center gap-1.5 font-medium text-red-900">
                    <i class="ph ph-star text-red-500 text-sm"></i>
                    <span>Gói Nâng Cao</span>
                </div>
                <span class="text-red-600 font-medium">Hết hạn: <strong>15/10/2026</strong></span>
            </div>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                    <p class="text-xs text-gray-500 mb-1">Doanh thu (Hôm nay)</p>
                    <p class="font-bold text-gray-900">12.700.000đ</p>
                </div>
                <div>
                    <p class="text-xs text-gray-500 mb-1">Bàn đang phục vụ</p>
                    <p class="font-bold text-gray-900">6 / 30 bàn</p>
                </div>
            </div>

            <div class="mt-auto flex gap-3">
                <ButtonBase
                    type="button"
                    class="button primary flex-1 flex items-center justify-center gap-2"
                    @click="goActionCreate"
                > 
                    <i class="ph ph-sign-in"></i> Vào quản trị
                </ButtonBase>
                <button class="w-11 h-11 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 flex items-center justify-center transition-colors">
                    <i class="ph ph-gear text-lg"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Store Card 3 (Temporarily Closed) -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col overflow-hidden">
        <div class="h-32 bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80');">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full border border-yellow-400 shadow-sm flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Tạm đóng cửa
            </div>
            <div class="absolute bottom-3 left-4 flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-white p-1 shadow-md">
                    <img src="https://ui-avatars.com/api/?name=El+Gaucho&background=ff5c00&color=fff&rounded=true&bold=true" class="w-full h-full rounded-lg">
                </div>
                <h2 class="text-xl font-bold text-white drop-shadow-md">El Gaucho - Thảo Điền</h2>
            </div>
        </div>
        
        <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-start gap-2 text-sm text-gray-500 mb-3">
                <i class="ph ph-map-pin text-lg text-gray-400 shrink-0"></i>
                <p class="line-clamp-2">Lô 8, Đường Xuân Thủy, Phường Thảo Điền, Quận 2, TP. Thủ Đức</p>
            </div>

            <!-- Package Info Banner -->
            <div class="flex items-center justify-between bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 mb-4 text-xs">
                <div class="flex items-center gap-1.5 font-medium text-gray-800">
                    <i class="ph ph-lightning text-yellow-600 text-sm"></i>
                    <span>Gói Cơ Bản</span>
                </div>
                <span class="text-gray-600">Hết hạn: <strong>20/11/2026</strong></span>
            </div>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                    <p class="text-xs text-gray-500 mb-1">Doanh thu (Hôm nay)</p>
                    <p class="font-bold text-gray-900">12.700.000đ</p>
                </div>
                <div>
                    <p class="text-xs text-gray-500 mb-1">Bàn đang phục vụ</p>
                    <p class="font-bold text-gray-900">6 / 30 bàn</p>
                </div>
            </div>

            <div class="mt-auto flex gap-3">
                <ButtonBase
                    type="button"
                    class="button primary flex-1 flex items-center justify-center gap-2"
                    @click="goActionCreate"
                > 
                    <i class="ph ph-sign-in"></i> Vào quản trị
                </ButtonBase>
                <button class="w-11 h-11 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 flex items-center justify-center transition-colors">
                    <i class="ph ph-gear text-lg"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Store Card 4 (Setup/Inactive) -->
    <div class="bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all flex flex-col overflow-hidden opacity-80">
        <div class="h-32 bg-gray-100 flex items-center justify-center relative">
            <i class="ph ph-storefront text-4xl text-gray-300"></i>
            <div class="absolute top-3 right-3 bg-gray-500 text-white text-xs font-bold px-2.5 py-1 rounded-full border border-gray-400 shadow-sm flex items-center gap-1.5">
                <i class="ph ph-wrench"></i> Đang thiết lập
            </div>
            <div class="absolute bottom-3 left-4 flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 shadow-sm opacity-50">
                    <img src="https://ui-avatars.com/api/?name=El+Gaucho&background=9ca3af&color=fff&rounded=true&bold=true" class="w-full h-full rounded-lg grayscale">
                </div>
            </div>
        </div>
        
        <div class="p-5 flex-1 flex flex-col">
            <h2 class="text-xl font-bold text-gray-900 mb-2">El Gaucho - Hà Nội</h2>
            <div class="flex items-start gap-2 text-sm text-gray-500 mb-3">
                <i class="ph ph-map-pin text-lg text-gray-400 shrink-0"></i>
                <p class="line-clamp-2">11 Tràng Thi, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội</p>
            </div>

            <!-- Package Info Banner (Trial State Example) -->
            <div class="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 mb-4 text-xs">
                <div class="flex items-center gap-1.5 font-medium text-blue-900">
                    <i class="ph ph-clock text-blue-500 text-sm"></i>
                    <span>Dùng thử (Trial)</span>
                </div>
                <span class="text-blue-700">Hết hạn: <strong>05/11/2026</strong></span>
            </div>
            
            <!-- Progress Bar -->
            <div class="mb-6">
                <div class="flex justify-between text-xs font-medium text-gray-500 mb-2">
                    <span>Tiến độ thiết lập</span>
                    <span>60%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-gray-400 h-2 rounded-full" style="width: 60%"></div>
                </div>
                <p class="text-xs text-gray-400 mt-2 italic">Cần hoàn thiện menu và sơ đồ bàn</p>
            </div>

            <div class="mt-auto flex gap-3">
                <button @click="goAction('id')" class="flex-1 bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <i class="ph ph-wrench"></i> Tiếp tục thiết lập
                </button>
            </div>
        </div>
    </div>

</div>

        </main>
  </div>
</template>

<script setup lang="ts">
import { useNotice } from '@/components/common/composables/useAlert';
import { NOTICE_SUCCESS } from '@/constants/common.const';
import router from '@/router';
import { storeManagerRoute } from '@/router/routeItems/storeManagerRoute';

const notice = useNotice();


const goActionCreate = () => {
//   router.push({ name: storeManagerRoute.storeManagerForm.name });
notice('Lưu cửa hàng thành công!', NOTICE_SUCCESS);
};

const goAction = (item: string) => {
  router.push({
    name: storeManagerRoute.storeManagerForm.name,
    state: { id: item },
  });
};

</script>