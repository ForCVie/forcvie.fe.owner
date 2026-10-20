<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="flex flex-col items-center justify-center text-center max-w-md mx-auto py-4">
      
      <!-- Icon minh họa đẹp mắt -->
      <div class="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      <!-- Tiêu đề & Mô tả -->
      <h3 class="text-xl font-bold text-slate-800">Mã xác minh Email</h3>
      <p class="text-sm text-slate-500 mt-1">
        Chúng tôi đã gửi mã xác thực 6 chữ số đến địa chỉ email:
      </p>

      <!-- Badge hiển thị Email lấy từ Bước 1 -->
      <div class="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
        <span>{{ userEmail }}</span>
        <button
          type="button"
          class="text-xs text-orange-600 hover:underline font-medium ml-1"
          @click="onBack"
        >
          Thay đổi
        </button>
      </div>

      <!-- Khung 6 ô nhập mã OTP -->
      <div class="mt-8 mb-4 w-full">
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Nhập mã 6 chữ số
        </label>
        
        <div class="flex justify-center gap-2 sm:gap-3" @paste="handlePaste">
          <input
            v-for="(digit, index) in otpDigits"
            :key="index"
            :ref="el => otpInputs[index] = el"
            type="text"
            maxlength="1"
            inputmode="numeric"
            pattern="[0-9]*"
            class="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold text-slate-800 bg-white border border-slate-200 rounded-xl shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            :value="digit"
            @input="onOtpInput($event, index)"
            @keydown="onOtpKeyDown($event, index)"
          />
        </div>

        <p v-if="otpError" class="text-xs text-red-500 mt-2 font-medium">
          {{ otpError }}
        </p>
      </div>

      <!-- Trạng thái Gửi lại mã -->
      <div class="text-sm text-slate-500">
        <span>Chưa nhận được mã? </span>
        <button
          type="button"
          class="text-orange-500 font-semibold hover:underline disabled:opacity-40 disabled:no-underline transition-all"
          :disabled="countdown > 0 || store.loading"
          @click="resendEmail"
        >
          {{ countdown > 0 ? `Gửi lại sau (${countdown}s)` : 'Gửi lại ngay' }}
        </button>
      </div>

    </div>

    <!-- FOOTER LỀU BƯỚC -->
    <div class="flex items-center justify-between border-t border-slate-100 pt-6">
      <!-- Nút Back -->
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
        :disabled="isFirstStep"
        @click="onBack"
      >
        Quay lại
      </button>

      <!-- Nút Next -->
      <button
        type="button"
        @click="handleSubmit"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 transition-all"
        :disabled="store.loading"
      >
        <svg v-if="store.loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>{{ isLastStep ? 'Hoàn tất' : 'Xác nhận & Tiếp tục' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { commonStore } from '@/stores/common';
import { useToast } from '@/components/common/composables/useAlert';
import { useI18n } from 'vue-i18n';

interface ModelValue {
  email?: string;
  otpCode?: string;
  [key: string]: any;
}

const props = withDefaults(
  defineProps<{
    isFirstStep?: boolean;
    isLastStep?: boolean;
    modelValue: ModelValue;
  }>(),
  {
    isFirstStep: false,
    isLastStep: false,
    modelValue: () => ({}),
  }
)

const emit = defineEmits(['next', 'back', 'update:modelValue'])
const store = commonStore()
const alert = useToast()
const { t } = useI18n()

// Lấy Email truyền từ Bước 1
const userEmail = computed(() => props.modelValue?.email || 'chua_co_email@example.com')

// Quản lý 6 ô OTP
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpInputs = ref<HTMLInputElement[]>([])
const otpError = ref('')

const countdown = ref(60)
let timer: ReturnType<typeof setInterval> | null = null

// Đếm ngược gửi lại mã
const startCountdown = () => {
  countdown.value = 60
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      if (timer) clearInterval(timer)
    }
  }, 1000)
}

// Xử lý khi gõ vào ô OTP
const onOtpInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '')

  otpDigits.value[index] = value
  otpError.value = ''

  // Tự động nhảy sang ô tiếp theo
  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }

  updateOtpValue()
}

// Xử lý Xóa (Backspace)
const onOtpKeyDown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

// Xử lý Paste cả chuỗi 6 số
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').trim() || ''
  if (/^\d{6}$/.test(pastedData)) {
    pastedData.split('').forEach((char, i) => {
      otpDigits.value[i] = char
    })
    updateOtpValue()
    otpInputs.value[5]?.focus()
  }
}

// Cập nhật giá trị OTP vào modelValue
const updateOtpValue = () => {
  const code = otpDigits.value.join('')
  emit('update:modelValue', {
    ...props.modelValue,
    otpCode: code
  })
}

// Gửi lại Email xác thực
const resendEmail = async () => {
  store.setLoading(true)
  try {
    // API gửi lại email...
    // await apiResendEmail({ email: userEmail.value })
    startCountdown()
  } catch (err) {
    console.error(err)
  } finally {
    store.setLoading(false)
  }
}

// Submit xác nhận OTP
const handleSubmit = async () => {
  const code = otpDigits.value.join('')
  if (code.length < 6) {
    otpError.value = 'Vui lòng nhập đủ 6 chữ số mã xác thực'
    return
  }

  store.setLoading(true)
  try {
    // API kiểm tra mã OTP...
    // await apiVerifyOtp({ email: userEmail.value, otpCode: code })

    emit('next')
  } catch (err) {
    console.error(err)
  } finally {
    store.setLoading(false)
  }
}

const onBack = () => {
  emit('back')
}

onMounted(() => {
  startCountdown()
  // Auto focus vào ô đầu tiên
  setTimeout(() => {
    otpInputs.value[0]?.focus()
  }, 100)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>