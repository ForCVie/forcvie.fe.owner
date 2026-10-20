<script setup>
import BaseStepper from '@/components/common/step/BaseStepper.vue';
import { ref } from 'vue'
import ThongTinCoBan from './ThongTinCoBan.vue';
import ThoiGianHoatDong from './ThoiGianHoatDong.vue';
import VerifyEmail from './VerifyEmail.vue';

const currentStep = ref(0)
const steps = [
  { title: 'Thông tin cửa hàng' },
  { title: 'Địa chỉ cửa hàng' },
  { title: 'Thời gian hoạt động' }
];

const formData = ref({
  thongTinChung: {
  storeName: '',
  displayName: '',
  storeType: '',
  storeOwner: 'Nguyễn Quốc Huy',
  phone: '',
  email: '',
  logoFiles: [],
  description: ''
},
})
</script>

<template>
  <section id="content" class="mt-5 mb-5" tabindex="0">
    <BaseStepper v-model="currentStep" :steps="steps">
    <!-- Step 1 -->
    <template #step-0="{ next, previous, totalSteps }">
      <ThongTinCoBan
        :is-first-step="currentStep === 0"
        :is-last-step="currentStep === totalSteps - 1"
        v-model="formData.thongTinChung"
        @next="next"
        @back="previous"
      />
    </template>

    <!-- Step 2 -->
    <template #step-1="{ next, previous, totalSteps }">
      <ThoiGianHoatDong
        :is-first-step="currentStep === 0"
        :is-last-step="currentStep === totalSteps - 1"
        @next="next"
        @back="previous"
      />
    </template>
    <!-- Step 2 -->
    <template #step-2="{ next, previous, totalSteps }">
      <VerifyEmail
        :is-first-step="currentStep === 0"
        :is-last-step="currentStep === totalSteps - 1"
        @next="next"
        @back="previous"
      />
    </template>
  </BaseStepper>
  </section>
</template>
