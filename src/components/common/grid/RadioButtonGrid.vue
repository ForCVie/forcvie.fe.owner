<template>
    <input   class="input_grid" type="radio"  @change="handleChange" :checked="checkedValue" :name="name" :id="id"/>
</template>
<script setup lang="ts">
import {defineProps, defineEmits, onMounted, onBeforeUnmount, onUpdated, useAttrs} from 'vue'
const props = defineProps({
    params: {}
})
const checkedValue = ref(false)
const name = ref('')
const id=ref("")
onMounted(() => {
    if(props.params) {
        name.value = props.params?.name
       id.value = props.params?.data[props.params?.id]
       checkedValue.value = props.params?.data['checkedFlag']
    }
})
const handleChange = ()=>{
    if (typeof props.params.onCustomEvent === 'function') {
        props.params?.onCustomEvent(props.params?.data)
}
}

</script>

<style lang="scss">
.input_grid{
    height: 18px;
    accent-color: #099337;
}
</style>