export const promotionRoute = {
  bannerMng: {
    path: "/promotion/banner",
    name: "bannerMng",
    component: import("@/views/promotionMng/bannerMng/BannerMng.vue"),
  },
  bannerMngForm: {
    path: "/promotion/banner/form",
    name: "bannerMngForm",
    component: import("@/views/promotionMng/bannerMng/BannerMngForm.vue"),
  },
  bannerTeeMng: {
    path: "/promotion/banner-tee",
    name: "bannerTeeMng",
    component: import("@/views/promotionMng/bannerTee/BannerTee.vue"),
  },
  bannerTeeMngForm: {
    path: "/promotion/banner-tee/form",
    name: "bannerTeeMngForm",
    component: import("@/views/promotionMng/bannerTee/BannerTee.vue"),
  },
  popupPromotion: {
    path: "/promotion/popup-notice",
    name: "popupPromotion",
    component: import(
      "@/views/promotionMng/popupPromotion/PopupPromotionMng.vue"
    ),
  },
  popupPromotionFrom: {
    path: "/promotion/popup-notice/form",
    name: "popupPromotionFrom",
    component: import(
      "@/views/promotionMng/popupPromotion/PopupPromotionForm.vue"
    ),
  },
};
