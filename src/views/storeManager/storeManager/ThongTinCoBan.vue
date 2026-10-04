<template>
  <form class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Tên cửa hàng -->
      <InputBase v-model="modelValue.storeName" :id="'storeName'" label="Tên cửa hàng" :required="true"
        placeholder="Nhập tên cửa hàng..." />

      <!-- Tên hiển thị -->
      <InputBase v-model="modelValue.displayName" label="Tên hiển thị"
        placeholder="Nhập tên hiển thị trên ứng dụng/website..." required />

      <!-- Loại hình cửa hàng -->
      <SelectBoxBase v-model="modelValue.storeType" label="Loại hình cửa hàng" :required="true" :data="storeTypeOptions"
        placeholder="Chọn loại hình cửa hàng" />

      <!-- Chủ sở hữu -->
      <InputBase v-model="modelValue.storeOwner" label="Chủ sở hữu" disabled required />

      <!-- Số điện thoại -->
      <InputBase v-model="modelValue.phone" label="Số điện thoại" :required="true"
        placeholder="Nhập số điện thoại liên hệ..." />

      <!-- Email -->
      <InputBase v-model="modelValue.email" label="Email" type="email" placeholder="Nhập địa chỉ email..." required />

      <!-- Logo cửa hàng -->
      <div class="md:col-span-2">
        <InputFileBase v-model="modelValue.logoFiles" label="Logo cửa hàng" :type="FILE_TYPE_IMAGE" :previewFlag="true"
          :max-files="1" subTitle="* Định dạng PNG, JPG. Dung lượng tối đa 5MB" />
      </div>

      <div class="input-wrapper">
        <!-- Label Component -->
        <label class="input-label">
          Tỉnh/Thành phố, Phường/Xã
        </label>
        <div class="input-field-container">
          <AddressSelectV2 v-model="selectedAddress" />
        </div>
      </div>
      
      <!-- Email -->
      <InputBase v-model="modelValue.email" label="Địa chỉ" placeholder="Địa chỉ..." />

      
      <!-- Mô tả cửa hàng -->
      <div class="md:col-span-2">
        <TextArea v-model="modelValue.description" label="Mô tả" :rows="4"
          placeholder="Mô tả ngắn gọn về cửa hàng, phong cách phục vụ, điểm nổi bật..." />
      </div>
    </div>
    <!-- FOOTER LỀU CHO BƯỚC NÀY -->
    <div class="flex items-center justify-between border-t border-slate-100 pt-6">
      <!-- Nút Back (Bị disable nếu là step đầu tiên) -->
      <button type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="isFirstStep" @click="onBack">
        Quay lại
      </button>

      <!-- Nút Next -->
      <button type="button" @click="handleSubmit"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50"
        :disabled="store.loading">
        <svg v-if="store.loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>{{ isLastStep ? 'Hoàn tất' : 'Tiếp tục' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { FILE_TYPE_IMAGE } from "@/constants/screen.const";
import { commonStore } from '@/stores/common';
import { useAlert, useToast } from '@/components/common/composables/useAlert';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  isFirstStep: { type: Boolean, default: false },
  isLastStep: { type: Boolean, default: false },
  modelValue: { type: Object },
})

const emit = defineEmits(['next', 'back', 'update:modelValue'])
const store = commonStore()
const alert = useToast();
const { t } = useI18n();

// SelectBox Options for Store Type
const storeTypeOptions = [
  { cdId: 'RESTAURANT', cdNm: 'Nhà hàng' },
  { cdId: 'EATERY', cdNm: 'Quán ăn' },
  { cdId: 'CAFE', cdNm: 'Cafe' },
  { cdId: 'BEVERAGE', cdNm: 'Đồ uống' },
  { cdId: 'FAST_FOOD', cdNm: 'Fast Food' },
  { cdId: 'OTHER', cdNm: 'Khác' }
];

const handleSubmit = async () => {
  if (store.check) {
    alert(
      t("common.messageValidateRequired"),
      t("common.alertTitle"),
      () => { }
    );
    return;
  }

  // Gọi API riêng nếu cần
  store.setLoading(true);
  try {
    // await apiSaveStep1(form)

    // Gọi event cho BaseStepper nhảy bước
    emit('next')
  } catch (err) {
    console.error(err)
  } finally {
    store.setLoading(false);
  }
}

const onBack = () => {
  emit('back')
}
</script>