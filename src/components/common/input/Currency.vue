<template>
    <label>{{ showValue }}</label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        modelValue: Number,
        labelBefore: String,
        labelAfter: String,
        defaultFomart: {
            type: Boolean,
            default: true
        },
        currency:
        {
            type: String,
            default: 'USD'
        },
        local: {
            type: String,
            default: 'en-US'
        },
    },
    data() {
        return {
            showValue: '',
        }
    },
    mounted() {
        this.format();
    },
    methods: {
        format() {
            var data = typeof this.modelValue == 'number' ? this.modelValue : 0;

            var formatter = new Intl.NumberFormat(this.local, {
                style: 'currency',
                currency: this.currency
            });
            if (this.defaultFomart) {
                this.showValue = formatter.format(data);
            } else {
                if(data != 0) {

                    var money = formatter.format(data);
                    this.showValue = `${this.labelBefore ? this.labelBefore : ''} ${money.replace("$", "").split('.')[0]} ${this.labelAfter ? this.labelAfter : ''}`;
                } else {
                    this.showValue = `${this.labelBefore ? this.labelBefore : ''}0 ${this.labelAfter ? this.labelAfter : ''}`;
                }
            }

        }
    }
})
</script>