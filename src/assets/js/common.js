/** 공통 import */
import Swal from "sweetalert2";

/** PC 헤더 GNB */
export function gnbOneDepth() {
  //pc 작동
  let gnbLinks = document.querySelectorAll(".gnb_1depth > li");

  function gnbMouseEnter() {
    let gnb2Depth = this.querySelector(".gnb_2depth");
    if (gnb2Depth) {
      gnb2Depth.style.maxHeight = gnb2Depth.scrollHeight + "px";
    }
  }

  function gnbMouseLeave() {
    let gnb2Depth = this.querySelector(".gnb_2depth");
    if (gnb2Depth) {
      gnb2Depth.style.maxHeight = "0";
    }
  }
  gnbLinks.forEach(function (link) {
    link.addEventListener("mouseenter", gnbMouseEnter);
    link.addEventListener("mouseleave", gnbMouseLeave);
  });
}

export function siteMap() {
  let body = document.body;
  let btnMenu = document.querySelector(".header_wrap .btn_menu");
  let btnMenuClose = document.querySelector(".menu_close");
  let sub2depthItems = document.querySelectorAll(".header_gnb_sitemap .sub_2depth > li");

  btnMenu.addEventListener("click", function () {
    body.classList.add("gnb");
  });
  btnMenuClose.addEventListener("click", function () {
    body.classList.remove("gnb");
  });

  if (sub2depthItems.length > 0) {
    sub2depthItems.forEach(function (item) {
      item.addEventListener("click", function () {
        body.classList.remove("gnb");
      });
    });
  }
}

/** moveTop */
export function moveTop() {
  var moveTopButton = document.querySelector(".move_top");

  function updateButtonVisibility() {
    if (window.scrollY > 200) {
      moveTopButton.classList.add("on");
    } else {
      moveTopButton.classList.remove("on");
    }
  }

  function scrollToTop() {
    var startTime;
    var duration = 300;
    var startScrollY = window.scrollY;
    var endScrollY = 0;

    function animateScroll(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }

      var elapsedTime = currentTime - startTime;
      var progress = Math.min(elapsedTime / duration, 1);

      window.scrollTo(0, startScrollY + (endScrollY - startScrollY) * progress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }

  window.addEventListener("scroll", updateButtonVisibility);
  moveTopButton.addEventListener("click", function () {
    scrollToTop();
  });

  // 초기 상태 설정
  updateButtonVisibility();
}

/** 공지사항, 설문조사, 만족도조사 컬러설정 */
export function setColors() {
  const listItems = document.querySelectorAll(".notice_box");

  listItems.forEach((item, index) => {
    if ((index + 1) % 3 === 1) {
      item.style.backgroundColor = "#8AA8E3";
    } else if ((index + 1) % 3 === 2) {
      item.style.backgroundColor = "#C2BAF2";
    } else {
      item.style.backgroundColor = "#F9D0AD";
    }
  });
}

/** 글자 수 제한, 클래스명으로 제어 */
export function letterCount() {
  function setupLetterCount(commentWrapper) {
    var wrapper = commentWrapper;
    var input = wrapper.querySelector("textarea, input");
    var counter = wrapper.querySelector(".letter_counter");
    var countLimit = parseInt(wrapper.classList[1].replace("count", ""));

    var spanElement = document.createElement("span");
    spanElement.textContent = "0";
    counter.appendChild(spanElement);

    input.addEventListener("input", function () {
      var countLength = this.value.length;

      spanElement.textContent = countLength;

      counter.innerHTML = "<span>" + countLength + "</span>/" + countLimit;

      if (countLength > countLimit) {
        const _text = countLimit + "자 이내로 작성하여 주십시오";
        Swal.fire({
          title: "알림",
          html: _text,
          confirmButtonColor: "#5D87FF",
          reverseButtons: true,
          confirmButtonText: "확인",
        });
        this.value = this.value.substring(0, countLimit);
        spanElement.textContent = countLimit;
        counter.innerHTML = "<span>" + countLimit + "</span>/" + countLimit;
      }
    });

    input.dispatchEvent(new Event("input"));
  }

  var commentWrappers = document.querySelectorAll(".letter_count");
  commentWrappers.forEach(function (commentWrapper) {
    setupLetterCount(commentWrapper);
  });
}

/** 아코디언 */
export function accordion() {
  /** 아코디언 구조 .accordion > .acd_tit + .acd_cnt 가 한 세트
   */
  const accordions = document.querySelectorAll(".accordion");
  const openAccordion = (accordion) => {
    const content = accordion.querySelector(".acd_cnt");
    accordion.classList.add("acd_active");
    content.style.maxHeight = "none";
  };
  const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".acd_cnt");
    accordion.classList.remove("acd_active");
    content.style.maxHeight = null;
  };
  accordions.forEach((accordion) => {
    const intro = accordion.querySelector(".acd_tit");
    const content = accordion.querySelector(".acd_cnt");

    intro.onclick = () => {
      if (content.style.maxHeight) {
        closeAccordion(accordion);
      } else {
        accordions.forEach((accordion) => closeAccordion(accordion));
        openAccordion(accordion);
      }
    };
  });
}

/** 테이블 체크 */
export function tblCheck() {
  var tblChoices = document.querySelectorAll(".tbl_check");

  tblChoices.forEach(function (tblChoice) {
    var checkAll = tblChoice.querySelector('input[name="tbl_checkall"]');
    var checks = tblChoice.querySelectorAll('input[name="tbl_check"]');
    var checkTotalCnt = checks.length;

    if (!checkAll) {
      return;
    }

    checkAll.addEventListener("change", function () {
      var isChecked = checkAll.checked;

      checks.forEach(function (check) {
        check.checked = isChecked;

        if (isChecked) {
          check.closest("tr").classList.add("on");
        } else {
          check.closest("tr").classList.remove("on");
        }
      });
    });

    checks.forEach(function (check) {
      check.addEventListener("change", function () {
        var checkSelected = Array.from(checks).filter(function (c) {
          return c.checked;
        });

        if (check.checked) {
          check.closest("tr").classList.add("on");
        } else {
          check.closest("tr").classList.remove("on");
        }

        checkAll.checked = checkSelected.length >= checkTotalCnt;
      });
    });

    checks.forEach(function (check) {
      check.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });
  });
}

/** 전체 체크 */
export function checkAll() {
  var checkAllWrappers = document.querySelectorAll(".check_all_wrap");

  checkAllWrappers.forEach(function (wrapper) {
    var checkAllCheckbox = wrapper.querySelector('input[name="checkall"]');
    var checkboxes = wrapper.querySelectorAll('input[name="check"]');

    function updateCheckAll() {
      var allChecked = true;

      checkboxes.forEach(function (checkbox) {
        if (!checkbox.disabled && !checkbox.checked) {
          allChecked = false;
        }
      });

      checkAllCheckbox.checked = allChecked;
    }

    checkAllCheckbox.addEventListener("change", function () {
      checkboxes.forEach(function (checkbox) {
        if (!checkbox.disabled) {
          checkbox.checked = checkAllCheckbox.checked;
        }
      });
    });

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", updateCheckAll);
    });

    updateCheckAll();
  });
}
