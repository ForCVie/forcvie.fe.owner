<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="'Access Management'"></Breadcrumb>

    <div class="box">
      <div class="btn_group_menu">
        <button type="button" class="button btn_md btn_white border_medium_gray bo_rd4" @click="moveMenu('Menu')">Menu
        </button>
        <button type="button" class="button btn_md btn_white border_medium_gray bo_rd4" @click="moveMenu('Resource')">
          Resource
        </button>
        <button type="button" class="button btn_md btn_white border_medium_gray bo_rd4"
            @click="moveMenu('ResourceRole')">
          Role Resource
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import {SCREEN} from '../router/screen'
import {useRouter} from 'vue-router'
import Breadcrumb from "@/components/common/Breadcrumb.vue";

const router = useRouter()

const moveMenu = (name) => {
  let pathName = ''
  switch (name) {
    case 'Resource':
      pathName = SCREEN.resourceManagement.name
      break
    case 'Menu':
      pathName = SCREEN.pathMenu.name
      break
    case 'ResourceRole':
      pathName = SCREEN.roleResourceManagement.name
      break
  }
  router.push({name: pathName})
}

</script>

<style lang="scss" scoped>
.btn_group_menu {
  display: flex;
  gap: 16px;
}

.box {
  max-width: 100%;
  width: 100%;
}
</style>
