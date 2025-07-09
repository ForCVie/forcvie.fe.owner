<template>
  <span class="badge-container">
    <slot></slot>
    <span v-if="count > 0" class="badge" :class="position">{{
      displayCount(count, max)
    }}</span>
  </span>
</template>

<script lang="ts" setup>
defineProps({
  count: {
    type: Number,
    default: 0, // Số hiển thị trên badge
  },
  position: {
    type: String,
    default: "top-right", // Vị trí của badge: top-right, top-left...
  },
  max: {
    type: Number,
    default: 99, // Giới hạn hiển thị số lớn nhất
  },
});
const displayCount = (count: number, max: number) => {
  if (max > 0 && count > max) {
    return `+${max}`;
  }
  return `${count}`;
};
</script>

<style scoped>
.badge-container {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  background-color: #ff4d4f;
  color: white;
  font-size: 12px;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 12px;
  white-space: nowrap;
}

.badge.top-right {
  top: -8px;
  right: -25px;
}

.badge.top-left {
  top: -5px;
  left: -5px;
}

.badge.bottom-right {
  bottom: -5px;
  right: -5px;
}

.badge.bottom-left {
  bottom: -5px;
  left: -5px;
}
</style>
