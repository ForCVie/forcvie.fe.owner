<template>
    <div class="address-container">
        <!-- Hiển thị địa chỉ đã chọn: chỉ có Phường/Xã và Tỉnh/Thành phố -->
        <div class="selected-address" @click="toggleSelector">
            {{ displayAddress }}
        </div>

        <div v-show="isOpen" class="address-selector">
            <div class="tabs">
                <div class="tab-items-wrapper">
                    <!-- Tab Tỉnh/Thành phố -->
                    <div class="tab-item" :class="{ active: activeTab === 'province' }" @click="switchTab('province')">
                        Tỉnh/Thành phố
                    </div>
                    <!-- Tab Phường/Xã (Bỏ qua Quận/Huyện) -->
                    <div class="tab-item" :class="{ active: activeTab === 'ward', disabled: !selectedProvince }"
                        @click="switchTab('ward')">
                        Phường/Xã
                    </div>
                </div>
                <div class="reset-btn" @click="resetSelection">Chọn lại từ đầu</div>
            </div>

            <div class="tab-content">
                <div class="search-wrapper">
                    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..." class="search-input">
                </div>

                <!-- Nội dung Tab Tỉnh/Thành phố -->
                <div v-show="activeTab === 'province'" class="options-grid">
                    <div v-for="province in filteredProvinces" :key="province.name" class="option-item"
                        :class="{ selected: province === selectedProvince }" @click="selectProvince(province)">
                        {{ province.name }}
                    </div>
                </div>

                <!-- Nội dung Tab Phường/Xã (Hiển thị tất cả wards của tỉnh đã chọn) -->
                <div v-show="activeTab === 'ward'" class="options-grid">
                    <div v-for="ward in filteredWards" :key="ward.id" class="option-item"
                        :class="{ selected: ward.id === selectedWard?.id }" @click="selectWard(ward)">
                        <!-- Chỉ hiển thị tên Phường/Xã -->
                        {{ ward.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['modelValue']);
// modelValue giờ đây chỉ mong đợi/trả về { province: string, ward: string }
const emit = defineEmits(['update:modelValue']);

// Data mẫu đã được làm phẳng thành cấu trúc 2 cấp (Tỉnh -> Xã/Phường)
const provinces = ref([
    { "name": "Thành phố Hà Nội", "wards": [{ "name": "Phường Phúc Xá" }, { "name": "Phường Trúc Bạch" }, { "name": "Phường Phan Chu Trinh" }, { "name": "Phường Hàng Buồm" }, { "name": "Phường Quảng An" }, { "name": "Phường Nhật Tân" }] },
    { "name": "Thành phố Hồ Chí Minh", "wards": [{ "name": "Phường Tân Định" }, { "name": "Phường Đa Kao" }, { "name": "Phường Võ Thị Sáu" }, { "name": "Phường 4" }, { "name": "Phường Linh Trung" }, { "name": "Phường Hiệp Phú" }] },
    { "name": "Tỉnh Bà Rịa - Vũng Tàu", "wards": [{ "name": "Phường 1" }, { "name": "Phường Thắng Tam" }, { "name": "Phường Phú Mỹ" }, { "name": "Xã Tân Hoà" }] }
]);

const isOpen = ref(false);
const activeTab = ref('province');
const selectedProvince = ref(null); 
// selectedWard lưu object đã được làm phẳng: { name: wardName, provinceName: provinceName, id: uniqueId }
const selectedWard = ref(null); 
const searchQuery = ref('');

// --- Computed Properties ---

// Danh sách các Phường/Xã đã được làm phẳng (flat list) của tỉnh đã chọn
const availableWardsFlat = computed(() => {
    if (!selectedProvince.value) return [];
    // Lặp qua wards của tỉnh và tạo ID duy nhất
    return selectedProvince.value.wards.map(ward => ({
        name: ward.name,
        provinceName: selectedProvince.value.name,
        // ID dựa trên tên Tỉnh và tên Xã
        id: `${selectedProvince.value.name}-${ward.name}` 
    }));
});

// Địa chỉ hiển thị trên thanh chọn (chỉ Tỉnh và Xã)
const displayAddress = computed(() => {
    if (selectedWard.value) return `${selectedWard.value.name}, ${selectedProvince.value.name}`;
    if (selectedProvince.value) return selectedProvince.value.name;
    return "Chọn Tỉnh/Thành phố, Phường/Xã";
});

const filteredProvinces = computed(() => {
    if (!searchQuery.value) return provinces.value;
    const query = searchQuery.value.toLowerCase().trim();
    return provinces.value.filter(p => p.name.toLowerCase().includes(query));
});

const filteredWards = computed(() => {
    const wards = availableWardsFlat.value;
    if (!searchQuery.value) return wards;
    const query = searchQuery.value.toLowerCase().trim();
    // Chỉ lọc theo tên ward
    return wards.filter(w => w.name.toLowerCase().includes(query));
});


// --- Watchers for initialization (Updated to only require province and ward) ---

watch(() => props.modelValue, (initialValue) => {
    if (initialValue && initialValue.province && initialValue.ward) {
        const p = provinces.value.find(prov => prov.name === initialValue.province);
        
        if (p) {
            selectedProvince.value = p;
            
            // Tìm Ward trực tiếp trong mảng wards của tỉnh
            const matchingWard = p.wards.find(w => w.name === initialValue.ward);

            if (matchingWard) {
                // Tạo object selectedWard theo cấu trúc flat mới
                selectedWard.value = {
                    name: matchingWard.name,
                    provinceName: p.name,
                    id: `${p.name}-${matchingWard.name}`
                };
            }
        }
    }
}, { immediate: true });

// --- Methods ---

const toggleSelector = () => { isOpen.value = !isOpen.value; };

const switchTab = (tab) => {
    if (tab === 'ward' && !selectedProvince.value) return; 
    activeTab.value = tab;
    searchQuery.value = '';
};

const selectProvince = (province) => {
    selectedProvince.value = province;
    selectedWard.value = null; 
    activeTab.value = 'ward'; 
    searchQuery.value = '';
};

// Ward object là object đã được làm phẳng và có chứa districtName (dùng nội bộ)
const selectWard = (ward) => {
    selectedWard.value = ward;
    isOpen.value = false;
    
    // Emit modelValue chỉ với Tỉnh và Xã
    emit('update:modelValue', {
        province: selectedProvince.value?.name,
        ward: selectedWard.value?.name,
    });
};

const resetSelection = () => {
    selectedProvince.value = null;
    selectedWard.value = null;
    activeTab.value = 'province';
    searchQuery.value = '';
    emit('update:modelValue', null);
};
</script>

<style scoped>
:root {
    --primary: #0b74e5;
}
.address-container { 
    width: 800px; 
    max-width: 90%; 
    background-color: #fff; 
    border-radius: 12px; 
    box-shadow: 0 10px 30px rgba(0, 0, 0, .15); 
    padding: 24px; 
    font-family: 'Inter', sans-serif; 
    margin: 20px auto;
}
.selected-address { 
    border: 1px solid #d1d5db; 
    padding: 12px 16px; 
    border-radius: 8px; 
    cursor: pointer; 
    color: #4b5563; 
    margin-bottom: 16px; 
    position: relative; 
    user-select: none;
    font-size: 16px;
    font-weight: 500;
    transition: border-color 0.2s ease;
}
.selected-address:hover {
    border-color: var(--primary);
}
.selected-address::after { 
    content: '▼'; 
    position: absolute; 
    right: 16px; 
    top: 50%; 
    transform: translateY(-50%); 
    font-size: 10px; 
    color: #9ca3af;
}
.address-selector { 
    border: 1px solid #e5e7eb; 
    border-radius: 8px; 
    overflow: hidden;
}
.tabs { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    border-bottom: 1px solid #e5e7eb; 
    background-color: #f9fafb;
}
.tab-items-wrapper { 
    display: flex; 
    flex-grow: 1; 
}
.tab-item { 
    padding: 14px 20px; 
    cursor: pointer; 
    color: #6b7280; 
    flex: 1; 
    text-align: center; 
    transition: all .2s ease; 
    font-weight: 500;
    border-right: 1px solid #e5e7eb;
}
.tab-items-wrapper .tab-item:last-child { border-right: none; }
.tab-item:first-child { border-top-left-radius: 8px; }
.tab-item.active { 
    color: var(--primary); 
    background-color: #fff; 
    border-bottom: 2px solid var(--primary); 
    font-weight: 600; 
}
.tab-item.disabled { 
    cursor: not-allowed; 
    color: #a0a0a0; 
    background-color: #f1f1f1;
    pointer-events: none;
    border-bottom: none;
}
.reset-btn { 
    padding: 0 20px; 
    cursor: pointer; 
    color: #ef4444; 
    font-size: 14px; 
    font-weight: 600; 
    white-space: nowrap; 
    transition: opacity .2s ease; 
}
.reset-btn:hover { 
    opacity: .8; 
}
.tab-content { 
    padding: 16px; 
    height: 300px; 
    overflow-y: auto; 
    background-color: #fff;
}
.options-grid { 
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.option-item { 
    padding: 10px 14px; 
    border: 1px solid #e0e0e0; 
    border-radius: 6px; 
    cursor: pointer; 
    font-size: 14px; 
    transition: all .2s ease;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.option-item:hover { 
    border-color: var(--primary); 
    background-color: #f0f8ff;
}
.option-item.selected { 
    background-color: var(--primary); 
    color: #fff; 
    border-color: var(--primary); 
    font-weight: 600;
}
.option-item.selected:hover {
    background-color: var(--primary); 
    color: #fff;
}
.search-wrapper { 
    padding: 0 0 16px 0; 
}
.search-input { 
    width: 100%; 
    padding: 10px 12px; 
    border: 1px solid #d1d5db; 
    border-radius: 6px; 
    font-size: 14px; 
    box-sizing: border-box; 
    transition: all 0.2s ease;
}
.search-input:focus { 
    outline: none; 
    border-color: var(--primary); 
    box-shadow: 0 0 0 3px rgba(11, 116, 229, 0.15); 
}

.district-context {
    font-size: 12px;
    color: #9ca3af;
    white-space: nowrap;
}

.option-item.selected .district-context {
    color: rgba(255, 255, 255, 0.8);
}
</style>
