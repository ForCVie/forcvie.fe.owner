<template>
  <TModal
    v-if="modalOpen"
    :is-open="modalOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="modalId"
    :isQr="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>{{ titleVal }}</strong>
    </template>
    <div class="mypage_img_custom wd_260">만족도 조사 공유하기</div>
    <div class="button_dowLoad_custom">
      <button
        class="button btn_xs btn_blue btn_responsive"
        @click="downloadPNG"
      >
        {{ t("common.dowloadPng") }}
      </button>
      <button
        class="button btn_xs btn_blue btn_responsive"
        @click="downloadJPG"
      >
        {{ t("common.dowloadJpg") }}
      </button>
    </div>
    <div class="mypage_img_custom">
      <QRCodeVue3
        :width="260"
        :height="300"
        :value="urlValue"
        :imgclass="'img-qr'"
        :qrOptions="{
          typeNumber: '0',
          mode: 'Byte',
          errorCorrectionLevel: 'Q',
        }"
        :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
        :dotsOptions="{ type: 'square', color: '#05004d' }"
        :cornersSquareOptions="{ type: 'square', color: '#0e013c' }"
      />
    </div>

    <div class="mypage_img_custom">
      {{ t("common.copyUrlLabel") }}
      <button class="button btn_xs btn_blue btn_responsive" @click="copyUrl">
        {{ t("common.btnCopyUrl") }}
      </button>
    </div>

    <template #footer>
      <button
        class="button btn_xs btn_black btn_responsive"
        style="max-width: 200px"
        @click="closeModal"
      >
        닫기
      </button>
    </template>
  </TModal>
</template>
<script setup type="lang">
  import QRCodeVue3 from 'qrcode-vue3';
  import {ref, defineProps, defineEmits} from 'vue'
  import { useI18n } from "vue-i18n";
  import Swal from "sweetalert2";

  const { t } = useI18n();
  const props = defineProps({
    urlValue : {type : String,
    },
    titleVal : String,
    modalOpen : {
        type : Boolean,
        default: false
    }
   });
   const emit = defineEmits(["update:modalOpen"]);
   const {urlValue, titleVal} = props

   const closeModal = ()=> {
    emit("update:modalOpen",false);
   }
  const handleDownload = (dataUrl, extension) => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `qrcode.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

  const downloadJPG = () => {
          const pngDataUrl = document.querySelector('.img-qr')?.getAttribute('src');
            if (pngDataUrl) {
                handleDownload(pngDataUrl, 'jpg');
            }
        };

  const downloadPNG = () => {
            const pngDataUrl = document.querySelector('.img-qr')?.getAttribute('src');
            if (pngDataUrl) {
                handleDownload(pngDataUrl, 'png');
            }
        };

  const  copyUrl = () => {
      const urlInput = document.createElement('input');
      document.body.appendChild(urlInput);
      urlInput.value = urlValue;
      urlInput.select();
      document.execCommand('copy');
      document.body.removeChild(urlInput);
      Swal.fire({
          text: t("common.message.copyUrl"),
          type: "warning",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: t("common.confirm"),
    });
  }
</script>
<style lang="scss">
.mypage_img_custom {
  position: relative;
  margin: 0 auto 10px !important;
  display: table;
}
.button_dowLoad_custom {
  position: relative;
  display: flex;
  justify-content: space-evenly;
}
</style>
