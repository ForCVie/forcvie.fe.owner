<template>
    <div class="address-container">
        <input class="selected-address" readonly @click="toggleSelector" v-model="displayAddress" placeholder="Chọn Tỉnh/Thành phố, Phường/Xã" />

        <div v-show="isOpen" class="address-selector">
            <div class="tabs">
                <div class="tab-items-wrapper">
                    <div class="tab-item" :class="{ active: activeTab === 'province' }" @click="switchTab('province')">
                        Tỉnh/Thành phố
                    </div>
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

                <div v-show="activeTab === 'province'" class="options-grid">
                    <div v-for="province in filteredProvinces" :key="province.id" class="option-item"
                        :class="{ selected: province.id === selectedProvince?.id }" @click="selectProvince(province)">
                        {{ province.name }}
                    </div>
                </div>

                <div v-show="activeTab === 'ward'" class="options-grid">
                    <div v-for="ward in filteredWards" :key="ward.id" class="option-item"
                        :class="{ selected: ward.id === selectedWard?.id }" @click="selectWard(ward)">
                        {{ ward.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { locationStore } from '@/stores/common/location'; // Giả sử đã có
import { ref, computed, watch, onBeforeMount } from 'vue';

// --- Giả lập Store và Data mẫu (Cấu trúc 2 cấp) ---
// CHÚ Ý: Bạn cần thay thế phần này bằng store và API thực tế của mình.
// const mockData = [
//     {
//         id: 'HN', name: 'Thành phố Hà Nội', wards: [
//             { id: 'HN-CV', name: 'Phường Cống Vị' },
//             { id: 'HN-BT', name: 'Phường Bách Thảo' },
//             { id: 'HN-NV', name: 'Phường Nghĩa Vĩ' },
//             { id: 'HN-QD', name: 'Phường Quan Đôi' }
//         ]
//     },
//     {
//         id: 'HCM', name: 'Thành phố Hồ Chí Minh', wards: [
//             { id: 'HCM-BT', name: 'Phường Bến Thành' },
//             { id: 'HCM-CV', name: 'Phường Cô Giang' },
//             { id: 'HCM-AL', name: 'Phường An Lạc' },
//             { id: 'HCM-BHH', name: 'Phường Bình Hưng Hòa' }
//         ]
//     },
// ];
const store = locationStore();
const provinces = ref([]);

onBeforeMount(async () => {
    await store.getProvinces(); // API call thực tế
    provinces.value = store.provinces.data; // Lấy data thực tế
    // provinces.value = mockData; // Dùng data mẫu

    // Khởi tạo modelValue sau khi có dữ liệu
    if (props.modelValue) {
        initializeSelection(props.modelValue);
    }
});
// --- End Giả lập Store ---


// modelValue mong đợi/trả về: { province: { name: string, id: any }, ward: { name: string, id: any } }
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);


const isOpen = ref(false);
const activeTab = ref('province');
// selectedProvince sẽ là object { id, name, wards: [...] }
const selectedProvince = ref(null);
// selectedWard sẽ là object { id, name, provinceName, provinceId }
const selectedWard = ref(null);
const searchQuery = ref('');

// --- Computed Properties ---

// Danh sách các Phường/Xã đã được làm phẳng (Chính là selectedProvince.value.wards)
const availableWardsFlat = computed(() => {
    if (!selectedProvince.value) return [];

    // Chỉ cần map để thêm thông tin Province vào Ward
    return selectedProvince.value.wards.map(ward => ({
        name: ward.name,
        id: ward.id, // DÙNG ID CÓ SẴN CỦA WARD
        provinceName: selectedProvince.value.name,
        provinceId: selectedProvince.value.id, // DÙNG ID CÓ SẴN CỦA PROVINCE
    }));
});

// Địa chỉ hiển thị trên thanh chọn (chỉ Tỉnh và Xã)
const displayAddress = computed(() => {
    if (selectedWard.value) return `${selectedWard.value.name}, ${selectedProvince.value.name}`;
    if (selectedProvince.value) return selectedProvince.value.name;
    return "";
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
    // Lọc theo tên ward
    return wards.filter(w => w.name.toLowerCase().includes(query));
});


// --- Watchers for initialization ---

const initializeSelection = (initialValue) => {
    // Kiểm tra cấu trúc: { province: {name, id}, ward: {name, id} }
    if (initialValue?.province?.name && initialValue?.ward?.name) {
        
        // 1. Tìm Tỉnh dựa trên TÊN
        const p = provinces.value.find(prov => prov.name === initialValue.province.name);
        
        if (p) {
            // 2. Thiết lập selectedProvince với ID và Name từ initialValue
            selectedProvince.value = { 
                name: p.name, 
                id: initialValue.province.id || p.id, 
                wards: p.wards 
            };
            
            // 3. Tìm Ward trong mảng wards trực tiếp
            const matchingWard = p.wards.find(w => w.name === initialValue.ward.name);

            if (matchingWard) {
                // 4. Tạo object selectedWard theo cấu trúc flat (sử dụng ID thực)
                selectedWard.value = {
                    name: matchingWard.name,
                    id: initialValue.ward.id || matchingWard.id,
                    provinceName: p.name,
                    provinceId: initialValue.province.id,
                };
            }
        }
    }
}

watch(() => props.modelValue, (initialValue) => {
    // Chỉ chạy khi provinces.value đã có dữ liệu
    if (provinces.value.length > 0) {
        initializeSelection(initialValue);
    }
}, { immediate: true }); 

// Nếu data được load sau, cần watch thêm provinces
watch(provinces, (newProvinces) => {
    if (newProvinces.length > 0 && props.modelValue) {
        initializeSelection(props.modelValue);
    }
});


// --- Methods ---

const toggleSelector = () => { isOpen.value = !isOpen.value; };

const switchTab = (tab) => {
    if (tab === 'ward' && !selectedProvince.value) return; 
    activeTab.value = tab;
    searchQuery.value = '';
};

const selectProvince = (province) => {
    // Lưu object tỉnh với id, name và wards
    selectedProvince.value = { 
        name: province.name, 
        id: province.id, 
        wards: province.wards
    };
    selectedWard.value = null; 
    activeTab.value = 'ward'; 
    searchQuery.value = '';
};

// Ward object là object đã được làm phẳng và có chứa ID
const selectWard = (ward) => {
    selectedWard.value = ward;
    isOpen.value = false;
    
    // Emit modelValue với cả Name và ID
    emit('update:modelValue', {
        province: {
            name: selectedProvince.value?.name,
            id: selectedProvince.value?.id,
        },
        ward: {
            name: selectedWard.value?.name,
            id: selectedWard.value?.id, // ID lấy từ object ward đã được flatten (có sẵn)
        },
    });
};

const resetSelection = () => {
    selectedProvince.value = null;
    selectedWard.value = null;
    activeTab.value = 'province';
    searchQuery.value = '';
    // Trả về null khi reset
    emit('update:modelValue', null); 
};
</script>

---

<style scoped>
:root {
    --primary: #0b74e5;
    --border-color: #cbd5e1;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 1. CONTAINER: Đặt relative và tăng width để chứa 3 cột */
.address-container { 
    position: relative; 
    font-family: 'Inter', sans-serif; 
    margin: 0; 
    padding: 0;
}

/* 2. SELECTED ADDRESS: Thiết kế như một select box */
.selected-address { 
    width: 100%;
    border: 1px solid #cbd5e1; 
    padding: 10px 12px; 
    border-radius: 6px; 
    cursor: pointer; 
    color: #4b5563; 
    margin-bottom: 0; 
    position: relative; 
    user-select: none;
    font-size: 14px;
    font-weight: 400;
    transition: border-color 0.2s ease;
    background-color: #fff;
    box-sizing: border-box;
}
/* .selected-address:hover {
    border-color: var(--primary);
} */
.selected-address::after { 
    content: '▼'; 
    position: absolute; 
    right: 12px; 
    top: 50%; 
    transform: translateY(-50%); 
    font-size: 8px; 
    color: #9ca3af;
}

/* 3. ADDRESS SELECTOR: Vị trí tuyệt đối để không ảnh hưởng form */
.address-selector { 
    position: absolute;
    top: 100%; 
    left: 0;
    right: 0; 
    z-index: 1000; 
    margin-top: 4px; 
    
    background-color: #fff; 
    border: 1px solid var(--border-color); 
    border-radius: 8px; 
    box-shadow: var(--shadow); 
    overflow: hidden;
}

/* 4. TABS & CONTENT (Điều chỉnh padding) */
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
    padding: 10px 12px; 
    cursor: pointer; 
    color: #6b7280; 
    flex: 1; 
    text-align: center; 
    transition: all .2s ease; 
    font-weight: 500;
    font-size: 13px;
    border-right: 1px solid #e5e7eb;
}
.tab-items-wrapper .tab-item:last-child { border-right: none; }
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
    padding: 0 12px; 
    cursor: pointer; 
    color: #ef4444; 
    font-size: 13px; 
    font-weight: 600; 
    white-space: nowrap; 
    transition: opacity .2s ease; 
}
.reset-btn:hover { 
    opacity: .8; 
}
.tab-content { 
    padding: 12px; 
    height: 250px; 
    overflow-y: auto; 
    background-color: #fff;
}

/* 5. OPTIONS GRID: Sử dụng Grid 3 cột */
.options-grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 8px; 
}

.option-item { 
    padding: 8px 10px; 
    border: 1px solid #e0e0e0; 
    border-radius: 4px; 
    cursor: pointer; 
    font-size: 14px; 
    transition: all .2s ease;
    text-align: center; 
}
.option-item:hover { 
    border-color: var(--primary); 
}
.option-item.selected { 
    background-color: var(--primary); 
    color: #fff; 
    border-color: var(--primary); 
    font-weight: 600;
}
.search-wrapper { 
    padding: 0 0 12px 0; 
}
.search-input { 
    width: 100%; 
    padding: 8px 10px; 
    border: 1px solid var(--border-color); 
    border-radius: 4px; 
    font-size: 14px; 
    box-sizing: border-box; 
    transition: all 0.2s ease;
}
.search-input:focus { 
    outline: none; 
    border-color: var(--primary); 
    box-shadow: 0 0 0 2px rgba(11, 116, 229, 0.15); 
}

/* Loại bỏ CSS không dùng trong cấu trúc 2 cấp */
.district-context { display: none; }
</style>