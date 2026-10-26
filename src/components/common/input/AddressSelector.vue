<template>
    <div class="address-container">
        <div class="selected-address" @click="toggleSelector">{{ displayAddress }}</div>
        
        <div v-show="isOpen" class="address-selector">
            <div class="tabs">
                <div class="tab-items-wrapper">
                    <div class="tab-item" :class="{ active: activeTab === 'province' }" @click="switchTab('province')">
                        Tỉnh/Thành phố</div>
                    <div class="tab-item" :class="{ active: activeTab === 'district', disabled: !selectedProvince }"
                        @click="switchTab('district')">Quận/Huyện</div>
                    <div class="tab-item" :class="{ active: activeTab === 'ward', disabled: !selectedDistrict }"
                        @click="switchTab('ward')">Phường/Xã</div>
                </div>
                <div class="reset-btn" @click="resetSelection">Chọn lại từ đầu</div>
            </div>
            
            <div class="tab-content">
                <div class="search-wrapper">
                    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..." class="search-input">
                </div>

                <div v-show="activeTab === 'province'" class="options-grid">
                    <div v-for="province in filteredProvinces" :key="province.id" class="option-item"
                        :class="{ selected: province.id === selectedProvince?.id }" @click="selectProvince(province)">{{
                            province.name }}</div>
                </div>
                <div v-show="activeTab === 'district'" class="options-grid">
                    <div v-for="district in filteredDistricts" :key="district.id" class="option-item"
                        :class="{ selected: district.id === selectedDistrict?.id }" @click="selectDistrict(district)">{{
                            district.name }}</div>
                </div>
                <div v-show="activeTab === 'ward'" class="options-grid">
                    <div v-for="ward in filteredWards" :key="ward.id" class="option-item"
                        :class="{ selected: ward.id === selectedWard?.id }" @click="selectWard(ward)">{{ ward.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { locationStore } from '@/stores/common/location';
import { ref, computed, watch, onBeforeMount } from 'vue';

// modelValue giờ đây mong đợi/trả về: 
// { province: { name, id }, district: { name, id }, ward: { name, id } }
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

// Giả định store.provincesOld.data trả về mảng các province object
const store = locationStore();

const provinces = ref([]);

// --- Data Fetching (Giữ nguyên) ---
onBeforeMount(async () =>{
    
    if (props.modelValue) {
        initializeSelection(props.modelValue);
    }
});

const isOpen = ref(false);
const activeTab = ref('province');
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);
const searchQuery = ref('');

// --- Computed Properties (Giữ nguyên) ---
const availableDistricts = computed(() => selectedProvince.value ? selectedProvince.value.districts : []);
const availableWards = computed(() => selectedDistrict.value ? selectedDistrict.value.wards : []);

const displayAddress = computed(() => {
    if (selectedWard.value) return `${selectedWard.value.name}, ${selectedDistrict.value.name}, ${selectedProvince.value.name}`;
    if (selectedDistrict.value) return `${selectedDistrict.value.name}, ${selectedProvince.value.name}`;
    if (selectedProvince.value) return selectedProvince.value.name;
    return "Chọn Tỉnh/Thành phố, Quận/Huyện, Phường/Xã";
});

const filteredProvinces = computed(() => {
    if (!searchQuery.value) return provinces.value;
    const query = searchQuery.value.toLowerCase().trim();
    return provinces.value.filter(p => p.name.toLowerCase().includes(query));
});

const filteredDistricts = computed(() => {
    const districts = availableDistricts.value;
    if (!searchQuery.value) return districts;
    const query = searchQuery.value.toLowerCase().trim();
    return districts.filter(d => d.name.toLowerCase().includes(query));
});

const filteredWards = computed(() => {
    const wards = availableWards.value;
    if (!searchQuery.value) return wards;
    const query = searchQuery.value.toLowerCase().trim();
    return wards.filter(w => w.name.toLowerCase().includes(query));
});

// --- Watcher & Initialization (Giữ nguyên) ---
const initializeSelection = (initialValue) => {
    if (initialValue?.province?.name) {
        const p = provinces.value.find(prov => prov.name === initialValue.province.name);
        if (p) {
            selectedProvince.value = p; 
            if (initialValue.district?.name) {
                const d = p.districts.find(dist => dist.name === initialValue.district.name);
                if (d) {
                    selectedDistrict.value = d; 
                    if (initialValue.ward?.name) {
                        const w = d.wards.find(wrd => wrd.name === initialValue.ward.name);
                        if (w) {
                            selectedWard.value = w;
                        }
                    }
                }
            }
        }
    } else {
        selectedProvince.value = null;
        selectedDistrict.value = null;
        selectedWard.value = null;
    }
}

watch(() => props.modelValue, (initialValue) => {
    if (provinces.value.length > 0) {
        initializeSelection(initialValue);
    }
}, { immediate: true });

watch(provinces, (newProvinces) => {
    if (newProvinces.length > 0 && props.modelValue) {
        initializeSelection(props.modelValue);
    }
});

// --- Methods (Giữ nguyên) ---
const toggleSelector = () => { isOpen.value = !isOpen.value; };

const switchTab = (tab) => {
    if (tab === 'district' && !selectedProvince.value) return;
    if (tab === 'ward' && !selectedDistrict.value) return;
    activeTab.value = tab;
    searchQuery.value = '';
};

const selectProvince = (province) => {
    selectedProvince.value = province;
    selectedDistrict.value = null;
    selectedWard.value = null;
    activeTab.value = 'district';
    searchQuery.value = '';
};

const selectDistrict = (district) => {
    selectedDistrict.value = district;
    selectedWard.value = null;
    activeTab.value = 'ward';
    searchQuery.value = '';
};

const selectWard = (ward) => {
    selectedWard.value = ward;
    isOpen.value = false;
    
    // EMIT: Trả về object chứa cả ID và Name
    emit('update:modelValue', {
        province: {
            id: selectedProvince.value?.id,
            name: selectedProvince.value?.name,
        },
        district: {
            id: selectedDistrict.value?.id,
            name: selectedDistrict.value?.name,
        },
        ward: {
            id: selectedWard.value?.id,
            name: selectedWard.value?.name,
        },
    });
};

const resetSelection = () => {
    selectedProvince.value = null;
    selectedDistrict.value = null;
    selectedWard.value = null;
    activeTab.value = 'province';
    searchQuery.value = '';
    emit('update:modelValue', null);
};
</script>

<style scoped>
:root {
    --primary: #0b74e5;
    --border-color: #d1d5db;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 1. CONTAINER: Đặt width lớn hơn để chứa 3 cột */
.address-container { 
    position: relative; 
    font-family: 'Inter', sans-serif; 
    margin: 0; 
    padding: 0;
}

/* 2. SELECTED ADDRESS: Thiết kế như một select box */
.selected-address { 
    width: 100%;
    border: 1px solid var(--border-color); 
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
.selected-address:hover {
    border-color: var(--primary);
}
.selected-address::after { 
    content: '▼'; 
    position: absolute; 
    right: 12px; 
    top: 50%; 
    transform: translateY(-50%); 
    font-size: 8px; 
    color: #9ca3af;
}

/* 3. ADDRESS SELECTOR: Vị trí tuyệt đối */
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

/* 4. TABS & CONTENT (Giữ nguyên) */
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

/* 5. OPTIONS GRID: Thay đổi từ Flex sang Grid */
.options-grid { 
    display: grid; /* Sử dụng CSS Grid */
    /* Chia thành 3 cột có kích thước bằng nhau */
    grid-template-columns: repeat(3, 1fr); 
    gap: 8px; /* Giảm gap một chút */
}

.option-item { 
    padding: 8px 10px; 
    border: 1px solid #e0e0e0; 
    border-radius: 4px; 
    cursor: pointer; 
    font-size: 14px; 
    transition: all .2s ease;
    text-align: center; /* Căn giữa nội dung cho đẹp hơn khi là grid */
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
</style>