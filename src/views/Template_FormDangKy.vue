<script setup>
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import BaseStepper from "@/components/common/step/BaseStepper.vue";
import { FILE_TYPE_IMAGE, FILE_TYPE_OFFICE } from "@/constants/screen.const";
import { ref } from "vue";

const currentStep = ref(0);

const steps = [
  {
    title: "Thông tin cơ bản",
    subtitle: "Nhập thông tin cửa hàng",
  },
  {
    title: "Địa chỉ",
    subtitle: "Thiết lập địa chỉ cửa hàng",
  },
  {
    title: "Cấu hình",
    subtitle: "Thiết lập hoạt động",
  },
  {
    title: "Hoàn tất",
    subtitle: "Kiểm tra lại thông tin",
  },
]; // Dữ liệu form
const formData = reactive({
  businessField: "", // Hoặc giá trị mặc định, ví dụ: 'RETAIL',
  shortDescription: "",
  name: "",
  phone: "",
  selectedDate: "",
  avatar: [],
  gallery: [],
  rememberMe: true,
  paymentMethod: "",
  selectedCategories: [],
});
const currentMode = ref("CREATE"); // 'CREATE' | 'EDIT' | 'DETAIL'
// Danh sách Option chuẩn cấu trúc CodeMngModel (cdId - cdNm)
const businessCategories = ref([
  { cdId: "RETAIL", cdNm: "Bán lẻ / Thời trang" },
  { cdId: "FNB", cdNm: "Ẩm thực / F&B" },
  { cdId: "SERVICE_TECH", cdNm: "Dịch vụ / Công nghệ" },
]);
// Danh sách dữ liệu mẫu từ API (chuẩn CodeMngModel)
const categoryList = [
  { cdId: "01", cdNm: "Công nghệ" },
  { cdId: "02", cdNm: "Kinh doanh" },
  { cdId: "03", cdNm: "Giải trí" },
  { cdId: "04", cdNm: "Thể thao" },
];
const handleFinish = () => {
  console.log("Hoàn tất tạo cửa hàng");
};
</script>

<template>
  <section id="content" class="mt-5 mb-5" tabindex="0">
    <BaseStepper v-model="currentStep" :steps="steps">
      <!-- Bước 1: Form thông tin cơ bản -->
      <template #step-0>
        <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <!-- Input 1 -->
          <div class="sm:col-span-2">
            <InputBase
              v-model="formData.name"
              :label="'Tên cửa hàng'"
              required
            />
          </div>

          <!-- Input 2 -->
          <div>
            <InputBase
              v-model="formData.phone"
              :label="'Số điện thoại'"
              required
            />
          </div>

          <!-- Select -->
          <div>
            <SelectBoxBase
              id="businessField"
              label="Lĩnh vực kinh doanh"
              placeholder="Chọn lĩnh vực kinh doanh"
              v-model="formData.businessField"
              :data="businessCategories"
              required
            />
          </div>
          <!-- DatePicker (Đã dùng thư viện VueDatePicker) -->
          <div>
            <BaseDatePicker
              id="user_dob"
              v-model="formData.selectedDate"
              label="Ngày gia nhập"
              required
              :type="'year'"
            />
          </div>
          <div>
            <div class="p-4">
              <CheckboxBase
                v-model="formData.rememberMe"
                id="remember_me"
                label="Ghi nhớ đăng nhập"
              />
              <RadiobuttonBase
                v-model="formData.paymentMethod"
                name="payment_group"
                id="payment_cod"
                value="COD"
                label="Thanh toán khi nhận hàng (COD)"
              />
              <p class="mt-2 text-sm">
                Giá trị hiện tại: <strong>{{ formData.rememberMe }}</strong>
              </p>
            </div>
          </div>
          <div>
              <ListCheckBoxBase
                v-model="formData.selectedCategories"
                label="Thể loại bài viết"
                :list-data="categoryList"
                has-check-all
                :is-require="true"
                require-id="user_skills"
                check-all-label="Chọn tất cả"
              />
          </div>
          <div>
          </div>
          <div>
            <!-- Tải 1 ảnh (Single Image) -->
            <InputFileBase
              v-model="formData.avatar"
              id="store_avatar"
              label="Ảnh đại diện cửa hàng"
              subTitle="* Định dạng PNG, JPG. Dung lượng tối đa 5MB"
              :previewFlag="true"
              :multiple="true"
              :maxFile="5"
              :maxSize="5"
              :type="FILE_TYPE_IMAGE"
              :mode="currentMode"
            />
          </div>
          <div>
            <!-- Tải nhiều ảnh (Multiple Images Gallery) -->
            <InputFileBase
              v-model="formData.gallery"
              id="store_gallery"
              label="Hình ảnh cửa hàng"
              :multiple="true"
              :maxFile="5"
              :type="FILE_TYPE_OFFICE"
              :mode="currentMode"
            />
          </div>
          <!-- Textarea -->
          <div class="sm:col-span-2">
            <TextArea
              v-model="formData.shortDescription"
              label="Mô tả ngắn"
              required
              placeholder="Nhập mô tả về cửa hàng của bạn..."
              :rows="3"
            />
          </div>
        </div>
      </template>
    </BaseStepper>
  </section>
</template>
