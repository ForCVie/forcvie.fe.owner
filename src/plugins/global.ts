import Swal, { SweetAlertIcon } from "sweetalert2";
import { App } from "vue";

const alert = (_text: string, _title?: string, callback?: () => void) => {
  Swal.fire({
    // title: (_title ?? "") === "" ? "알림" : _title,
    title: "",
    html: _text,
    confirmButtonColor: "#5D87FF",
    reverseButtons: true,
    confirmButtonText: "확인",
  }).then(() => {
    if (callback && typeof callback === "function") {
      callback();
    }
  });
};

const confirm = (_text: string, _title: string, callback: Function) => {
  Swal.fire({
    // title: (_title ?? "") === "" ? "알림" : _title,
    title: "",
    html: _text,
    confirmButtonColor: "#5D87FF",
    showCancelButton: true,
    cancelButtonColor: "#fff",
    reverseButtons: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  }).then((res) => {
    if (callback && typeof callback === "function" && res.isConfirmed) {
      callback(res.isConfirmed);
    }
  });
};

const toast = (_title: string, _icon: SweetAlertIcon) => {
  const swalToast = Swal.mixin({
    customClass: "custom_toast",
    buttonsStyling: false,
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  swalToast.fire({
    title: _title,
  });
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$alert = alert;
    app.config.globalProperties.$confirm = confirm;
    app.config.globalProperties.$toast = toast;
  },
};
