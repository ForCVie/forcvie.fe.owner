/** 공통 import */
import Swal from "sweetalert2";

// 상담스케줄 이벤트
export function cnslrClick() {
  const cnslTable = document.querySelector(".cnsl_table");
  const tdButton = cnslTable.querySelectorAll("td");
  const swalToast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  tdButton.forEach(function (td) {
    const psbl = td.classList.contains("psbl");
    const cmplt = td.classList.contains("cmplt");
    const impsbl = td.classList.contains("impsbl");
    td.addEventListener("click", function () {
      if (impsbl) {
        this.classList.toggle("impsbl");
        this.classList.toggle("psbl");
      } else if (psbl) {
        this.classList.toggle("psbl");
        this.classList.toggle("impsbl");
      } else if (cmplt) {
        const _text = "이미 상담 신청이 완료된 시간입니다." + `<br />` + "상담을 취소하시겠습니까?";
        const _text2 = "정말 상담을 취소하시겠습니까?";
        Swal.fire({
          title: "알림",
          html: _text,
          confirmButtonColor: "#5D87FF",
          showCancelButton: true,
          cancelButtonColor: "#fff",
          reverseButtons: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "알림",
              html: _text2,
              confirmButtonColor: "#5D87FF",
              showCancelButton: true,
              cancelButtonColor: "#fff",
              reverseButtons: true,
              confirmButtonText: "확인",
              cancelButtonText: "취소",
            }).then((result) => {
              if (result.isConfirmed) {
                swalToast.fire({
                  icon: "success",
                  title: "상담이 취소 되었습니다.",
                });
                this.classList.remove("cmplt");
                this.classList.add("impsbl");
              }
            });
          }
        });
      }
    });
  });
}
