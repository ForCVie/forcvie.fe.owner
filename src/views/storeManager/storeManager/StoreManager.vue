<template>
  <!-- Layout Container chuẩn -->
  <div class="flex-1 flex flex-col h-full overflow-y-auto relative w-full bg-[#f4f7f9] p-6 pb-14">
    <!-- Header Form mở rộng -->
    <div class="max-w-5xl mx-auto w-full mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Đăng ký tài khoản</h1>
      <p class="text-base text-gray-500 mt-1.5">Vui lòng điền đầy đủ thông tin bên dưới để tạo tài khoản mới.</p>
    </div>

    <!-- Form Main Content (Nâng kích thước max-w-5xl & padding p-8) -->
    <form @submit.prevent="handleSubmit" class="max-w-5xl mx-auto w-full bg-white p-8 rounded-[4px] shadow-sm border border-gray-100 flex flex-col gap-6">
      
      <!-- Khối 1: Thông tin cá nhân cơ bản (3 cột) -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Thông tin cá nhân</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Họ và tên -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Họ và tên <span class="text-red-500">*</span></label>
            <InputBase
              v-model="formData.fullName"
              placeholder="Nhập họ và tên"
              class="h-[42px] rounded-[4px]"
              :error="errors.fullName"
            />
          </div>

          <!-- Ngày sinh -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Ngày sinh</label>
            <DatePickerBase
              v-model="formData.dob"
              placeholder="Chọn ngày sinh"
              class="h-[42px] rounded-[4px]"
            />
          </div>

          <!-- Giới tính -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Giới tính</label>
            <div class="flex items-center gap-6 h-[42px]">
              <RadioBoxBase
                v-for="gender in genderOptions"
                :key="gender.value"
                v-model="formData.gender"
                :value="gender.value"
                :label="gender.label"
                name="gender"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Khối 2: Liên hệ & Tài khoản (3 cột) -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Liên hệ & Tài khoản</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Địa chỉ Email <span class="text-red-500">*</span></label>
            <InputBase
              v-model="formData.email"
              type="email"
              placeholder="example@domain.com"
              class="h-[42px] rounded-[4px]"
              :error="errors.email"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Số điện thoại <span class="text-red-500">*</span></label>
            <InputBase
              v-model="formData.phone"
              placeholder="Nhập số điện thoại"
              class="h-[42px] rounded-[4px]"
              :error="errors.phone"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Loại tài khoản</label>
            <SelectBoxBase
              v-model="formData.accountType"
              :options="accountTypeOptions"
              placeholder="Chọn loại tài khoản"
              class="h-[42px] rounded-[4px]"
            />
          </div>
        </div>
      </div>

      <!-- Khối 3: Mật khẩu & File đại diện -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Mật khẩu <span class="text-red-500">*</span></label>
          <InputBase
            v-model="formData.password"
            type="password"
            placeholder="Nhập mật khẩu"
            class="h-[42px] rounded-[4px]"
            :error="errors.password"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Xác nhận mật khẩu <span class="text-red-500">*</span></label>
          <InputBase
            v-model="formData.confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            class="h-[42px] rounded-[4px]"
            :error="errors.confirmPassword"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Ảnh đại diện</label>
          <InputFileBase
            v-model="formData.avatar"
            accept="image/*"
            class="h-[42px] rounded-[4px]"
          />
        </div>
      </div>

      <!-- Khối 4: Chi tiết bổ sung -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <!-- Lĩnh vực quan tâm -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Lĩnh vực quan tâm</label>
          <ListCheckBoxBase
            v-model="formData.interests"
            checkAllLabel="Chọn tất cả lĩnh vực"
            :listData="interestOptions"
          />
        </div>

        <!-- Giới thiệu bản thân -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Giới thiệu bản thân</label>
          <TextArea
            v-model="formData.bio"
            placeholder="Viết một vài dòng giới thiệu ngắn gọn..."
            :rows="4"
            class="rounded-[4px]"
          />
        </div>
      </div>

      <!-- Điều khoản & Quy định -->
      <div class="flex flex-col gap-1 mt-2">
        <CheckBoxBase
          v-model="formData.agreeTerms"
          label="Tôi đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật."
        />
        <span v-if="errors.agreeTerms" class="text-xs text-red-500">{{ errors.agreeTerms }}</span>
      </div>

      <!-- Action Button -->
      <div class="flex items-center justify-end gap-3 mt-4 pt-5 border-t border-gray-100">
        <button
          type="button"
          @click="handleReset"
          class="h-[42px] px-6 rounded-[4px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Làm mới
        </button>
        <button
          type="submit"
          class="h-[42px] px-8 rounded-[4px] bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Đăng ký tài khoản
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface RegisterForm {
  fullName: string
  dob: string
  gender: string
  email: string
  phone: string
  accountType: string
  avatar: File | null
  password: string
  confirmPassword: string
  interests: (string | number)[]
  bio: string
  agreeTerms: boolean
}

const formData = reactive<RegisterForm>({
  fullName: '',
  dob: '',
  gender: 'male',
  email: '',
  phone: '',
  accountType: '',
  avatar: null,
  password: '',
  confirmPassword: '',
  interests: [],
  bio: '',
  agreeTerms: false
})

const errors = reactive<Record<string, string>>({})

const genderOptions = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' }
]

const accountTypeOptions = [
  { label: 'Cá nhân', value: 'personal' },
  { label: 'Doanh nghiệp', value: 'business' },
  { label: 'Đối tác / Đại lý', value: 'partner' }
]

const interestOptions = [
  { id: 'tech', name: 'Công nghệ & Phần mềm' },
  { id: 'design', name: 'Thiết kế & Đồ họa' },
  { id: 'marketing', name: 'Marketing & Truyền thông' },
  { id: 'finance', name: 'Tài chính & Đầu tư' }
]

const handleSubmit = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  let isValid = true

  if (!formData.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ và tên'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Vui lòng nhập địa chỉ email'
    isValid = false
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Vui lòng nhập mật khẩu'
    isValid = false
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    isValid = false
  }

  if (!formData.agreeTerms) {
    errors.agreeTerms = 'Bạn cần đồng ý với điều khoản dịch vụ'
    isValid = false
  }

  if (isValid) {
    console.log('Form Submit Data:', formData)
    alert('Đăng ký tài khoản thành công!')
  }
}

const handleReset = () => {
  formData.fullName = ''
  formData.dob = ''
  formData.gender = 'male'
  formData.email = ''
  formData.phone = ''
  formData.accountType = ''
  formData.avatar = null
  formData.password = ''
  formData.confirmPassword = ''
  formData.interests = []
  formData.bio = ''
  formData.agreeTerms = false

  Object.keys(errors).forEach(key => delete errors[key])
}
</script>