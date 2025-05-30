<template>
  <span v-if="params.value == 'Y'"> 고정 </span>
  <span v-else="params.value == 'N'">비고정</span> 
</template>

<script>
export default {
  props: {
    params: {},
    onCustomEvent: null,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    addEvent() {
      if (typeof this.params.onCustomEvent === "function") {
        this.params.onCustomEvent(this.params.data);
      }
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
