//popup content height
export function popupHeight() {
  const windowWidth = window.innerWidth;
  const popups = document.querySelectorAll(".overlay_popup");
  popups.forEach(function (popup) {
    const headerHeight = popup.querySelector(".popup_title").offsetHeight;
    const footer = popup.querySelector(".popup_footer");
    const footerHeight = footer.offsetHeight;
    const popupCnt = popup.querySelector(".popup_content");

    if (windowWidth > 480) {
      // const calculatedHeight = popupHeight - (headerHeight + footerHeight + 196);
      const calculatedHeight = `calc(100dvh - (${headerHeight}px + ${footerHeight}px + 196px) )`;
      popupCnt.style.maxHeight = calculatedHeight;
    } else {
      const calculatedHeight = `calc(100dvh - (${headerHeight}px + ${footerHeight}px))`;
      popupCnt.style.maxHeight = calculatedHeight;
    }

    const all = document.querySelectorAll(".popup_content > *");
    const scrollCnt = document.querySelector(".scroll_cnt");
    let totalHeightExcludingScrollCnt = 0;

    for (const child of all) {
      if (!child.classList.contains(".scroll_cnt")) {
        const childHeight = parseFloat(window.getComputedStyle(child).height);
        totalHeightExcludingScrollCnt += childHeight;
      }
    }

    if (scrollCnt) {
      const scrollCntHeight = scrollCnt.offsetHeight;
      if (windowWidth > 768) {
        const calculatedHeight = `calc(100dvh - (${headerHeight}px + ${footerHeight}px + ${totalHeightExcludingScrollCnt}px + 196px + 32px - ${scrollCntHeight}px) )`;
        scrollCnt.style.maxHeight = calculatedHeight;
      } else {
        const calculatedHeight = `calc(100dvh - (${headerHeight}px + ${footerHeight}px + ${totalHeightExcludingScrollCnt}px + 16px - ${scrollCntHeight}px) )`;
        scrollCnt.style.maxHeight = calculatedHeight;
      }
    }

    // popup_footer가 slot 안될때 사용
    // if (windowWidth > 480) {
    //   if (footer) {
    //     const calculatedHeight = `calc(100vh - (${headerHeight}px + ${footerHeight}px + 196px) )`;
    //     popupCnt.style.maxHeight = calculatedHeight;
    //   } else {
    //     const calculatedHeight = `calc(100vh - (${headerHeight}px + 196px) )`;
    //     popupCnt.style.maxHeight = calculatedHeight;
    //   }
    // } else {
    //   if (footer) {
    //     const calculatedHeight = `calc(100vh - (${headerHeight}px + ${footerHeight}px))`;
    //     popupCnt.style.maxHeight = calculatedHeight;
    //   } else {
    //     const calculatedHeight = `calc(100vh - (${headerHeight}px)`;
    //     popupCnt.style.maxHeight = calculatedHeight;
    //   }
    // }
  });
}
// export function popupOpen() {
// }
//popup resize event
export function resizePopup() {
  window.addEventListener("resize", function () {});
}
