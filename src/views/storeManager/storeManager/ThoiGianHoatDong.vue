<template>
  <form class="space-y-6">
    <div class="grid grid-cols-1 gap-6">
      <!-- Tiêu đề & Mô tả bước -->
      <div>
        <h3 class="text-base font-semibold text-gray-800">
          Cấu hình thời gian hoạt động
        </h3>
        <p class="text-sm text-gray-500 mt-0.5">
          Thiết lập giờ mở/đóng cửa cho từng ngày trong tuần của cửa hàng.
        </p>
      </div>

      <!-- Thiết lập nhanh cho tất cả các ngày -->
      <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 class="text-sm font-semibold text-gray-700 mb-3">
          Thiết lập nhanh hàng loạt
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <BaseDatePicker
              v-model="defaultOpenTime"
              type="time"
              required
              label="Giờ mở cửa chung"
              placeholder="Chọn giờ mở cửa"
              :showMess="false"
            />
          </div>
          <div>
            <BaseDatePicker
              v-model="defaultCloseTime"
              type="time"
              required
              label="Giờ đóng cửa chung"
              placeholder="Chọn giờ đóng cửa"
              :showMess="false"
            />
          </div>
          <div>
            <ButtonBase
              type="button"
              class="button primary"
              @click="handleApplyToAll"
              :button-name="'Áp dụng tất cả ngày mở'"
            >
            </ButtonBase>
          </div>
        </div>
      </div>

      <!-- Danh sách lịch hoạt động chi tiết từng ngày -->
      <div
        class="border border-slate-100 rounded-xl p-4 divide-y divide-slate-100 bg-white"
      >
        <div
          v-for="day in scheduleList"
          :key="day.dayId"
          class="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <!-- Checkbox Bật/Tắt ngày -->
          <div class="min-w-[160px]">
            <CheckboxBase v-model="day.isOpen" :label="day.dayName" />
          </div>

          <!-- Khung giờ chi tiết nếu mở cửa -->
          <div
            v-if="day.isOpen"
            class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <BaseDatePicker
              v-model="day.openTime"
              type="time"
              label="Giờ mở cửa"
              :isRequire="true"
            />
            <BaseDatePicker
              v-model="day.closeTime"
              type="time"
              label="Giờ đóng cửa"
              :isRequire="true"
            />
          </div>

          <!-- Trạng thái đóng cửa -->
          <div
            v-else
            class="flex-1 flex items-center text-slate-400 text-sm italic"
          >
            Cửa hàng đóng cửa vào ngày này
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER CHO BƯỚC NÀY -->
    <div
      class="flex items-center justify-between border-t border-slate-100 pt-6"
    >
      <!-- Nút Back -->
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        :disabled="isFirstStep"
        @click="onBack"
      >
        Quay lại
      </button>

      <!-- Nút Next -->
      <button
        type="button"
        @click="handleSubmit"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50"
        :disabled="store.loading"
      >
        <svg
          v-if="store.loading"
          class="h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>{{ isLastStep ? "Hoàn tất" : "Tiếp tục" }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { commonStore } from "@/stores/common";
import { useToast } from "@/components/common/composables/useAlert";
import { useI18n } from "vue-i18n";
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

const props = defineProps({
  isFirstStep: { type: Boolean, default: false },
  isLastStep: { type: Boolean, default: false },
  modelValue: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["next", "back", "update:modelValue"]);
const store = commonStore();
const alert = useToast();
const { t } = useI18n();

// Khởi tạo danh sách ngày trong tuần binding trực tiếp vào modelValue (hoặc biến local rồi sync)
const defaultDays = [
  {
    dayId: "MON",
    dayName: "Thứ Hai",
    isOpen: true,
    openTime: "08:00",
    closeTime: "22:00",
  },
  {
    dayId: "TUE",
    dayName: "Thứ Ba",
    isOpen: true,
    openTime: "08:00",
    closeTime: "22:00",
  },
  {
    dayId: "WED",
    dayName: "Thứ Tư",
    isOpen: true,
    openTime: "08:00",
    closeTime: "22:00",
  },
  {
    dayId: "THU",
    dayName: "Thứ Năm",
    isOpen: true,
    openTime: "08:00",
    closeTime: "22:00",
  },
  {
    dayId: "FRI",
    dayName: "Thứ Sáu",
    isOpen: true,
    openTime: "08:00",
    closeTime: "22:00",
  },
  {
    dayId: "SAT",
    dayName: "Thứ Bảy",
    isOpen: true,
    openTime: "08:00",
    closeTime: "22:30",
  },
  {
    dayId: "SUN",
    dayName: "Chủ Nhật",
    isOpen: true,
    openTime: "08:00",
    closeTime: "22:30",
  },
];

const scheduleList = ref(props.modelValue.operatingHours || defaultDays);

const defaultOpenTime = ref("08:00");
const defaultCloseTime = ref();

// Hàm thiết lập nhanh hàng loạt
const handleApplyToAll = () => {
  scheduleList.value.forEach((day) => {
    if (day.isOpen) {
      day.openTime = defaultOpenTime.value;
      day.closeTime = defaultCloseTime.value;
    }
  });
};

const handleSubmit = async () => {
  // Validate nếu cần (Ví dụ kiểm tra store.check hoặc validate giờ mở/đóng)
  if (store.checkRequired()) {
    alert(
      t("common.messageValidateRequired"),
      t("common.alertTitle"),
      () => {},
    );
    return;
  }

  store.setLoading(true);
  try {
    // Đẩy dữ liệu thời gian hoạt động ngược lên modelValue của form cha
    emit("update:modelValue", {
      ...props.modelValue,
      operatingHours: scheduleList.value,
    });

    // Gọi event cho BaseStepper nhảy bước tiếp theo
    emit("next");
  } catch (err) {
    console.error(err);
  } finally {
    store.setLoading(false);
  }
};

const onBack = () => {
  emit("back");
};
</script>
