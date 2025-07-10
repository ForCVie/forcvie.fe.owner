<template>
    <QRCodeVue3 :width="props.width" :height="props.height" :value="props.urlValue" :imgclass="'img-qr'" :qrOptions="{
        typeNumber: '0',
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
    }" :imageOptions="{
        hideBackgroundDots: true,
        imageSize: 3,
        margin: 2
    }" :dotsOptions="{ type: 'square', color: '#05004d' }" :image="logoImage"
        :cornersSquareOptions="{ type: 'square', color: '#0e013c' }" />
        <span ></span>
</template>
<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3';

const logoImage = new URL('@/assets/images/logo.png', import.meta.url).href;
const props = defineProps({
    urlValue: String,
    width: {
        type: Number,
        default: 260
    },
    height: {
        type: Number,
        default: 260
    },
    note: {
        type: String,
        default: 'Lưu ý: Quét mã'
    }
});
</script>