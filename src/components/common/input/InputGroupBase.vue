<template>
    <div class="input-group-base flex mb-2" v-for="(item, index) in listObject" :key="item.id">
        <template v-if="mode == modeDetail">
            <div class="mr-5  w-full">
                <input :type="type" :placeholder="placeholder" v-model="item.value" disabled />
            </div>
        </template>
        <template v-if="mode != modeDetail">
            <div class="flex w-full">
                <div class="mr-5 flex-[7]">
                    <input :type="type" :placeholder="placeholder" v-model="item.value" />
                </div>
                <div class=" flex-[1]">
                    <button v-if="index == 0"
                        class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                        @click="addObject">추가</button>
                    <button v-if="index != 0"
                        class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                        @click="deleteObject(item.id)">삭제</button>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { MODE_DETAIL, MODE_CREATE } from '@/constants/screen.const'

export default {
    name: 'InputGroupBase',
    props: {
        mode: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        listProps: {
            type: Array,
            default: [{
                id: `input-${Math.random().toString(36).substr(2, 9)}`,
                value: ''
            }]
        }
    },
    setup() {
        const modeCreate = MODE_CREATE
        const modeDetail = MODE_DETAIL

        return {
            modeCreate,
            modeDetail
        }
    },
    data() {
        return {
            inputValue: this.modelValue,
            listObject: []
        };
    },
    watch: {
        modelValue(newVal) {
            this.inputValue = newVal;
        }
    },
    beforeMount() {
        this.listObject = this.$props.listProps.length == 0 ? [{
                id: `input-${Math.random().toString(36).substr(2, 9)}`,
                value: ''
            }] : this.$props.listProps;

        this.emitListObject();
    },
    methods: {
        addObject() {
            this.listObject.push({
                id: `input-${Math.random().toString(36).substr(2, 9)}`,
                value: ''
            });
            this.emitListObject();
        },
        deleteObject(id) {
            this.listObject = this.listObject.filter(item => item.id !== id);
            this.emitListObject();
        },
        emitListObject() {
            this.$emit('update:listObject', this.listObject);
        }
    }
};
</script>

<style scoped>
.input-group-base {
    margin-bottom: 1em;
}
</style>