<template>
  <div class="content_wrap dashboard staff">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">My<br />Dashboard</h2>
        <div class="year_select select_row sm">
          <vue-select class="select_box" :options="selectOption.type" v-model="selectOption.value"></vue-select>
        </div>
      </div>
      <div class="sub_section">
        <div class="dshb_banner">
          <div>
            <div class="title">
              <strong>역량기반 교육과정</strong>
              <p>관리시스템</p>
            </div>
            <img src="@/assets/images/main/main_banner_play.png" alt="play" />
            <div class="my_todo">
              <strong>나의 할 일</strong>
              <p>1학기 강의계획서 작성 기간입니다(2024/07/31 ~ 2024/08/30)</p>
              <!-- 나의 할 일이 없는 경우 : 남아있는 할일이 없습니다.-->
            </div>
          </div>
        </div>
        <div class="lecture_schedule_wrap">
          <div>
            <strong class="section_tit_sm">강의설계 일정</strong>
            <div class="tbl tbl_row">
              <table>
                <caption>
                  강의설계 일정
                </caption>
                <colgroup>
                  <col style="width: 20%" />
                  <col style="width: auto" />
                  <col style="width: auto" />
                </colgroup>
                <thead>
                <tr>
                  <th></th>
                  <th>1학기</th>
                  <th>2학기</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">강의계획서 작성</th>
                  <td class="days">2024/07/30 ~ 2024/08/30</td>
                  <td class="days">2024/07/30 ~ 2024/08/30</td>
                </tr>
                <tr>
                  <th scope="row">평가계획서 작성</th>
                  <td class="days">2024/07/30 ~ 2024/08/30</td>
                  <td class="days">-</td>
                </tr>
                <tr>
                  <th scope="row">학생 직무수행능력 평가</th>
                  <td class="days">2024/07/30 ~ 2024/08/30</td>
                  <td class="days">-</td>
                </tr>
                <tr>
                  <th scope="row">교과목CQI 작성</th>
                  <td class="days">2024/07/30 ~ 2024/08/30</td>
                  <td class="days">2024/07/30 ~ 2024/08/30</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="sub_section_md">
        <div class="section_tit_wrap">
          <div class="section_tit_xs">강의계획서 작성 현황</div>
        </div>
        <div class="tbl tbl_col scrollx_tbl_xl">
          <table>
            <caption>
              강의계획서 작성 현황
            </caption>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 12%" />
              <col style="width: 10%" />
              <col style="width: 20%" />
              <col style="width: 7%" />
              <col style="width: 3%" />
              <col style="width: 3%" />
              <col style="width: 8%" />
              <col style="width: 6%" />
            </colgroup>
            <thead>
            <tr>
              <th scope="row">개설학년도-학기</th>
              <th scope="row">계열/학부</th>
              <th scope="row">학과/전공</th>
              <th scope="row">과목명</th>
              <th scope="row">이수구분</th>
              <th scope="row">학년</th>
              <th scope="row">분반</th>
              <th scope="row">교육과정 학년도</th>
              <th scope="row">작성상태</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="9">담당 교과목이 없습니다.</td>
            </tr>
            <tr>
              <th class="ta_c">2025-1</th>
              <td>Media&Technology계열</td>
              <td>게임미디어과</td>
              <td><router-link to="">디지털 시대, 스마트하게 일하는 방법</router-link></td>
              <td>전공선택</td>
              <td>1</td>
              <td>1</td>
              <td>2025</td>
              <td>작성완료</td>
            </tr>
            <tr>
              <th class="ta_c">2025-1</th>
              <td>Media&Technology계열</td>
              <td>디지털미디어디자인과</td>
              <td>
                <router-link to="">
                  디지털 시대, 스마트하게 일하는 방법디지털 시대, 스마트하게 일하는 방법
                </router-link>
              </td>
              <td>전공선택</td>
              <td>1</td>
              <td>2</td>
              <td>2025</td>
              <td>미작성</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="sub_section_md">
        <div class="section_tit_wrap">
          <div class="section_tit_xs">평가계획서 작성 현황</div>
        </div>
        <div class="tbl tbl_col scrollx_tbl_xl">
          <table>
            <caption>
              평가계획서 작성 현황
            </caption>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 12%" />
              <col style="width: 10%" />
              <col style="width: 20%" />
              <col style="width: 7%" />
              <col style="width: 3%" />
              <col style="width: 3%" />
              <col style="width: 8%" />
              <col style="width: 6%" />
            </colgroup>
            <thead>
            <tr>
              <th scope="row">개설학년도-학기</th>
              <th scope="row">계열/학부</th>
              <th scope="row">학과/전공</th>
              <th scope="row">과정명</th>
              <th scope="row">이수구분</th>
              <th scope="row">학년</th>
              <th scope="row">분반</th>
              <th scope="row">교육과정 학년도</th>
              <th scope="row">작성상태</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="9">담당 교과목이 없습니다.</td>
            </tr>
            <tr>
              <th class="ta_c">2025-1</th>
              <td>Media&Technology계열</td>
              <td>게임미디어과</td>
              <td><router-link to="">디지털 시대, 스마트하게 일하는 방법</router-link></td>
              <td>전공선택</td>
              <td>1</td>
              <td>1</td>
              <td>2025</td>
              <td>작성완료</td>
            </tr>
            <tr>
              <th class="ta_c">2025-1</th>
              <td>Media&Technology계열</td>
              <td>게임미디어과</td>
              <td><router-link to="">디지털 시대, 스마트하게 일하는 방법</router-link></td>
              <td>전공선택</td>
              <td>1</td>
              <td>2</td>
              <td>2025</td>
              <td>미작성</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="sub_section">
        <div class="section_tit_wrap">
          <div class="section_tit_xs">교과목CQI 작성 현황</div>
        </div>
        <div class="tbl tbl_col scrollx_tbl_xl">
          <table>
            <caption>
              교과목CQI 작성 현황
            </caption>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 12%" />
              <col style="width: 10%" />
              <col style="width: 20%" />
              <col style="width: 7%" />
              <col style="width: 3%" />
              <col style="width: 3%" />
              <col style="width: 8%" />
              <col style="width: 6%" />
            </colgroup>
            <thead>
            <tr>
              <th scope="row">개설학년도-학기</th>
              <th scope="row">계열/학부</th>
              <th scope="row">학과/전공</th>
              <th scope="row">과정명</th>
              <th scope="row">이수구분</th>
              <th scope="row">학년</th>
              <th scope="row">분반</th>
              <th scope="row">교육과정 학년도</th>
              <th scope="row">작성상태</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="9">담당 교과목이 없습니다.</td>
            </tr>
            <tr>
              <th class="ta_c">2025-1</th>
              <td>Media&Technology계열</td>
              <td>게임미디어과</td>
              <td><router-link to="">디지털 시대, 스마트하게 일하는 방법</router-link></td>
              <td>전공선택</td>
              <td>1</td>
              <td>1</td>
              <td>2025</td>
              <td>작성완료</td>
            </tr>
            <tr>
              <th class="ta_c">2025-1</th>
              <td>Media&Technology계열</td>
              <td>게임미디어과</td>
              <td><router-link to="">디지털 시대, 스마트하게 일하는 방법</router-link></td>
              <td>전공선택</td>
              <td>1</td>
              <td>2</td>
              <td>2025</td>
              <td>미작성</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="sub_section board_wrapper">
        <div class="notice_wrap">
          <div>
            <strong class="section_tit_sm">공지사항</strong>
            <router-link to="">바로가기</router-link>
          </div>
          <ul>
            <li>
              <router-link to="">
                2024년 2학기 장학금 신청2024년 2학기 장학금 신청2024년 2학기 장학금 신청2024년 2학기 장학금 신청
              </router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[학사] 2024년 제2차 평생교육사 자격증 발급 신청</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[학사] 2024학년도 제1학기 교양과목 중간시험 시간표</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[일반] [미래혁신센터] 2024학년도 2학기 도전학기</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[일반] [미래혁신센터] 2024학년도 2학기 도전학기</router-link>
              <span class="date">2024/05/01</span>
            </li>
          </ul>
        </div>
        <div class="qna_wrap">
          <div>
            <strong class="section_tit_sm">Q&A</strong>
            <router-link to="">바로가기</router-link>
          </div>
          <ul>
            <li>
              <router-link to="">2024년 2학기 장학금 신청</router-link>
              <p class="answer_status on">답변완료</p>
              <!-- [pp] 클래스 on 으로 제어
              <p class="answer_status">접수중</p>
              <p class="answer_status on">답변완료</p> -->
              <span class="date">2024/07/29</span>
            </li>
            <li>
              <router-link to="">[학사] 2024년 제2차 평생교육사 자격증 발급 신청</router-link>
              <p class="answer_status">접수중</p>
              <span class="date">-</span>
            </li>
            <li>
              <router-link to="">[학사] 2024학년도 제1학기 교양과목 중간시험 시간표</router-link>
              <p class="answer_status on">답변완료</p>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">
                [일반] [미래혁신센터] 2024학년도 2학기 도전학기도전학기도전학기도전학기도전학기도전학기
              </router-link>
              <p class="answer_status">접수중</p>
              <span class="date">-</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    selectOption: {
      value: "2024",
      type: [
        { label: "2025", value: "" },
        { label: "2026", value: "01" },
      ],
    },
  }),
};
</script>