<template>
  <p>
  <button class="button btn_blue btn_xs btn_grid" @click="addEvent">{{t('common.select')}}</button>
  </p>
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
  setup(){
    const {t} = useI18n()
    return {
      t
    }
  },
  methods: {
    addEvent() {
      if (typeof this.params.onCustomEvent === 'function') {
        
        this.params.onCustomEvent(this.params.data)
      }
    }
  }
}
</script>

<style scoped>
/* Your styles here */
</style>