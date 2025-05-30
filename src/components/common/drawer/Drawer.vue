<template>
  <div>
    <!-- Overlay (Nền mờ khi mở Drawer) -->
    <div v-if="isOpen" class="overlay" @click="closeDrawer"></div>

    <!-- Drawer -->
    <transition :name="transitionName">
      <div v-if="isOpen" :class="['drawer', positionClass]">
        <button class="close-btn" @click="closeDrawer">&times;</button>
        <slot></slot> <!-- Nội dung drawer -->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    position: {
      type: String,
      default: "right", // Mặc định drawer nằm bên phải
      validator: (value) => ["left", "right"].includes(value)
    }
  },
  computed: {
    positionClass() {
      return this.position === "left" ? "drawer-left" : "drawer-right";
    },
    transitionName() {
      return this.position === "left" ? "slide-left" : "slide-right";
    }
  },
  emits: ["close"],
  methods: {
    closeDrawer() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Drawer chung */
.drawer {
  position: fixed;
  top: 0;
  width: 300px;
  height: 100%;
  background: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
}

/* Drawer bên phải */
.drawer-right {
  right: 0;
  transform: translateX(0);
}

/* Drawer bên trái */
.drawer-left {
  left: 0;
  transform: translateX(0);
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

/* Transition (Hiệu ứng trượt) */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}

/* Drawer bên phải trượt vào/ra */
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Drawer bên trái trượt vào/ra */
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
