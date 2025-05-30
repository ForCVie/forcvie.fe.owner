<template>
  <!-- 메인화면에만 mainpage -->
  <div class="content_wrap dashboard">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">My<br />Dashboard</h2>
        <div class="year_select select_row sm">
          <vue-select
            class="select_box"
            :options="selectOption"
            v-model="year"
            @option:selected="changeYear"
          ></vue-select>
        </div>
      </div>
      <div class="sub_section">
        <div class="dshb_banner">
          <div>
            <img
              src="@/assets/images/main/main_banner_kaywon.png"
              alt="계원대학교"
            />
            <div class="title">
              <strong>역량기반 교육과정</strong>
              <p>관리시스템</p>
            </div>
            <img src="@/assets/images/main/main_banner_play.png" alt="play" />
            <div class="course_schedule">
              <strong>강의설계 일정</strong>
              <p
                v-if="
                  planDoc.lectPlanDocWriteStrDate &&
                  planDoc.lectPlanDocWriteEndDate
                "
              >
                {{ planDoc.term }} 강의계획서 작성 기간입니다({{
                  planDoc.lectPlanDocWriteStrDate
                }}
                ~ {{ planDoc.lectPlanDocWriteEndDate }}).
              </p>
              <p
                v-if="
                  evalPlan.evalPlanDocWriteStrDate &&
                  evalPlan.evalPlanDocWriteEndDate
                "
              >
                {{ evalPlan.term }} 평가 계획서 작성 기간입니다({{
                  evalPlan.evalPlanDocWriteStrDate
                }}
                ~ {{ evalPlan.evalPlanDocWriteEndDate }}).
              </p>
              <p
                v-if="
                  jobCapaEval.jobCapaEvalStrDate &&
                  jobCapaEval.jobCapaEvalEndDate
                "
              >
                {{ jobCapaEval.term }} 학생 직무수행능력 평가 기간입니다({{
                  jobCapaEval.jobCapaEvalStrDate
                }}
                ~ {{ jobCapaEval.jobCapaEvalEndDate }}).
              </p>
              <p
                v-if="
                  sbjtCqi.sbjtCqiWriteStrDate && sbjtCqi.sbjtCqiWriteEndDate
                "
              >
                {{ sbjtCqi.term }} 교육과정CQI 작성 기간입니다({{
                  sbjtCqi.sbjtCqiWriteStrDate
                }}
                ~ {{ sbjtCqi.sbjtCqiWriteEndDate }}).
              </p>
              <!-- [pp] 강의설계 일정이 없을 경우 : -->
              <p v-else>강의 설계 일정이 없습니다.</p>
            </div>
          </div>
        </div>
        <div class="develop_state_wrap">
          <div class="develop_state">
            <div class="section_tit_wrap">
              <strong class="section_tit_sm">교육과정개발 현황</strong>
              <div class="state_division">
                <span>작성중</span>
                <span>작성완료</span>
              </div>
            </div>
            <div class="curri_develop_percent">
              <div class="curri_develop_writing">
                <strong>작성중</strong>
                <div class="percent">
                  <span>{{ dashboardRate.rateDoing }}</span
                  >%
                </div>
              </div>
              <div class="curri_develop_completed">
                <strong>작성완료</strong>
                <div class="percent">
                  <span>{{ dashboardRate.rateDone }}</span
                  >%
                </div>
              </div>
              <div class="progress_bar">
                <!-- [pp] 교육과정개발 현황: 작성중 퍼센트를 <span> 너비로 조절-->
                <span :style="{ width: processbar }">작성중</span>
              </div>
              <p>100</p>
            </div>
          </div>
          <div class="hakgua_develop_state">
            <div class="section_tit_wrap">
              <strong class="section_tit_sm"
                >학과별 교육과정개발 편성교과목 현황</strong
              >
              <div class="select_row lg">
                <vue-select
                  class="select_box"
                  :options="selectOption2.type"
                  v-model="selectUni"
                  @option:selected="changeSelect"
                >
                </vue-select>
              </div>
            </div>
            <div class="dshb_chart_box">
              <DshbColumnBarChart
                :dataset="chartDatasets"
                :colorset="chartColorSets"
                :labels="chartLabels"
                :columnWidth="'44px'"
              >
              </DshbColumnBarChart>
            </div>
            <p>소속 계열/학부에 속한 학과/전공 교육과정개발 편성 교과목 수</p>
          </div>
        </div>
      </div>
      <div class="sub_section term_curri_develop">
        <div class="term_01">
          <div>
            <strong class="section_tit_sm">1학기 교육과정개발 현황</strong>
            <div class="tbl tbl_row">
              <table>
                <caption>
                  1학기 교육과정개발 현황
                </caption>
                <colgroup>
                  <col style="width: auto" />
                  <col style="width: 30%" />
                  <col style="width: 30%" />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>작성중</th>
                    <th>작성완료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">강의계획서 작성 현황</th>
                    <td class="percent">
                      <span>{{ lecturePlanOne.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ lecturePlanOne.rateDone }}</span
                      >%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">평가계획서 작성 현황</th>
                    <td class="percent">
                      <span>{{ evalPlanDocOne.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ evalPlanDocOne.rateDone }}</span
                      >%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">학생 직무수행능력 평가</th>
                    <td class="percent">
                      <span>{{ evalJobPerformOne.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ evalJobPerformOne.rateDone }}</span
                      >%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">교과목CQI 작성 현황</th>
                    <td class="percent">
                      <span>{{ cqiOne.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ cqiOne.rateDone }}</span
                      >%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="term_02">
          <div>
            <strong class="section_tit_sm">2학기 교육과정개발 현황</strong>
            <div class="tbl tbl_row">
              <table>
                <caption>
                  1학기 교육과정개발 현황
                </caption>
                <colgroup>
                  <col style="width: auto" />
                  <col style="width: 30%" />
                  <col style="width: 30%" />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>작성중</th>
                    <th>작성완료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">강의계획서 작성 현황</th>
                    <td class="percent">
                      <span>{{ lecturePlanTwo.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ lecturePlanTwo.rateDone }}</span
                      >%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">평가계획서 작성 현황</th>
                    <td class="percent">
                      <span>{{ evalPlanDocTwo.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ evalPlanDocTwo.rateDone }}</span
                      >%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">학생 직무수행능력 평가</th>
                    <td class="percent">
                      <span>{{ evalJobPerformTwo.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ evalJobPerformTwo.rateDone }}</span
                      >%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">교과목CQI 작성 현황</th>
                    <td class="percent">
                      <span>{{ cqiTwo.rateDoing }}</span
                      >%
                    </td>
                    <td class="percent">
                      <span>{{ cqiTwo.rateDone }}</span
                      >%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="sub_section link_wrapper">
        <strong class="section_tit_sm">산출물 바로가기</strong>
        <p>Quick banner</p>
        <div class="link_wrap">
          <ul>
            <li>
              <a @click="goToResearch(SCREEN.teachingPlans.path)">
                <img
                  src="@/assets/images/main/icon_section_link1.png"
                  alt="강의계획서 조회"
                />강의계획서 조회
              </a>
            </li>
            <li>
              <a @click="goToResearch(SCREEN.lookupEvaluationPlan.path)">
                <img
                  src="@/assets/images/main/icon_section_link2.png"
                  alt="평가계획서 조회"
                />평가계획서 조회
              </a>
            </li>
            <li>
              <a @click="goToResearch(SCREEN.lookUpCQI.path)">
                <img
                  src="@/assets/images/main/icon_section_link4.png"
                  alt="교과목CQI 조회"
                />교과목CQI 조회
              </a>
            </li>
            <li>
              <a @click="goToResearch(SCREEN.finalArchivement.path)">
                <img
                  src="@/assets/images/main/icon_section_link3.png"
                  alt="학생 직무수행능력평가 조회"
                />
                학생 직무수행능력평가 조회
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="sub_section board_wrapper">
        <div class="notice_wrap">
          <div>
            <strong class="section_tit_sm">공지사항</strong>
            <a @click="goToResearch(SCREEN.notificationCategory.path)"
              >바로가기</a
            >
          </div>
          <ul>
            <li v-for="item in noticeDashboard">
              <a @click="goToNotice(item.id)">
                {{ item.cont }}
              </a>
              <span class="date">{{ item.createdDate }}</span>
            </li>
          </ul>
        </div>
        <div class="qna_wrap">
          <div>
            <strong class="section_tit_sm">Q&A</strong>
            <a @click="goToResearch(SCREEN.questAndAns.path)">바로가기</a>
          </div>
          <ul>
            <li v-for="item in qaDashboard">
              <a @click="goToQA(item.id)">{{ item.cont }}</a>
              <span class="date">{{ item.createdDate }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DshbColumnBarChart from "@/components/chart/DshbColumnBarChart.vue";
import { ref, onMounted } from "vue";
import { commonStore } from "@/stores/common";
import {
  getDashboardAdmin,
  getListDeptByUni,
  getUniDashboard,
} from "@/stores/dashboard/dashboard.service";
import {
  DashboardRateDTO,
  DonutChartResDTO,
  LecturePlanSchedule,
  ListDonutChartDTO,
  NoticeDashboardDTO,
} from "@/stores/dashboard/dashboard.type";
import {
  MODE_DETAIL,
  START_YEAR_NUMBER,
  SUCCSESS_STATUS,
} from "@/constants/screen.const";
import { format } from "date-fns";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { SCREEN } from "@/router/screen";
import router from "@/router";

const store = commonStore();
const { t } = useI18n();

// Define the reactive variables using ref
const chartDatasets = ref([
  {
    name: "",
    data: [],
  },
]);

const chartLabels = ref([]);
const chartColorSets = ref(["#717E8A", "#1495AF", "#28CB38", "#115D5D"]);

const selectOption = ref([]);

const selectOption2 = ref({
  value: "",
  type: [],
});

const processbar = ref("15%");
const year = ref(new Date().getFullYear());
const donutChart = ref({} as ListDonutChartDTO);
const dashboardRate = ref({} as DashboardRateDTO);

const lecturePlanOne = ref({} as DonutChartResDTO);
const lecturePlanTwo = ref({} as DonutChartResDTO);

const cqiOne = ref({} as DonutChartResDTO);
const cqiTwo = ref({} as DonutChartResDTO);

const evalPlanDocOne = ref({} as DonutChartResDTO);
const evalPlanDocTwo = ref({} as DonutChartResDTO);

const evalJobPerformOne = ref({} as DonutChartResDTO);
const evalJobPerformTwo = ref({} as DonutChartResDTO);

const qaDashboard = ref([] as NoticeDashboardDTO[]);
const noticeDashboard = ref([] as NoticeDashboardDTO[]);

const selectUni = ref("");
const currentYear = ref(new Date().getFullYear());

const planDoc = ref({} as LecturePlanSchedule);
const evalPlan = ref({} as LecturePlanSchedule);
const jobCapaEval = ref({} as LecturePlanSchedule);
const sbjtCqi = ref({} as LecturePlanSchedule);

onBeforeMount(() => {
  getAll();
  getListUni();
  getListYear();
});

const changeYear = () => {
  getAll();
};

const getListYear = () => {
  let strYear = START_YEAR_NUMBER;
  for (let i = strYear; i <= currentYear.value + 1; i++) {
    selectOption.value.push(i);
  }
};

const changeSelect = () => {
  store.setLoading(true);
  getListDeptByUni({ upDeptCd: selectUni.value.id, year: year.value }).then(
    (res) => {
      console.log(res);
      if (res.status && res.status == SUCCSESS_STATUS) {
        chartLabels.value = res.data.data.labels;
        chartDatasets.value[0].data = res.data.data.sbjtCnt;

        store.setLoading(false);
      }
    }
  );
};

const getListUni = async () => {
  await getUniDashboard().then((res) => {
    if (res.status && res.status == SUCCSESS_STATUS) {
      if (res.data.data.length > 0) {
        res.data.data.forEach((item) => {
          selectOption2.value.type.push({
            label: item.deptNm,
            id: item.deptCd,
          });
        });
      }
    }
  });
};

const getAll = async () => {
  store.setLoading(true);

  await getDashboardAdmin({ year: year.value }).then((res) => {
    if (res.status && res.status == SUCCSESS_STATUS) {
      donutChart.value = res.data.data.donutChart;

      lecturePlanOne.value = donutChart.value.lecturePlanOne;
      lecturePlanTwo.value = donutChart.value.lecturePlanTwo;

      cqiOne.value = donutChart.value.cqiOne;
      cqiTwo.value = donutChart.value.cqiTwo;

      evalPlanDocOne.value = donutChart.value.evalPlanDocOne;
      evalPlanDocTwo.value = donutChart.value.evalPlanDocTwo;

      evalJobPerformOne.value = donutChart.value.evalJobPerformOne;
      evalJobPerformTwo.value = donutChart.value.evalJobPerformTwo;

      dashboardRate.value = res.data.data.dashboardRate;
      processbar.value = dashboardRate.value.rateDoing + "%";

      qaDashboard.value = res.data.data.qaDashboard;

      if (qaDashboard.value.length > 0) {
        qaDashboard.value.forEach((item) => {
          item.createdDate = format(item.regDate, "yyyy/MM/dd");
        });
      }

      noticeDashboard.value = res.data.data.noticeDashboard;

      if (noticeDashboard.value.length > 0) {
        noticeDashboard.value.forEach((item) => {
          item.createdDate = format(item.regDate, "yyyy/MM/dd");
        });
      }

      chartLabels.value = res.data.data.sbjtDeptResponse.labels;
      chartDatasets.value[0].data = res.data.data.sbjtDeptResponse.sbjtCnt;
      selectUni.value = res.data.data.sbjtDeptResponse.upDeptNm;

      planDoc.value = res.data.data.writeSchdlDTO.planDoc;
      evalPlan.value = res.data.data.writeSchdlDTO.evalPlan;
      jobCapaEval.value = res.data.data.writeSchdlDTO.jobCapaEval;
      sbjtCqi.value = res.data.data.writeSchdlDTO.sbjtCqi;

      store.setLoading(false);
    }
  });
};

const goToResearch = (path: string) => {
  router.push({ path });
};

const goToNotice = (id: string) => {
  router.push({
    name: SCREEN.crudNotificationCategory.name,
    params: { mode: MODE_DETAIL },
    state: {
      id: id,
    },
  });
};

const goToQA = (id: string) => {
  router.push({
    name: SCREEN.crudAns.name,
    params: { mode: MODE_DETAIL },
    state: {
      id: id,
    },
  });
};
</script>

<style scoped lang="scss">
.sub_section{
  display: flex !important;
}
table::before{
  content: none;
  background: none;
}
</style>