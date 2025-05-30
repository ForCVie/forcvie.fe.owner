<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form_add_teacher'"
    @close-modal="onClose()"
  >
    <template #title>
      <strong>Resource Mng</strong>
    </template>
    <template #default>
        <div>
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 18%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">
                                Resource Name
                            </th>
                            <td class="td_input">
                                <InputBase id="input_major" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                URL
                            </th>
                            <td>
                                <InputBase id="input_deptment" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Method
                            </th>
                            <td>
                                <SelectBoxBase id="selectbox_validate" name="'selectbox'" :data="listMethod"
                                    required>
                                </SelectBoxBase>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Resource Type
                            </th>
                            <td>
                                <SelectBoxBase id="selectbox_validate" name="'selectbox'" :data="listMethod"
                                    required>
                                </SelectBoxBase>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="btn_sm btn_white border_medium_gray bo_rd4"
        @click="onClose()"
      >
        {{ t("common.close") }}
      </button>
    </template>
  </TModal>
</template>

<script setup lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import { commonStore } from "@/stores/common";

const { t } = useI18n();
const store = commonStore();

const props = defineProps({
  onClose: {
    type: Function,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
});

const dataForm = ref({

})

const listMethod = ref([
        {cdId: '', cdNm: '전체', upCdId: '1'},
        {cdId: '12', cdNm: '비게시', upCdId: '1'},
        {cdId: '13', cdNm: '비게시1', upCdId: '1'},
        {cdId: '14', cdNm: '비게시2', upCdId: '1'},
        {cdId: '15', cdNm: '비게시비게시비게시2', upCdId: '1'}
      ])

</script>

<style scoped></style>
