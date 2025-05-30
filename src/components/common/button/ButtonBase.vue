<template>
  <button
    type="button"
    class="button btn_lg btn_blue btn_responsive"
    @click="clickFunction"
    v-bind="attrs"
  >
    {{ buttonName }}
  </button>
</template>
<script lang="ts" setup>
import { defineProps, useAttrs, defineExpose } from "vue";
import Swal from "sweetalert2";
import { checkFlagStore } from "@/stores/common/checkRole";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const attrs = useAttrs();
const roleStore = checkFlagStore();
const emit = defineEmits(["click"]);
const props = defineProps({
  buttonName: String,
});
const clickFunction = () => {
  if (roleStore.flag) {
    emit("click");
  } else {
    Swal.fire({
      text: t("common.message.warring"),
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });
  }
};
</script>
