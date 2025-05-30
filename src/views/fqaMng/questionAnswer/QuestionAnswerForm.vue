<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">Tiêu Đề</th>
              <td class="td_input">
                <InputBase
                  v-model:modelValue="dataDetail.title"
                  id="title"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Người Hỏi</th>
              <td class="td_input">
                <InputBase
                  v-model:modelValue="dataDetail.userQuestion"
                  id="userQuestion"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Ngày Hỏi</th>
              <td class="td_input">
                <BaseDatePicker
                  v-model:modelValue="dataDetail.questionDate"
                  id="questionDate"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Câu Hỏi</th>
              <td class="td_input">
                <TextArea
                  v-model:modelValue="dataDetail.question"
                  id="question"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Người Trả Lời</th>
              <td class="td_input">
                <InputBase
                  v-model:modelValue="dataDetail.userAnswer"
                  id="userAnswer"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Ngày Trả Lời</th>
              <td class="td_input">
                <BaseDatePicker
                  v-model:modelValue="dataDetail.answerDate"
                  id="answerDate"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">Trả Lời</th>
              <td class="td_input">
                <TextArea v-model:modelValue="dataDetail.answer" id="answer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section">
        <div class="btn_area">
          <button @click="back" type="button" class="button btn_xs btn_white">
            {{ t("common.list") }}
          </button>
          <button type="button" class="button btn_xs btn_blue">
            {{ t("common.saveTemp") }}
          </button>
          <button type="button" class="button btn_xs btn_blue">
            {{ t("common.save") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import router from "@/router";
import { fqaRoute } from "@/router/routeItems/fqaRoute";
import { commonStore } from "@/stores/common";
import { AdQuestionAnswerDetailDTO } from "@/stores/fqaMng/questionAnswer/questionAnswer.type";

const { t } = useI18n();
const store = commonStore();
const alert = useAlert();
const confirm = useConfirm();

const id = ref<string>();

const pageTitle = ref("Trả Lời Câu Hỏi");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);

const dataDetail = ref<AdQuestionAnswerDetailDTO>({
  answer: "",
  answerDate: new Date(),
  qaSeq: "",
  question: "",
  questionDate: new Date(),
  title: "",
  userAnswer: "",
  userQuestion: "",
});

const back = () => {
  router.push({ path: fqaRoute.questionAnswerMng.path });
};
</script>
