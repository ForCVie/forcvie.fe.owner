<template>
  <!-- :slides-per-view="2" :space-between="12" :pagination="true" :modules="modules" -->
  <swiper v-bind="swiperOptions" :modules="modules">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
      swiperOptions: {
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        },
        slidesPerView: 1,
        spaceBetween: 12,
        Pagination: true,
        navigation: true,
      },
    };
  },
};
</script>
