<template>
  <a :class="{on:params.value === activeValue}">{{ params.value }}</a>
</template>

<script>
export default {
  props: {
    params: {},
  },
  data() {
    return {
      activeValue: '',
    }
  },
  mounted() {
    this.activeValue = this.params.activeValue
  }
}
</script>

<style scoped>

</style>