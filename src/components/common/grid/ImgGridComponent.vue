<template>
  <div>
    <img class="img_grid" :src="params.img" />
  </div>
</template>

<script>
export default {
  props: {
    params: {},
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style>
/* Your styles here */
.img_grid {
    height: 140px;
}
</style>