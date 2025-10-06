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
                    <div v-for="province in filteredProvinces" :key="province.name" class="option-item"
                        :class="{ selected: province === selectedProvince }" @click="selectProvince(province)">{{
                            province.name }}</div>
                </div>
                <div v-show="activeTab === 'district'" class="options-grid">
                    <div v-for="district in filteredDistricts" :key="district.name" class="option-item"
                        :class="{ selected: district === selectedDistrict }" @click="selectDistrict(district)">{{
                            district.name }}</div>
                </div>
                <div v-show="activeTab === 'ward'" class="options-grid">
                    <div v-for="ward in filteredWards" :key="ward.name" class="option-item"
                        :class="{ selected: ward === selectedWard }" @click="selectWard(ward)">{{ ward.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const provinces = ref([
    { "name": "Thành phố Hà Nội", "districts": [{ "name": "Quận Ba Đình", "wards": [{ "name": "Phường Phúc Xá" }, { "name": "Phường Trúc Bạch" }] }, { "name": "Quận Hoàn Kiếm", "wards": [{ "name": "Phường Phan Chu Trinh" }, { "name": "Phường Hàng Buồm" }] }] },
    { "name": "Thành phố Hồ Chí Minh", "districts": [{ "name": "Quận 1", "wards": [{ "name": "Phường Tân Định" }, { "name": "Phường Đa Kao" }] }, { "name": "Quận 3", "wards": [{ "name": "Phường Võ Thị Sáu" }, { "name": "Phường 4" }] }, { "name": "Thành phố Thủ Đức", "wards": [{ "name": "Phường Linh Trung" }, { "name": "Phường Hiệp Phú" }] }] },
    { "name": "Tỉnh Bà Rịa - Vũng Tàu", "districts": [{ "name": "Thành phố Vũng Tàu", "wards": [{ "name": "Phường 1" }, { "name": "Phường Thắng Tam" }] }, { "name": "Thị xã Phú Mỹ", "wards": [{ "name": "Phường Phú Mỹ" }, { "name": "Xã Tân Hoà" }] }] }
]);

const isOpen = ref(false);
const activeTab = ref('province');
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);
const searchQuery = ref('');

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

watch(() => props.modelValue, (initialValue) => {
  if (initialValue && initialValue.province) {
    const p = provinces.value.find(prov => prov.name === initialValue.province);
    if (p) {
      selectedProvince.value = p;
      const d = p.districts.find(dist => dist.name === initialValue.district);
      if (d) {
        selectedDistrict.value = d;
        const w = d.wards.find(wrd => wrd.name === initialValue.ward);
        if (w) {
          selectedWard.value = w;
        }
      }
    }
  } else {
    selectedProvince.value = null;
    selectedDistrict.value = null;
    selectedWard.value = null;
  }
}, { immediate: true });

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
  emit('update:modelValue', {
    province: selectedProvince.value?.name,
    district: selectedDistrict.value?.name,
    ward: selectedWard.value?.name,
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
/* (Style giữ nguyên) */
.address-container { width: 800px; max-width: 90%; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, .1); padding: 24px; font-family: Arial, sans-serif; }
.selected-address { border: 1px solid #e0e0e0; padding: 12px 16px; border-radius: 6px; cursor: pointer; color: #888; margin-bottom: 16px; position: relative; user-select: none; }
.selected-address::after { content: '▼'; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); font-size: 12px; }
.address-selector { border: 1px solid #f0f0f0; border-radius: 6px; }
.tabs { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f0f0f0; }
.tab-items-wrapper { display: flex; flex-grow: 1; }
.tab-item { padding: 14px 20px; cursor: pointer; color: #888; background-color: #fafafa; flex: 1; text-align: center; transition: all .2s ease; border-right: 1px solid #f0f0f0; }
.tab-items-wrapper .tab-item:last-child { border-right: none; }
.tab-item.active { color: var(--primary); background-color: #fff; border-bottom: 2px solid var(--primary); font-weight: 600; }
.tab-item.disabled { cursor: not-allowed; color: #ccc; background-color: #f9f9f9; }
.reset-btn { padding: 0 20px; cursor: pointer; color: var(--primary); font-size: 14px; font-weight: 500; white-space: nowrap; transition: opacity .2s ease; }
.reset-btn:hover { opacity: .7; }
.tab-content { padding: 16px; height: 300px; overflow-y: auto; }
.options-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.option-item { padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 4px; cursor: pointer; text-align: center; font-size: 14px; transition: all .2s ease; }
.option-item:hover { border-color: var(--primary); color: var(--primary); }
.option-item.selected { background-color: var(--primary); color: #fff; border-color: var(--primary); }
.search-wrapper { padding: 0 0 16px 0; }
.search-input { width: 100%; padding: 10px 12px; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
.search-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(11, 116, 229, 0.2); }
</style>