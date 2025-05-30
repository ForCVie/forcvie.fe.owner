<!-- 
  Vue-Select 플러그인 컴포넌트 화 
  사용 시 v-select 태그로 사용할 수 있다.
  
  * 참고
  현재 Vue3에선 베타 단계의 플러그인이지만 사용하는 기능이 얼마 되지않아 큰 문제가 되진 않을 것으로 판단됩니다.
  추후 추가적인 기능 부여 시 버전 확인이 필요합니다.
  관련 Docs: https://vue-select.org/
-->
<template>
  <v-select :options="options" :placeholder="placeholder" :clearable="false" :searchable="false">
    <!-- 항목이 없을 때 보여질 문구 -->
    <template v-slot:no-options>No Result</template>
  </v-select>
</template>

<script>
import vSelect from "vue-select";
import "@/assets/css/lib/vue_select/vue-select.css";

export default {
  components: { vSelect },
  props: {
    placeholder: { type: String, default: "전체" },
    options: { type: Object, required: true }, // 필수 값
  },
};
</script>
