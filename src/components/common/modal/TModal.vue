<template>
  <Transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div class="overlay_popup" v-if="isOpen" >
      <div class="overlay_bg" :class="isOpen ? 'on' : ''" @click="closeModal"></div>
      <Transition
          enter-active-class="transition ease-out duration-200 transform"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in duration-200 transform"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div class="popup_wrap" v-if="isOpen" :style="isQr ? 'max-width:600px;' :''" ref="modalContentRef">
          <div class="popup_title" v-if="isShowHeader">
            <button type="button" class="popup_close" @click="closeModal">닫기</button>
            <h3>
              <!-- template v-slot:title (Start) -->
              <slot name="title"></slot>
              <!-- template v-slot:title (End) -->
            </h3>
          </div>

          <div class="popup_content">
            <slot :modal-id="modalId"></slot>
            <!-- 본문영역 slot 입력 X -->
          </div>

          <div class="popup_footer" v-if="isShowFooter">
            <slot name="footer" ></slot>
            <!-- template v-slot:content -->
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts">
import {onMounted, onUpdated} from "vue";

export default {
  props: {
    isOpen: Boolean,
    isShowHeader: {
      type: Boolean,
      default: true
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    modalId: String,
    isQr : {
      type : Boolean,
      default : false
    }
  },
  setup(props, ctx) {
    onMounted(() => {
      calculatorContent()
    })
    onUpdated(() => {
      calculatorContent()
    })
    const calculatorContent = () => {
      const element = document.getElementsByClassName('popup_content')
      if (element[0] && element[0].scrollHeight && element[0].clientHeight && element[0].scrollHeight > element[0].clientHeight) {
        element[0].classList.add('has_overflow')
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s,
  transform 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.overlay_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Nền đen với độ mờ 50% */
  pointer-events: none; /* Không cản trở các tương tác với nội dung bên dưới */
}

.popup_wrap {
  z-index: 999;
  width: 50dvw;
}

.popup_content {
  max-height: 60dvh;
  //overflow: scroll;
}

html:has(.overlay_bg.on) .header_wrapper,
html:has(.overlay_bg.on) .footer_wrapper,
html:has(.overlay_bg.on) #main_content {
  padding-right: 10px;
}
</style>