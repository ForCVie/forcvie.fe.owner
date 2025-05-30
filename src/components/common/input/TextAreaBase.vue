<template>
    <textarea v-if="(mode == modeShow || mode == '') && !isDisable" :cols="cols" :rows="rows" :id="id" :name="name" :class="className"
        :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout"
        @change="change"></textarea>
    <textarea v-if="isDisable" :cols="cols" :rows="rows" :id="id" :name="name" disabled :class="className"
        :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout"
        @change="change"></textarea>
    <textarea v-if="mode == 'readonly'" :cols="cols" :rows="rows" :id="id" :name="name" readonly :class="className"
        :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout"
        @change="change"></textarea>
    <textarea v-if="mode == 'hidden'" :cols="cols" :rows="rows" :id="id" :name="name" hidden :class="className"
        :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout"
        @change="change"></textarea>
    <textarea v-if="mode == 'detail'" :cols="cols" :rows="rows" :id="id" :name="name" readonly :class="className"
        :placeholder="placeholder" :value="modelValue" @input="updateValue" @focusout="focusout"
        @change="change"></textarea>
</template>
<script lang="ts">
import { MODE_SHOW } from '../../../constants/screen.const';
import { MODE_HIDDEN } from '../../../constants/screen.const';
import { MODE_DETAIL } from '../../../constants/screen.const';
export default {
    props: {
        modelValue: {
            type: String,
            default: ""
        },
        placeholder: String,
        className: String,
        mode:{type: String,
            default: ''
        },
        id: String,
        name: String,
        cols : String,
        rows : {
            type : String,
            default: '10'
        },
        isDisable : {
            type : Boolean,
            default : false
        }
    },
    emits: [
        'update:modelValue',
        'focusout',
        'change'
    ],
    inheritAttrs: false,
    setup(props, { emit }) {
        const updateValue = (event:any) => emit('update:modelValue', event.target.value);
        const focusout = () => {
            emit('focusout');
        }
        const change = () => {
            emit('change');
        }
        const modeShow = MODE_SHOW;
        const modeHidden = MODE_HIDDEN;
        const modeDetail = MODE_DETAIL;
        return {
            updateValue,
            focusout,
            change,
            modeShow,
            modeHidden,
            modeDetail
        };
    },
};
</script>
