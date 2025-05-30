<template>
  <div class="header_wrapper">
    <div class="grid_content">
      <div class="header_wrap">
        <h1 class="header_logo">
          <router-link to="">
            <img src="@/assets/images/logo.png" alt="계원예술대학교" />
          </router-link>
        </h1>
        <div class="header_function">
          <p class="login_info">박세균(12345678)님 환영합니다</p>
          <button type="button" class="btn_logout">로그아웃</button>
          <!-- <button type="button" class="btn_login">로그인</button> -->
          <button type="button" class="btn_prof_site" @click="popupShow(0)">교수사이트 보기</button>
          <button type="button" class="btn_menu">전체메뉴</button>
        </div>
        <div class="header_gnb">
          <nav class="nav_wrap">
            <ul id="gnbMenu" class="gnb_1depth">
              <li>
                <router-link to=""><span>기초정보 관리</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">대학정보</router-link></li>
                  <li><router-link to="">KCS/NCS 분류</router-link></li>
                  <li><router-link to="">KCS/NCS 능력단위</router-link></li>
                  <li><router-link to="">핵심역량 관리</router-link></li>
                  <li><router-link to="">교육과정유형 관리</router-link></li>
                  <li><router-link to="">교수학습방법 관리</router-link></li>
                  <li><router-link to="">평가방법 관리</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to=""><span>학과정보 관리</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">학과정보</router-link></li>
                  <li><router-link to="">인재양성유형 관리</router-link></li>
                  <li><router-link to="">직무 관리</router-link></li>
                  <li><router-link to="">트랙 목록 관리</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to=""><span>교육과정 산출물 조회</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">교육과정개발보고서</router-link></li>
                  <li><router-link to="">강의계획서</router-link></li>
                  <li><router-link to="">평가계획서</router-link></li>
                  <li><router-link to="">최종 성적 조회</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to=""><span>교육과정 일정관리</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">교육과정개발 일정</router-link></li>
                  <li><router-link to="">강의설계 일정</router-link></li>
                  <li><router-link to="">평가 일정</router-link></li>
                  <li><router-link to="">교과목CQI 일정</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to=""><span>교육과정개발 관리</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">교육과정개발</router-link></li>
                  <li><router-link to="">회의록</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to=""><span>교육과정 질관리</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">교과목CQI</router-link></li>
                  <li><router-link to="">교육과정CQI</router-link></li>
                  <li><router-link to="">직무능력성취도</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to=""><span>커뮤니티 관리</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">공지사항</router-link></li>
                  <li><router-link to="">설문조사</router-link></li>
                  <li><router-link to="">Q&A</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to=""><span>시스템 관리</span></router-link>
                <ul class="gnb_2depth">
                  <li><router-link to="">권한 관리</router-link></li>
                  <li><router-link to="">사용자 관리</router-link></li>
                  <li><router-link to="">로그인 이력 조회</router-link></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="header_gnb_sitemap">
      <nav class="nav_wrap">
        <div class="grid_content">
          <ul id="gnbMenu" class="sub_1depth">
            <li>
              <router-link to=""><span>기초정보 관리</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">대학정보</router-link></li>
                <li><router-link to="">KCS/NCS 분류</router-link></li>
                <li><router-link to="">KCS/NCS 능력단위</router-link></li>
                <li><router-link to="">핵심역량 관리</router-link></li>
                <li><router-link to="">교육과정유형 관리</router-link></li>
                <li><router-link to="">교수학습방법 관리</router-link></li>
                <li><router-link to="">평가방법 관리</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to=""><span>학과정보 관리</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">학과정보</router-link></li>
                <li><router-link to="">인재양성유형 관리</router-link></li>
                <li><router-link to="">직무 관리</router-link></li>
                <li><router-link to="">트랙 목록 관리</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to=""><span>교육과정 산출물 조회</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">교육과정개발보고서</router-link></li>
                <li><router-link to="">강의계획서</router-link></li>
                <li><router-link to="">평가계획서</router-link></li>
                <li><router-link to="">최종 성적 조회</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to=""><span>교육과정 일정관리</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">교육과정개발 일정</router-link></li>
                <li><router-link to="">강의설계 일정</router-link></li>
                <li><router-link to="">평가 일정</router-link></li>
                <li><router-link to="">교과목CQI 일정</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to=""><span>교육과정개발 관리</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">교육과정개발</router-link></li>
                <li><router-link to="">회의록</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to=""><span>교육과정 질관리</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">교과목CQI</router-link></li>
                <li><router-link to="">교육과정CQI</router-link></li>
                <li><router-link to="">직무능력성취도</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to=""><span>커뮤니티 관리</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">공지사항</router-link></li>
                <li><router-link to="">설문조사</router-link></li>
                <li><router-link to="">Q&A</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to=""><span>시스템 관리</span></router-link>
              <ul class="sub_2depth">
                <li><router-link to="">권한 관리</router-link></li>
                <li><router-link to="">사용자 관리</router-link></li>
                <li><router-link to="">로그인 이력 조회</router-link></li>
              </ul>
            </li>
          </ul>
          <button type="button" class="menu_close">전체메뉴 닫기</button>
        </div>
      </nav>
    </div>
  </div>

  <PopupView v-model="isPopups[0]" class="medium">
    <template #title>로그인 교수 선택</template>
    <template #footer>
      <button type="button" class="btn_round btn_white btn_xl_2" @click="popupHide(0)">닫기</button>
    </template>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">검색</div>
      </div>
      <div class="tbl tbl_col">
        <table>
          <caption>
            교과목 검색 목록
          </caption>
          <colgroup>
            <col style="width: 50%" />
            <col style="width: 50%" />
          </colgroup>
          <thead>
            <tr>
              <th>교수명</th>
              <th>교번</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="교수명" />
              </td>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="교번" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn_area ta_r mg_t10">
          <button type="button" class="btn_lg btn_round btn_white">초기화</button>
          <button type="button" class="btn_lg btn_round btn_primary">검색</button>
        </div>
      </div>
    </div>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">목록</div>
      </div>
      <div class="tbl tbl_col">
        <table>
          <caption>
            교과목 검색 목록
          </caption>
          <colgroup>
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
          </colgroup>
          <thead>
            <tr>
              <th>교수명</th>
              <th>교번</th>
              <th>학과</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4">로그인 할 교수자를 검색해주세요.</td>
            </tr>
            <tr>
              <td>홍길동</td>
              <td>12345678</td>
              <td>A학과</td>
              <td>
                <button type="button" @click="onclickSelect()">[선택]</button>
              </td>
            </tr>
            <tr>
              <td>심청이</td>
              <td>12345678</td>
              <td>A학과</td>
              <td>
                <button type="button" @click="onclickSelect()">[선택]</button>
              </td>
            </tr>
            <tr>
              <td>홍길동</td>
              <td>12345678</td>
              <td>A학과</td>
              <td>
                <button type="button" @click="onclickSelect()">[선택]</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationUi></PaginationUi>
    </div>
  </PopupView>
</template>

<script lang="ts">
import PopupView from "@/components/common/PopupView.vue";
import PaginationUi from "@/components/common/PaginationUi.vue";
import { gnbOneDepth, siteMap } from "@/assets/js/common";
export default {
  components: {
    PopupView,
    PaginationUi,
  },
  data: () => ({
    isPopups: [false],
  }),
  mounted: function () {
    gnbOneDepth();
    siteMap();
  },
  methods: {
    popupShow(idx: number) {
      const vm = this;
      vm.isPopups[idx] = true;
    },
    popupHide(idx: number) {
      const vm = this;
      vm.isPopups[idx] = false;
    },
    onclickSelect() {
      const vm = this;
      vm.$confirm("홍길동 교수님을 선택하시겠어요?", "알림", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$toast("로그인 되었습니다. <br />교수사이트로 이동합니다.");
        }
      });
    },
  },
};
</script>
