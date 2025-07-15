<template>
  <div class="timeline">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="timeline-item"
    >
      <div class="timeline-date">{{ item.time }}</div>

      <div class="timeline-marker-wrap">
        <!-- <div class="timeline-line" :class="{ 'last': index === items.length - 1 }"></div> -->
        <div class="timeline-dot"></div>
      </div>
        <div class="timeline-content">
        <div class="timeline-label">{{ item.label }}</div>
        <div class="timeline-desc" v-if="item.description">{{ item.description }}</div>
        </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: -5rem;
}
.timeline-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  margin-bottom: 2rem;
}
.timeline-date {
  width: 120px;
  text-align: right;
  padding-right: 2.5rem;
  color: #7d8592;
  font-size: 14px;
  flex: 1;
}
.timeline-marker-wrap {
  position: relative;
  width: 24px;
  display: flex;
  justify-content: center;
}
.timeline-dot {
  width: 15px;
  height: 15px;
  background-color: #1c1e21;
  border-radius: 50%;
  z-index: 1;
  margin-top: 2px;
  border: 2px solid #9ea1a5;
  position: relative;
}

/* Line kéo từ dot này xuống dot kế tiếp */
.timeline-item::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% + 4rem);
    background-color: #9ea1a5;
    z-index: 0;
}
.timeline-item:last-child::after {
  height: 0; /* Không kéo line xuống item cuối */
}

/* Nếu là item cuối, ẩn line dưới */
.timeline-item:last-child .timeline-dot::after {
  display: none;
}

.timeline-line {
  position: absolute;
  top: 10px;
  width: 2px;
  height: 190%;
  background-color: #d3d7de;
}
.timeline-line.last {
  height: 0;
}
.timeline-content {
  flex: 1;
  padding-left: 2.5rem;
  color: #1c1e21;
  font-weight: 500;
  text-align: left;
}
.timeline-label {
  font-weight: 600;
  color: #1c1e21;
}

.timeline-desc {
  font-size: 13px;
  color: #6c757d;
  margin-top: 2px;
}
</style>
