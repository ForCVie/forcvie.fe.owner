// File: src/plugins/sweetalert.ts (hoặc đường dẫn file base hiện tại của bạn)
import Swal, { SweetAlertIcon } from "sweetalert2";
import { App } from "vue";

// 1. Hàm Alert mặc định
const alert = (_text: string, _title?: string, callback?: () => void) => {
  Swal.fire({
    title: (_title ?? "") === "" ? "" : _title,
    html: _text,
    confirmButtonColor: "#f97316",
    reverseButtons: true,
    confirmButtonText: "Đồng ý",
    customClass: {
      popup: "rounded-2xl shadow-xl border border-slate-100",
      title: "text-lg font-bold text-slate-800",
      htmlContainer: "text-sm text-slate-600",
      confirmButton: "!bg-orange-500 hover:!bg-orange-600 !px-5 !py-2.5 !rounded-lg !text-sm !font-semibold !shadow-sm"
    }
  }).then(() => {
    if (callback && typeof callback === "function") {
      callback();
    }
  });
};

// 2. Hàm Confirm xác nhận
const confirm = (_text: string, _title: string, callback: Function) => {
  Swal.fire({
    title: (_title ?? "") === "" ? "" : _title,
    html: _text,
    confirmButtonColor: "#ef4444",
    showCancelButton: true,
    cancelButtonColor: "#fff",
    reverseButtons: true,
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Quay lại",
    customClass: {
      popup: "rounded-2xl shadow-xl border border-slate-100",
      title: "text-lg font-bold text-slate-800",
      htmlContainer: "text-sm text-slate-600",
      confirmButton: "!bg-red-500 hover:!bg-red-600 !px-4 !py-2.5 !rounded-lg !text-sm !font-semibold !shadow-sm !ml-2",
      cancelButton: "!bg-slate-200 hover:!bg-slate-300 !text-slate-700 !px-4 !py-2.5 !rounded-lg !text-sm !font-semibold !shadow-sm"
    }
  }).then((res) => {
    if (callback && typeof callback === "function" && res.isConfirmed) {
      callback(res.isConfirmed);
    }
  });
};

// 3. Hàm Toast (giữ nguyên gốc của bạn ở dưới cùng)
const toast = (_title: string, _icon: SweetAlertIcon) => {
  const swalToast = Swal.mixin({
    customClass: "custom_toast",
    buttonsStyling: false,
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    backdrop: false,
    transition: "bounce",
    timer: 3000,
    didOpen: (toastEl) => {
      toastEl.onmouseenter = Swal.stopTimer;
      toastEl.onmouseleave = Swal.resumeTimer;
    },
  });
  swalToast.fire({
    icon: _icon,
    title: _title,
  });
};

// ===================================================================
// 4. THÊM MỚI: Hàm Notice hiển thị góc phải bên trên (Top-Right)
// ===================================================================
const notice = (_title: string, _type: "success" | "warning" | "error" = "success") => {
  const iconColors = {
    success: "#10b981", 
    warning: "#f97316", 
    error: "#ef4444"    
  };

  const swalNotice = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true, // <-- BẬT NÚT TẮT (X) TRÊN NOTICE
    timer: 3000,
    timerProgressBar: true,
    backdrop: false, 
    iconColor: iconColors[_type],
    customClass: {
      // Thêm !pr-10 (padding-right) để nhường chỗ cho nút X và dùng relative để định vị
      popup: "!flex !items-center !rounded-xl shadow-lg border border-slate-100 !pl-4 !pr-10 !py-3 relative", 
      icon: "!m-0 !mr-3 !border-2", 
      title: "!m-0 !p-0 !text-sm !font-semibold !text-slate-700 !leading-none",
      htmlContainer: "!hidden",
      // Căn giữa nút X theo chiều dọc và đặt sang mép phải
      closeButton: "!absolute !right-2 !top-1/2 !-translate-y-1/2 !m-0 !p-0 !text-slate-400 hover:!text-slate-600 focus:!outline-none !border-none !bg-transparent"
    },
    didOpen: (toastEl) => {
      toastEl.onmouseenter = Swal.stopTimer;
      toastEl.onmouseleave = Swal.resumeTimer;
    },
  });

  swalNotice.fire({
    icon: _type,
    title: _title,
  });
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$alert = alert;
    app.config.globalProperties.$confirm = confirm;
    app.config.globalProperties.$toast = toast;
    
    // Đăng ký $notice vào biến toàn cục của Vue
    app.config.globalProperties.$notice = notice; 
  },
};