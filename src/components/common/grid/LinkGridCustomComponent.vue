<template>
  <span v-if="params.data.isPrint" :class="{active:params.data.isPrint}" @click="addEvent">{{ params.value }}</span>
  <a v-else>{{ params.value }}</a>
</template>

<script>
export default {
  props: {
    params: {},
    onCustomEvent: null
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    addEvent() {
      if (typeof this.params.onCustomEvent === 'function') {
        this.params.onCustomEvent(this.params.data)
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
/* Your styles here */
</style>