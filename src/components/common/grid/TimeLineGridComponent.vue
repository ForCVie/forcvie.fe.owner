<template>
  <div class="flex justify-center items-center h-full w-full">
    <span
      v-for="(item, index) in listParams"
      :key="index"
      :class="`flex justify-center items-center time_line_table 
      ${item.check && 'on'}`"
      @click="addEvent(item)"
    >
      {{ item.value }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    params: {},
    onCustomEvent: null
  },
  mounted() {
    if (this.params) {
      this.listParams = this.params.value;
      this.id = this.params.data.id
    }
  },
  data() {
    return {
      listParams: [],
      id: ""
    };
  },
  methods: {
    addEvent(data:any) {
      if (typeof this.params.onCustomEvent === 'function') {
        this.params.onCustomEvent({...data,
          id: this.id
        })
      }
    }
  },
});
</script>
<style>
.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.time_line_table.on {
  color: rgb(39, 4, 255);
  border-color: rgb(39, 4, 255);
}
.time_line_table {
  color: #6f6f6f;
  border-color: #6f6f6f;
  border-width: 2px;
  border-style: solid;
  border-radius: 9999px;
  text-align: center;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
}
.time_line_table:hover {
  opacity: .7;
}
</style>
