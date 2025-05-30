<template>
  <div class="grid_content">
    <div class="sub_section">
      <p class="mg_b30 font_gray font_14 lh_22">
        계원예술대학교 관리자사이트 UI 가이드입니다. 내용 추가중입니다.
      </p>
      <div class="sub_section">
        <div class="section_tit_wrap">
          <h3 class="section_tit">Excel button</h3>
        </div>
        <div class="box">
          <ExportFileExcel
            :data="dataExport"
            :fileName="'fileNameExport'"
            :btnName="'export'"
            :multiHeaderFlag="true"
            :arrayColor="arrayColor"
          ></ExportFileExcel>
          <div>
            <button @click="openPostcode">Tìm mã bưu chính</button>
            <div v-if="address">
              <p>Địa chỉ: {{ address }}</p>
              <p>Mã bưu chính: {{ postcode }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="sub_section">
        <div class="section_tit_wrap">
          <h3 class="section_tit">button</h3>
        </div>
        <div class="box">
          <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">
              Type H 48 <span class="font_14 font_primary">* gap 12px</span>
            </p>
            <div class="btn_area ta_l mg_t0">
              <button type="button" class="btn_round btn_white btn_xl">
                버튼
              </button>
              <button type="button" class="btn_round btn_primary btn_xl">
                버튼
              </button>
              <!-- <button type="button" class="btn_round btn_gray btn_xl">버튼</button> -->
              <button type="button" class="btn_round btn_white btn_xl" disabled>
                버튼
              </button>
              <button
                type="button"
                class="btn_round btn_primary btn_xl"
                disabled
              >
                버튼
              </button>
            </div>
          </div>
          <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">
              Type H 34 <span class="font_14 font_primary">* gap 8px</span>
            </p>
            <div class="btn_area ta_l mg_t0">
              <button type="button" class="btn_round btn_white btn_md">
                버튼
              </button>
              <button type="button" class="btn_round btn_primary btn_md">
                버튼
              </button>
            </div>
          </div>
          <!-- <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">Icon + text</p>
            <button type="button" class="btn_round btn_white btn_md btn_icon download">다운로드</button>
          </div> -->
          <!-- <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">Toggle button</p>
            <p class="toggle_switch">
              <input type="checkbox" id="toggle_switch" />
              <label for="toggle_switch">
                <span>스위치</span>
              </label>
            </p>
          </div> -->
          <!-- <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">Remove / Add button</p>
            <button type="button" class="btn_remove">삭제</button>
            <button type="button" class="btn_remove" disabled>삭제</button>
            <button type="button" class="btn_add">추가</button>
            <button type="button" class="btn_add" disabled>추가</button>
          </div> -->
        </div>
      </div>
      <!-- <div class="sub_section">
        <div class="section_tit_wrap">
          <h3 class="section_tit">
            Flag &nbsp; <span>진행 상태나 성격에 따라 콘텐츠를 구분해주는 컴포넌트입니다.</span>
          </h3>
        </div>
        <div class="box">
          <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b10">기타 속성</p>
            <div class="flag_area mg_b20">
              <p class="round_flag type1">필수</p>
              <p class="round_flag type2">선택</p>
              <p class="round_flag type3">트랙</p>
              <p class="round_flag type4">상담</p>
              <p class="round_flag type5">상담</p>
            </div>
            <p class="section_tit_xxs mg_b10">진행현황</p>
            <div class="flag_area mg_b20">
              <p class="rectgl_flag type1">승인대기</p>
              <p class="rectgl_flag type2">필수</p>
              <p class="rectgl_flag type3">모집중</p>
              <p class="rectgl_flag type3">신청중</p>
              <p class="rectgl_flag type3">작성중</p>
              <p class="rectgl_flag type4">모집완료</p>
              <p class="rectgl_flag type4">신청완료</p>
            </div>
            <p class="section_tit_xxs mg_b10">스케쥴</p>
            <div class="flag_area mg_b20">
              <p class="rectgl_flag schedule1">나</p>
              <p class="rectgl_flag schedule2">김이화</p>
            </div>
            <p class="section_tit_xxs mg_b10">과정 속성</p>
            <div class="flag_area mg_b20">
              <p class="round_flag type6">팀 과제</p>
              <p class="round_flag type7">과제</p>
              <p class="round_flag type8">유튜브</p>
              <p class="round_flag type9">동영상</p>
              <p class="round_flag type10">ZOOM</p>
              <p class="round_flag type11">오프라인</p>
              <p class="round_flag type12">교과</p>
              <p class="round_flag type13">비교과</p>
            </div>
            <p class="section_tit_xxs mg_b10">썸네일용 칩스</p>
            <div class="flag_area mg_b20">
              <p class="round_flag type14">교내</p>
              <p class="round_flag type14">교외</p>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div class="sub_section">
        <div class="section_tit_wrap">
          <h3 class="section_tit">Tab, Case, 필터 &nbsp; <span></span></h3>
        </div>
        <div class="box">
          <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">case 1</p>
          </div>
          <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">case 2</p>
          </div>
          <div class="sub_section_sm">
            <p class="section_tit_xxs mg_b15">Hashtag</p>
          </div>
        </div>
      </div> -->
      <div class="box mg_b30">
        <div class="section_tit_wrap">
          <h3 class="section_tit_xxs">제목 타이틀 크기별 : section_tit_xxs</h3>
          <h3 class="section_tit_xs">제목 타이틀 크기별 : section_tit_xs</h3>
          <h3 class="section_tit_sm">제목 타이틀 크기별 : section_tit_sm</h3>
          <h3 class="section_tit">제목 타이틀 크기별 : section_tit</h3>
          <h3 class="section_tit_md">제목 타이틀 크기별 : section_tit_md</h3>
          <h3 class="section_tit_lg">제목 타이틀 크기별 : section_tit_lg</h3>
        </div>
        <div class="section_tit_wrap">
          <h4 class="section_tit_xs">section_tit_xs</h4>
        </div>

        <ul class="list_line">
          <li>
            section 나누기 관련 클래스명 : main.css 참고 (sub_section ... )
          </li>
          <li><p class="required">필수값</p></li>
          <li><p class="required2">필수값</p></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="box no_cnt">
        <p>내용이 없습니다</p>
      </div>
    </div>

    <div class="sub_section">
      <!-- <div class="section_tit_wrap">
        <h3 class="section_tit_md">타이틀 레이아웃 1</h3>
        <div class="title_function">
          <button type="button" class="btn_round btn_sm btn_primary">긍정버튼</button>
          <button type="button" class="btn_round btn_sm btn_white">버튼</button>
          <button type="button" class="btn_round btn_sm btn_gray">버튼</button>
        </div>
      </div>
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">타이틀 레이아웃 2</h3>
        <div class="title_function">
          <div class="select_form wd_sm">
            <label>전체</label>
            <ul class="select_custom">
              <li>전체</li>
              <li>이름</li>
            </ul>
          </div>
        </div>
      </div> -->

      <div class="sub_section">
        <div class="sub_section_sm">
          <div class="box">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">버튼종류</h4>
            </div>
            <div>
              <button type="button" class="btn_round btn_sm btn_primary">
                긍정버튼
              </button>
              <!-- <button type="button" class="btn_round btn_sm btn_secondary">긍정2버튼</button> -->
              <button type="button" class="btn_round btn_sm btn_white">
                중립버튼
              </button>
              <!-- <button type="button" class="btn_round btn_sm btn_gray">부정버튼</button>
              <button type="button" class="btn_round btn_sm btn_lightgray">부정2버튼</button>
              <button type="button" class="btn_round btn_sm btn_bo_primary">긍정border버튼</button>
              <button type="button" class="btn_round btn_sm btn_bo_gray">border버튼</button>
              <button type="button" class="btn_round btn_sm btn_bo_black">border버튼</button>

              <p class="mg_t10 mg_b10 font_gray">보통 긍정부정 같이 있을때는 (중립(취소) + 긍정(저장))</p>

              <button type="button" class="btn_round btn_sm btn_white btn_icon download">아이콘버튼</button>
              <button type="button" class="btn_round btn_sm btn_icon icon_only download">아이콘만있는버튼</button>

              <p class="mg_t10 mg_b10 font_gray">( 현재는 이미지 주석처리 해두었습니다 / 필요에 따라 추가해서 사용 )</p> -->
            </div>
          </div>
        </div>
        <div class="sub_section_sm">
          <div class="box">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">
                sweetalert2 - 알럿창 플러그인입니다 (클릭시 알럿 뜸)
              </h4>
            </div>
            <div>
              <button
                type="button"
                class="btn_round btn_sm btn_primary"
                @click="onclickEx1()"
              >
                confirm 예시
              </button>
              <button
                type="button"
                class="btn_round btn_sm btn_primary"
                @click="onclickEx2()"
              >
                alert 예시
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">
          페이지 하단 버튼영역
          <p class="mg_t10 font_gray font_15">
            ※ 페이지 하단 버튼영역은 btn_xl, btn_round 사용 (또는 디자인
            참고해서 적용해주세요)
          </p>
        </h3>
      </div>

      <!-- 가운데 정렬 -->
      <div class="btn_area">
        <button type="button" class="btn_xl btn_round btn_white">
          목록으로
        </button>
        <button type="button" class="btn_xl btn_round btn_primary">
          저장하기
        </button>
      </div>

      <!-- 오른쪽 정렬 -->
      <div class="btn_area ta_r">
        <!-- <button type="button" class="btn_xl_2 btn_round btn_gray">목록</button> -->
        <button type="button" class="btn_xl_2 btn_round btn_white">다음</button>
        <button type="button" class="btn_xl_2 btn_round btn_primary">
          저장
        </button>
      </div>

      <!-- 왼쪽 정렬 -->
      <div class="btn_area ta_l">
        <!-- <button type="button" class="btn_xl_2 btn_round btn_gray">목록</button> -->
        <button type="button" class="btn_xl_2 btn_round btn_white">다음</button>
        <button type="button" class="btn_xl_2 btn_round btn_primary">
          저장
        </button>
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">탭종류</h3>
      </div>
      <div class="box">
        <p class="mg_b20 font_gray">
          ※ 표준화에서 사용중인 탭 종류 (디자인에 따라 수정해서 사용)
        </p>
        <div class="sub_section_sm">
          <div class="radio_tab_wrap">
            <p class="radio_tab inline">
              <input type="radio" id="radio_round1" value="" checked />
              <label for="radio_round1">라디오탭1</label>
            </p>
            <p class="radio_tab inline">
              <input type="radio" id="radio_round2" value="" />
              <label for="radio_round2">라디오탭2</label>
            </p>
          </div>
          <!-- <div class="radio_tab_wrap black">
            <p class="radio_tab inline">
              <input type="radio" id="radio_round_black1" value="" checked />
              <label for="radio_round_black1">라디오탭1</label>
            </p>
            <p class="radio_tab inline">
              <input type="radio" id="radio_round_black2" value="" />
              <label for="radio_round_black2">라디오탭2</label>
            </p>
          </div> -->
        </div>
        <!-- <div class="sub_section_sm">
          <div class="radio_tab_lg_wrap">
            <p class="radio_tab_lg">
              <input type="radio" id="radio_1" checked />
              <label for="radio_1">탭제목 1</label>
            </p>
            <p class="radio_tab_lg">
              <input type="radio" id="radio_2" />
              <label for="radio_2">탭제목 2</label>
            </p>
          </div>
        </div> -->
        <!-- <div class="sub_section_sm">
          <div class="radio_tab_md_wrap">
            <p class="radio_tab_md">
              <input type="radio" id="radio_md_1" checked />
              <label for="radio_md_1">탭제목 1</label>
            </p>
            <p class="radio_tab_md">
              <input type="radio" id="radio_md_2" />
              <label for="radio_md_2">탭제목 2</label>
            </p>
          </div>
        </div> -->
        <!-- <div class="sub_section_sm">
          <div class="radio_text_wrap">
            <p class="radio_text">
              <input type="radio" id="radio_text1" checked />
              <label for="radio_text1">탭제목 1</label>
            </p>
            <p class="radio_text">
              <input type="radio" id="radio_text2" />
              <label for="radio_text2">탭제목 2</label>
            </p>
            <p class="radio_text">
              <input type="radio" id="radio_text3" />
              <label for="radio_text3">탭제목 3</label>
            </p>
          </div>
          <div class="radio_text_sm_wrap">
            <p class="radio_text_sm">
              <input type="radio" id="radio_text_sm1" checked />
              <label for="radio_text_sm1">탭제목 1</label>
            </p>
            <p class="radio_text_sm">
              <input type="radio" id="radio_text_sm2" />
              <label for="radio_text_sm2">탭제목 2</label>
            </p>
            <p class="radio_text_sm">
              <input type="radio" id="radio_text_sm3" />
              <label for="radio_text_sm3">탭제목 3</label>
            </p>
          </div>
        </div> -->
        <!-- <div class="sub_section_sm">
          <div class="divide_radio_wrap">
            <p class="radio_line">
              <input type="radio" id="alarm_radio1" value="USER" checked />
              <label for="alarm_radio1">탭제목 1</label>
            </p>
            <p class="radio_line">
              <input type="radio" id="alarm_radio2" value="GUIDE" />
              <label for="alarm_radio2">탭제목 2</label>
            </p>
          </div>
        </div> -->
        <!-- <div class="sub_section_sm">
          <div class="radio_black_txt_wrap">
            <p class="radio_black_txt">
              <input type="radio" id="radio_black1" value="USER" checked />
              <label for="radio_black1">탭제목 1</label>
            </p>
            <p class="radio_black_txt">
              <input type="radio" id="radio_black2" value="GUIDE" />
              <label for="radio_black2">탭제목 2</label>
            </p>
          </div>
        </div> -->
        <!-- <div class="sub_section_sm">
          <div class="radio_sm_txt_wrap">
            <p class="radio_black_txt">
              <input type="radio" id="radio_black_sm1" value="USER" checked />
              <label for="radio_black_sm1">탭제목 1</label>
            </p>
            <p class="radio_black_txt">
              <input type="radio" id="radio_black_sm2" value="GUIDE" />
              <label for="radio_black_sm2">탭제목 2</label>
            </p>
          </div>
        </div> -->
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">input type</h3>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="mg_b30">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">체크박스</h4>
            </div>
            <p class="check_row">
              <input
                type="checkbox"
                v-model="checkValue1"
                value="1R"
                id="checkrow1"
                class="hidden"
                checked
              />
              <label for="checkrow1">체크박스 1</label>
            </p>
            <p class="check_row">
              <input
                type="checkbox"
                v-model="checkValue1"
                value="2R"
                id="checkrow2"
                class="hidden"
              />
              <label for="checkrow2">체크박스 2</label>
            </p>
            <p class="check_row">
              <input
                type="checkbox"
                v-model="checkValue1"
                value="3R"
                id="checkrow3"
                class="hidden"
                disabled
              />
              <label for="checkrow3">체크박스 3</label>
            </p>
            <p class="check_only">
              <input
                type="checkbox"
                v-model="checkValue2"
                value="1R"
                id="checkonly1"
                class="hidden"
                checked
              />
              <label for="checkonly1">체크박스 1</label>
            </p>
          </div>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">라디오버튼</h4>
          </div>
          <p class="radio_row">
            <input
              type="radio"
              v-model="radioValue1"
              value="1R"
              id="radio1"
              class="hidden"
              checked
            />
            <label for="radio1">라디오버튼 1</label>
          </p>
          <p class="radio_row">
            <input
              type="radio"
              v-model="radioValue1"
              value="2R"
              id="radio2"
              class="hidden"
            />
            <label for="radio2">라디오버튼 2</label>
          </p>
          <p class="radio_row">
            <input
              type="radio"
              v-model="radioValue1"
              value="3R"
              id="radio3"
              class="hidden"
              disabled
            />
            <label for="radio3">라디오버튼 3</label>
          </p>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">텍스트 input</h4>
          </div>
          <input type="text" class="form_style" placeholder="텍스트 input" />
          <input
            type="text"
            class="form_style wd_p100"
            placeholder="텍스트 input"
          />
          <input
            type="text"
            class="form_style wd_p100"
            placeholder="텍스트 input disabled"
            disabled
          />

          <textarea
            rows="6"
            class="form_style wd_p100"
            placeholder="내용을 입력해주세요."
          ></textarea>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">select box</h4>
          </div>
          <div class="select_row xs">
            <!--            <vue-select class="select_box lg"></vue-select>-->
            <SelectBoxBase
              v-model="selectOption.value1"
              :data="selectOption.type"
            />
          </div>

          <div class="select_row lg">
            <!--            <vue-select class="select_box" :options="selectOption.type" v-model="selectOption.value"></vue-select>-->
            <SelectBoxBase
              v-model="selectOption.value2"
              :data="selectOption.type"
            />
          </div>
          <div class="select_row lg">
            <!--            <vue-select class="select_box" :options="selectOption.type" v-model="selectOption.value"></vue-select>-->
            <SelectBoxBaseSearch
              v-model="selectOption.value3"
              :data="selectOption.type"
            />
          </div>
          <div class="select_row lg">
            <!--            <vue-select class="select_box" :options="selectOption.type" v-model="selectOption.value"></vue-select>-->
            <SelectBoxBaseCheckBox
              v-model="selectOption.value4"
              :data="selectOption.type"
            />
          </div>
          <p class="mg_t10 font_gray">
            ※ 높이별로 select_box에 class명 추가 ( sm, md, lg )
          </p>
          <p class="mg_t10 font_gray">
            ※ 너비별로 select_row에 class명 추가 ( xxs, xs, sm, md, g, xlg )
          </p>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">달력</h4>
          </div>

          <VDateInput v-model="date" placeholder="시작일"></VDateInput>
          <VDateInput
            v-model="date"
            placeholder="종료일"
            :disabled="true"
          ></VDateInput>

          <div class="search_daywrap flex_fit wd_p100">
            <div class="wd_200">
              <VDateInput v-model="date"></VDateInput>
            </div>
            <p class="input_tilde">~</p>
            <div class="wd_200">
              <VDateInput v-model="date"></VDateInput>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">검색영역 유형</h3>
      </div>

      <div class="sub_section_xs">
        <div class="section_tit_wrap">
          <h4 class="section_tit_xs">유형1</h4>
        </div>

        <!-- 검색유형 1 -->
        <div class="search_box">
          <div class="search_section">
            <div class="search_toggle lg center">
              <div class="left">
                <p class="total_count">
                  <strong>2</strong>개의 비교과 프로그램
                </p>
              </div>
              <div class="right">
                <div class="select_row sm">
                  <vue-select class="select_box"></vue-select>
                </div>
                <div class="search_row">
                  <input
                    type="search"
                    class="form_style wd_p100"
                    placeholder="보고 싶은 비교과 프로그램을 찾아보세요"
                  />
                  <button type="button" class="btn_search btn_icon icon_only">
                    검색
                  </button>
                </div>
                <button
                  type="button"
                  class="btn_round btn_lg btn_primary mg_l10"
                >
                  조회하기
                </button>
                <button type="button" class="btn_round btn_lg btn_gray mg_l5">
                  초기화
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="section_tit_wrap">
          <h4 class="section_tit_xs">유형2</h4>
        </div>

        <!-- 검색유형 2 -->
        <div class="search_box">
          <div class="search_section">
            <div class="search_toggle lg center">
              <div class="left">
                <p class="total_count">
                  <strong>2</strong>개의 비교과 프로그램
                </p>
              </div>
              <div class="right">
                <div class="select_row sm">
                  <vue-select class="select_box"></vue-select>
                </div>
                <div class="select_row sm">
                  <vue-select class="select_box"></vue-select>
                </div>
                <div class="search_row">
                  <input
                    type="search"
                    class="form_style wd_p100"
                    placeholder="보고 싶은 비교과 프로그램을 찾아보세요"
                  />
                  <button type="button" class="btn_search btn_icon icon_only">
                    검색
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="search_section">
            <div class="search_toggle sm">
              <div class="left"></div>
              <div class="right">
                <div class="search_daywrap mg_r10">
                  <span class="tag">운영일자</span>
                  <div class="wd_150">
                    <VDateInput
                      v-model="date"
                      placeholder="운영시작"
                    ></VDateInput>
                  </div>
                  <span>~</span>
                  <div class="wd_150">
                    <VDateInput
                      v-model="date"
                      placeholder="운영종료"
                    ></VDateInput>
                  </div>
                </div>

                <div class="input_wrap mg_r10">
                  <span class="tag">상태</span>
                  <div>
                    <p class="check_row">
                      <input
                        type="checkbox"
                        id="checka1"
                        class="hidden"
                        checked
                        name="check"
                      />
                      <label for="checka1">심사중1</label>
                    </p>
                    <p class="check_row">
                      <input
                        type="checkbox"
                        id="checka2"
                        class="hidden"
                        name="check"
                      />
                      <label for="checka2">진행중1</label>
                    </p>
                    <p class="check_row">
                      <input
                        type="checkbox"
                        id="checka3"
                        class="hidden"
                        name="check"
                      />
                      <label for="checka3">종료1</label>
                    </p>
                  </div>
                </div>
                <div class="input_wrap mg_r10">
                  <span class="tag">상태</span>
                  <div>
                    <p class="radio_row">
                      <input
                        type="radio"
                        id="radioa1"
                        class="hidden"
                        checked
                        name="check"
                      />
                      <label for="radioa1">심사중</label>
                    </p>
                    <p class="radio_row">
                      <input
                        type="radio"
                        id="radioa2"
                        class="hidden"
                        name="check"
                      />
                      <label for="radioa2">진행중</label>
                    </p>
                    <p class="radio_row">
                      <input
                        type="radio"
                        id="radioa3"
                        class="hidden"
                        name="check"
                      />
                      <label for="radioa3">종료</label>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn_round btn_lg btn_primary mg_l10"
                >
                  조회하기
                </button>
                <button type="button" class="btn_round btn_lg btn_gray mg_l5">
                  초기화
                </button>
              </div>
            </div>
          </div>
          <div class="search_section search_tab">
            <div class="search_toggle sm">
              <div class="left">
                <div class="radio_tab_lg_wrap">
                  <p class="radio_tab_lg">
                    <input type="radio" id="radio_1" checked />
                    <label for="radio_1">탭제목 1</label>
                  </p>
                  <p class="radio_tab_lg">
                    <input type="radio" id="radio_2" />
                    <label for="radio_2">탭제목 2</label>
                  </p>
                </div>
              </div>
              <div class="right"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="section_tit_wrap">
          <h4 class="section_tit_xs">유형3</h4>
        </div>

        <!-- 검색유형 3 -->
        <div class="search_box">
          <div class="search_section">
            <div class="search_toggle lg center">
              <div class="left">
                <p class="total_count">
                  <strong>2</strong>개의 비교과 프로그램
                </p>
              </div>
              <div class="right">
                <div class="select_label_row">
                  <span class="tag">이수 구분</span>
                  <!-- <div class="select_form wd_sm hg_lg">
                      <label>모집상태</label>
                      <ul class="select_custom">
                        <li>전체</li>
                        <li>모집중</li>
                        <li>모집마감</li>
                      </ul>
                    </div> -->
                </div>
                <div class="search_row">
                  <input
                    type="search"
                    class="form_style wd_p100"
                    placeholder="보고 싶은 비교과 프로그램을 찾아보세요"
                  />
                  <button type="button" class="btn_search btn_icon icon_only">
                    검색
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">
          테이블 종류

          <p class="mg_t10 font_gray font_14">
            반응형 가로 스크롤 클래스명은 table.css 에서 scrollx_tbl_... 참고
          </p>
        </h3>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">가로테이블</h4>
          </div>

          <!-- tbl_row -->
          <div class="tbl tbl_row">
            <table>
              <caption>
                테이블제목
              </caption>
              <colgroup>
                <col style="width: 22%" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">제목</th>
                  <td>인공지능 논문을 검토해주세요.</td>
                </tr>
                <tr>
                  <th scope="row">내용</th>
                  <td>
                    <span
                      >딥러닝에 대한 인공지능 논문을 작성해보았습니다. 수정된
                      내용을 검토해주세요.</span
                    >
                  </td>
                </tr>
                <tr>
                  <th scope="row">첨부파일</th>
                  <td>
                    <div class="attach_file_list">
                      <div class="file_row mg_b0">
                        <div class="file_name">
                          <p>글쓰기피드백.docx</p>
                          <i>145KB</i>
                          <button
                            type="button"
                            class="btn_icon icon_only download"
                          >
                            다운로드
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">세로테이블</h4>
            <p class="mg_t10 font_gray font_14">
              .tbl_scroll_body 는 높이 320px 이상 스크롤됨
            </p>
          </div>

          <!-- tbl_col -->
          <div class="tbl tbl_col">
            <table>
              <caption>
                테이블 제목
              </caption>
              <colgroup>
                <col style="width: auto" />
                <col style="width: 18%" />
                <col style="width: 18%" />
                <col style="width: 18%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="row">과목명</th>
                  <th scope="row">이수 학기</th>
                  <th scope="row">학점</th>
                  <th scope="row">선택</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">내용</th>
                  <td>내용</td>
                  <td>내용</td>
                  <td class="td_input">
                    <button type="button" class="btn_round btn_sm btn_white">
                      선택
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mg_b30"></div>

          <!-- tbl_col -->
          <div class="tbl tbl_col tbl_gray">
            <table>
              <caption>
                테이블 제목
              </caption>
              <colgroup>
                <col style="width: auto" />
                <col style="width: 18%" />
                <col style="width: 18%" />
                <col style="width: 18%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="row">과목명</th>
                  <th scope="row">이수 학기</th>
                  <th scope="row">학점</th>
                  <th scope="row">선택</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">내용</th>
                  <td>내용</td>
                  <td>내용</td>
                  <td class="td_input">
                    <button type="button" class="btn_round btn_sm btn_white">
                      선택
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">내용</th>
                  <td>내용</td>
                  <td>내용</td>
                  <td class="td_input">
                    <button type="button" class="btn_round btn_sm btn_white">
                      선택
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section_tit_wrap mg_t40">
            <h4 class="section_tit_xs">스크롤 세로테이블</h4>
            <p class="mg_t10 font_gray font_14">
              .tbl_scroll_body 는 높이 320px 이상 스크롤됨
            </p>
          </div>
          <!-- tbl_scroll -->
          <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
            <table>
              <caption>
                스크롤 테이블 제목
              </caption>
              <colgroup>
                <col style="width: auto" />
                <col style="width: 18%" />
                <col style="width: 18%" />
                <col style="width: 18%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="row">과목명</th>
                  <th scope="row">이수 학기</th>
                  <th scope="row">학점</th>
                  <th scope="row">선택</th>
                </tr>
              </thead>
            </table>
            <div class="tbl_scroll_body">
              <table>
                <caption>
                  테이블 제목
                </caption>
                <colgroup>
                  <col style="width: auto" />
                  <col style="width: 18%" />
                  <col style="width: 18%" />
                  <col style="width: 18%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td class="td_input">
                      <button type="button" class="btn_round btn_sm btn_white">
                        선택
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td class="td_input">
                      <button type="button" class="btn_round btn_sm btn_white">
                        선택
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td class="td_input">
                      <button type="button" class="btn_round btn_sm btn_white">
                        선택
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td class="td_input">
                      <button type="button" class="btn_round btn_sm btn_white">
                        선택
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td class="td_input">
                      <button type="button" class="btn_round btn_sm btn_white">
                        선택
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td class="td_input">
                      <button type="button" class="btn_round btn_sm btn_white">
                        선택
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td class="td_input">
                      <button type="button" class="btn_round btn_sm btn_white">
                        선택
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">Modal</h3>
      </div>
      <div class="sub_section_xs">
        <div class="box">
          <button
            class="button btn_primary btn_xl"
            @click="modalOpen = !modalOpen"
          >
            Show modal
          </button>
          <TModal
            :is-open="modalOpen"
            :is-show-header="true"
            :is-show-footer="true"
            :modal-id="'Template'"
            @close-modal="closeModal"
          >
            <!-- Modal content goes here -->
            <template #title>
              <strong>개인정보 수집 및 이용에 대한 동의</strong>
            </template>
            <template #default>
              <div class="search_section">
                <div class="search_toggle lg center">
                  <div class="left">
                    <p class="total_count">
                      <strong>2</strong>개의 비교과 프로그램
                    </p>
                  </div>
                  <div class="right">
                    <div class="select_row sm">
                      <SelectBoxBase
                        v-model="selectOption.value"
                        :data="selectOption.type"
                      />
                    </div>
                    <div class="select_row sm">
                      <SelectBoxBase
                        v-model="selectOption.value"
                        :data="selectOption.type"
                      />
                    </div>
                    <div class="search_row">
                      <input
                        type="search"
                        class="form_style wd_p100"
                        placeholder="보고 싶은 비교과 프로그램을 찾아보세요"
                      />
                      <button
                        type="button"
                        class="btn_search btn_icon icon_only"
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="search_section">
                <div class="search_toggle sm">
                  <div class="left"></div>
                  <div class="right">
                    <div class="search_daywrap mg_r10">
                      <span class="tag">운영일자</span>
                      <div class="wd_150">
                        <VDateInput
                          v-model="date"
                          placeholder="운영시작"
                        ></VDateInput>
                      </div>
                      <span>~</span>
                      <div class="wd_150">
                        <VDateInput
                          v-model="date"
                          placeholder="운영종료"
                        ></VDateInput>
                      </div>
                    </div>

                    <div class="input_wrap mg_r10">
                      <span class="tag">상태</span>
                      <div>
                        <p class="check_row">
                          <input
                            type="checkbox"
                            id="check_modal1"
                            class="hidden"
                            checked
                          />
                          <label for="check_modal1">심사중2</label>
                        </p>
                        <p class="check_row">
                          <input
                            type="checkbox"
                            id="check_modal2"
                            class="hidden"
                          />
                          <label for="check_modal2">진행중2</label>
                        </p>
                        <p class="check_row">
                          <input
                            type="checkbox"
                            id="check_modal3"
                            class="hidden"
                          />
                          <label for="check_modal3">종료2</label>
                        </p>
                      </div>
                    </div>
                    <div class="input_wrap mg_r10">
                      <span class="tag">상태</span>
                      <div>
                        <p class="radio_row">
                          <input
                            type="radio"
                            id="check_modal5"
                            class="hidden"
                            checked
                          />
                          <label for="check_modal5">심사중2</label>
                        </p>
                        <p class="radio_row">
                          <input
                            type="radio"
                            id="check_modal6"
                            class="hidden"
                          />
                          <label for="check_modal6">진행중2</label>
                        </p>
                        <p class="radio_row">
                          <input
                            type="radio"
                            id="check_modal7"
                            class="hidden"
                          />
                          <label for="check_modal7">종료</label>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn_round btn_lg btn_primary mg_l10"
                    >
                      조회하기
                    </button>
                    <button
                      type="button"
                      class="btn_round btn_lg btn_gray mg_l5"
                    >
                      초기화
                    </button>
                  </div>
                </div>
              </div>
              <div class="search_section search_tab">
                <div class="search_toggle sm">
                  <div class="left">
                    <div class="radio_tab_lg_wrap">
                      <p class="radio_tab_lg">
                        <input type="radio" id="radio_1" checked />
                        <label for="radio_1">탭제목 1</label>
                      </p>
                      <p class="radio_tab_lg">
                        <input type="radio" id="radio_2" />
                        <label for="radio_2">탭제목 2</label>
                      </p>
                    </div>
                  </div>
                  <div class="right"></div>
                </div>
              </div>
              <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
                <table>
                  <caption>
                    스크롤 테이블 제목
                  </caption>
                  <colgroup>
                    <col style="width: auto" />
                    <col style="width: 18%" />
                    <col style="width: 18%" />
                    <col style="width: 18%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="row">과목명</th>
                      <th scope="row">이수 학기</th>
                      <th scope="row">학점</th>
                      <th scope="row">선택</th>
                    </tr>
                  </thead>
                </table>
                <div class="tbl_scroll_body">
                  <table>
                    <caption>
                      테이블 제목
                    </caption>
                    <colgroup>
                      <col style="width: auto" />
                      <col style="width: 18%" />
                      <col style="width: 18%" />
                      <col style="width: 18%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs" id="idDowload">
                <table>
                  <caption>
                    스크롤 테이블 제목
                  </caption>
                  <colgroup>
                    <col style="width: auto" />
                    <col style="width: 18%" />
                    <col style="width: 18%" />
                    <col style="width: 18%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="row">과목명</th>
                      <th scope="row">이수 학기</th>
                      <th scope="row">학점</th>
                      <th scope="row">선택</th>
                    </tr>
                  </thead>
                </table>
                <div class="tbl_scroll_body">
                  <table>
                    <caption>
                      테이블 제목
                    </caption>
                    <colgroup>
                      <col style="width: auto" />
                      <col style="width: 18%" />
                      <col style="width: 18%" />
                      <col style="width: 18%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">내용</th>
                        <td>내용</td>
                        <td>내용</td>
                        <td class="td_input">
                          <button
                            type="button"
                            class="btn_round btn_sm btn_white"
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <template #footer>
              <!-- Footer content goes here -->
              <button
                type="button"
                class="button btn_xl btn_white popup_close"
                @click="confirmAction"
              >
                닫기
              </button>
              <button
                type="button"
                class="button btn_xl btn_primary"
                @click="cancelAction"
              >
                확인
              </button>
            </template>
          </TModal>
        </div>
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">페이징</h3>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <PaginationUi></PaginationUi>
          <!-- <div class="paging_wrap">
            <button class="page_con prev_page" disabled>이전페이지</button>
            <button class="active"><p>1</p></button>
            <button><p>2</p></button>
            <button><p>3</p></button>
            <button><p>4</p></button>
            <button><p>5</p></button>
            <button class="page_con next_page">다음페이지</button>
          </div> -->
        </div>
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">파일첨부</h3>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="sub_section_xs">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">이미지추가 1</h4>
            </div>
            <!--            <div class="add_photo">-->
            <!--              &lt;!&ndash; <img src="@/assets/images/common/img_ex1.png" alt="프로필 이미지" /> &ndash;&gt;-->
            <!--              <label class="btn_add_photo">-->
            <!--                <p>사진추가</p>-->
            <!--                <input type="file" class="hidden" />-->
            <!--              </label>-->
            <!--            </div>-->
            <InputFileBase
              :id="'id1'"
              :name="'id1'"
              :type="'img'"
              :referKey="1"
              :mode="'create'"
              :previewFlag="true"
              :multiple="true"
              :maxFile="3"
              ref="childRef"
              :orgName="'orgName'"
              :category="'category'"
              :sectionName="'sectionName'"
            >
            </InputFileBase>
          </div>
          <div class="sub_section_xs">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">이미지추가 2</h4>
            </div>
            <div class="add_ci">
              <!-- <img src="@/assets/images/common/img_ex1.png" alt="프로필 이미지" /> -->
              <label class="btn_add_ci">
                <p>CI 이미지를<br />등록해주세요</p>
                <input type="file" class="hidden" />
              </label>
              <button type="button" class="btn_delete"></button>
            </div>
          </div>
          <div class="sub_section_xs">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">파일추가 1</h4>
            </div>
            <div class="attach_filewrap">
              <label class="btn_round btn_white btn_sm">
                파일 추가
                <input type="file" class="hidden" />
              </label>
              <div class="attach_file_list">
                <div class="file_row">
                  <div class="file_name">
                    <p>알고리즘수정.hwp</p>
                    <i>145KB</i>
                    <button type="button" class="btn_icon icon_only download">
                      다운로드
                    </button>
                    <button type="button" class="btn_icon icon_only delete">
                      삭제
                    </button>
                  </div>
                </div>
                <div class="file_row">
                  <div class="file_name">
                    <p>알고리즘수정.hwp</p>
                    <i>145KB</i>
                    <button type="button" class="btn_icon icon_only download">
                      다운로드
                    </button>
                    <button type="button" class="btn_icon icon_only delete">
                      삭제
                    </button>
                  </div>
                </div>
                <div class="file_row">
                  <div class="file_name">
                    <p>알고리즘수정.hwp</p>
                    <i>145KB</i>
                    <button type="button" class="btn_icon icon_only download">
                      다운로드
                    </button>
                    <button type="button" class="btn_icon icon_only delete">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VDateInput from "@/components/common/VDateInput.vue";
import PaginationUi from "@/components/common/PaginationUi.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import TModal from "@/components/common/modal/TModal.vue";
import VueSelect from "@/components/common/vueSelect/VueSelect.vue";
import SelectBoxBaseCheckBox from "@/components/common/input/SelectBoxBaseCheckBox.vue";
import MonthDatePicker from "@/components/common/datepicker/MonthDatePicker.vue";
import SelectBoxBaseSearch from "@/components/common/input/SelectBoxBaseSearch.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import ExportFileExcel from "../common/excel/ExportFileExcel.vue";
import { MultiHeaderData } from "../../stores/common/excel/excelData.type";
export default {
  components: {
    BaseDatePicker,
    SelectBoxBaseSearch,
    MonthDatePicker,
    SelectBoxBaseCheckBox,
    VueSelect,
    TModal,
    TextArea,
    InputBase,
    InputFileBase,
    SelectBoxBase,
    VDateInput,
    PaginationUi,
    ExportFileExcel,
  },
  data: () => ({
    radioValues: "radioValue1",
    date: "",
    selectOption: {
      value1: "11",
      value2: "11",
      value3: "11",
      value4: "11",
      type: [
        { cdId: "11", cdNm: "비게", upCdId: "1" },
        { cdId: "12", cdNm: "비게시", upCdId: "1" },
        { cdId: "13", cdNm: "비게시1", upCdId: "1" },
        { cdId: "14", cdNm: "비게시2", upCdId: "1" },
        { cdId: "15", cdNm: "비게시비게시비게시2", upCdId: "1" },
      ],
    },
    modalOpen: false,
    dataExport: [
      {
        sheetName: "sheet1",
        data: [
          [1, 2, 3],
          [1, 5, 6],
          [1, 2, 3],
        ],
        header: [
          ["col1", "col2", "col3", "coleR", "coleR", "colC"],
          ["col1", "col2", "col5", "coleR1", "coleR2", "colC"],
          ["col1", "col2", "col4", "coleR3", "coleR4", "colC"],
        ],
      },
    ] as Array<MultiHeaderData>,
    arrayColor: [{ color: "F15922", name: ["col1", "col2"] }],
    address: "",
    postcode: "",
  }),
  methods: {
    onclickEx1() {
      const vm = this;
      vm.$confirm("저장하시겠어요?", "알림", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$toast("저장되었습니다.<br /> 목록으로 이동합니다.");
        }
      });
    },
    onclickEx2() {
      const vm = this;
      vm.$alert("오류가 발생하였습니다.");
    },

    // Modal
    closeModal() {
      this.modalOpen = false;
    },
    confirmAction() {
      // Handle confirm action
      this.closeModal();
    },
    cancelAction() {
      // Handle cancel action
      this.closeModal();
    },
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // Sau khi người dùng chọn địa chỉ, thông tin sẽ được trả về.
          this.address = data.address;
          this.postcode = data.zonecode;
        },
      }).open();
    },
  },
};
</script>
