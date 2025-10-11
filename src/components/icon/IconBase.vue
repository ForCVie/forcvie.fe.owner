<template>
  <img :src="iconPath" :width="width" :height="height" :alt="icon" />
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '30',
  },
  height: {
    type: String,
    default: '30',
  },
  stroke: {
    type: String,
    default: '1.5', // sửa thành dấu chấm, không phải dấu phẩy
  },
  icon: {
    type: String,
    default: 'homepage.png',
  },
})

const { width, height, icon } = props;

const iconPath = `/src/assets/images/menu_icon/${props.icon?props.icon:'homepage.png'}`
</script>

<style scoped>
/* Bạn có thể thêm style tùy ý nếu cần */
</style>
