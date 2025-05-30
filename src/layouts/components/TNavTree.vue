<template>
  <ul class="nav-tree">
    <li v-for="item in menuItems" :key="item.menuId">
      <details v-if="item.children.length">
        <summary>{{ item.nm }}</summary>
        <TNavTree :menu-items="item.children"></TNavTree>
      </details>
      <a :href="item.route" @click="goToMenu(item.route, item.name)" v-else>{{ item.nm }}</a>
    </li>
  </ul>
</template>

<script>
import router from "@/router";
export default {
  name: "NavTree",
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToMenu(path, name) {
      router.push({ path: path, name: name });
    },
  },
};
</script>

<style scoped>
.nav-tree {
  list-style: none;
  padding-left: 20px;
}
.nav-tree li {
  margin-bottom: 5px;
}
.nav-tree summary {
  cursor: pointer;
  font-weight: bold;
}
</style>
