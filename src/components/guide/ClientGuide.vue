<template>
  <div class="grid_content">
    <p class="font_red section_tit_md">아직 작업중! 내용 추가 예정입니다.</p>
    <div class="sub_section">
      <p class="mg_b30 font_gray font_14 lh_22">영산대학교 관리자 + 교직원사이트 UI 가이드입니다.</p>
      <div class="section_tit_wrap">
        <h3 class="section_tit_xs">제목 타이틀 크기별 : section_tit_xs</h3>
        <h3 class="section_tit_sm">제목 타이틀 크기별 : section_tit_sm</h3>
        <h3 class="section_tit">제목 타이틀 크기별 : section_tit</h3>
        <h3 class="section_tit_md">제목 타이틀 크기별 : section_tit_md</h3>
        <h3 class="section_tit_lg">제목 타이틀 크기별 : section_tit_lg</h3>
      </div>

      <div class="box mg_b30">
        <div class="section_tit_wrap">
          <h4 class="section_tit_xs">section_tit_xs</h4>
        </div>

        <ul class="list_line">
          <li>표준화 디자인 기반입니다. 없거나 수정이 필요한 요소는 추가/수정 해주세요</li>
          <li>영산대 디자인으로 이미지 덮어쓰기 가능</li>
          <li>section 나누기 관련 클래스명 : main.css 참고 (sub_section ... )</li>
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
      <div class="section_tit_wrap">
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
          <!-- <div class="select_form wd_sm">
              <label>전체</label>
              <ul class="select_custom">
                <li>전체</li>
                <li>이름</li>
              </ul>
            </div> -->
        </div>
      </div>

      <div class="sub_section">
        <div class="sub_section_sm">
          <div class="box">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">버튼종류</h4>
            </div>
            <div>
              <button type="button" class="btn_round btn_sm btn_primary">긍정버튼</button>
              <button type="button" class="btn_round btn_sm btn_secondary">긍정2버튼</button>
              <button type="button" class="btn_round btn_sm btn_white">중립버튼</button>
              <button type="button" class="btn_round btn_sm btn_gray">부정버튼</button>
              <button type="button" class="btn_round btn_sm btn_lightgray">부정2버튼</button>
              <button type="button" class="btn_round btn_sm btn_bo_primary">긍정border버튼</button>
              <button type="button" class="btn_round btn_sm btn_bo_gray">border버튼</button>
              <button type="button" class="btn_round btn_sm btn_bo_black">border버튼</button>

              <p class="mg_t10 mg_b10 font_gray">보통 긍정부정 같이 있을때는 (중립(취소) + 긍정(저장))</p>

              <button type="button" class="btn_round btn_sm btn_white btn_icon download">아이콘버튼</button>
              <button type="button" class="btn_round btn_sm btn_icon icon_only download">아이콘만있는버튼</button>

              <p class="mg_t10 mg_b10 font_gray">( 현재는 이미지 주석처리 해두었습니다 / 필요에 따라 추가해서 사용 )</p>
            </div>
          </div>
        </div>
        <div class="sub_section_sm">
          <div class="box">
            <div class="section_tit_wrap">
              <h4 class="section_tit_xs">sweetalert2 - 알럿창 플러그인입니다 (클릭시 알럿 뜸)</h4>
            </div>
            <div>
              <button type="button" class="btn_round btn_sm btn_primary" onclick="btnAlert();">alert 창 예시</button>
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
            ※ 페이지 하단 버튼영역은 btn_xl, btn_round2 사용 (또는 디자인 참고해서 적용해주세요)
          </p>
        </h3>
      </div>

      <!-- 가운데 정렬 -->
      <div class="btn_area">
        <button type="button" class="btn_xl btn_round2 btn_white">목록으로</button>
        <button type="button" class="btn_xl btn_round2 btn_primary">저장하기</button>
      </div>

      <!-- 오른쪽 정렬 -->
      <div class="btn_area ta_r">
        <button type="button" class="btn_xl btn_round2 btn_gray">목록</button>
        <button type="button" class="btn_xl btn_round2 btn_white">다음</button>
        <button type="button" class="btn_xl btn_round2 btn_primary">저장</button>
      </div>

      <!-- 왼쪽 정렬 -->
      <div class="btn_area ta_l">
        <button type="button" class="btn_xl btn_round2 btn_gray">목록</button>
        <button type="button" class="btn_xl btn_round2 btn_white">다음</button>
        <button type="button" class="btn_xl btn_round2 btn_primary">저장</button>
      </div>
    </div>

    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">탭종류</h3>
      </div>
      <div class="box">
        <p class="mg_b20 font_gray">※ 표준화에서 사용중인 탭 종류 (디자인에 따라 수정해서 사용)</p>
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
          <div class="radio_tab_wrap black">
            <p class="radio_tab inline">
              <input type="radio" id="radio_round_black1" value="" checked />
              <label for="radio_round_black1">라디오탭1</label>
            </p>
            <p class="radio_tab inline">
              <input type="radio" id="radio_round_black2" value="" />
              <label for="radio_round_black2">라디오탭2</label>
            </p>
          </div>
        </div>
        <div class="sub_section_sm">
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
        <div class="sub_section_sm">
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
        </div>
        <div class="sub_section_sm">
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
        </div>
        <div class="sub_section_sm">
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
        </div>
        <div class="sub_section_sm">
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
        </div>
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
              <input type="checkbox" v-model="checkValue1" value="1R" id="checkrow1" class="hidden" checked />
              <label for="checkrow1">체크박스 1</label>
            </p>
            <p class="check_row">
              <input type="checkbox" v-model="checkValue1" value="2R" id="checkrow2" class="hidden" />
              <label for="checkrow2">체크박스 2</label>
            </p>
            <p class="check_row">
              <input type="checkbox" v-model="checkValue1" value="3R" id="checkrow3" class="hidden" disabled />
              <label for="checkrow3">체크박스 3</label>
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
            <input type="radio" v-model="radioValue1" value="1R" id="radio1" class="hidden" checked />
            <label for="radio1">라디오버튼 1</label>
          </p>
          <p class="radio_row">
            <input type="radio" v-model="radioValue1" value="2R" id="radio2" class="hidden" />
            <label for="radio2">라디오버튼 2</label>
          </p>
          <p class="radio_row">
            <input type="radio" v-model="radioValue1" value="3R" id="radio3" class="hidden" />
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
          <input type="text" class="form_style wd_p100" placeholder="텍스트 input" />
          <input type="text" class="form_style wd_p100" placeholder="텍스트 input disabled" disabled />

          <textarea rows="6" class="form_style wd_p100" placeholder="내용을 입력해주세요."></textarea>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">select box</h4>
          </div>
          <div class="select_row xs">
            <vue-select class="select_box lg"></vue-select>
          </div>

          <div class="select_row lg">
            <vue-select class="select_box" :options="selectOption.type" v-model="selectOption.value"></vue-select>
          </div>
          <p class="mg_t10 font_gray">※ 높이별로 select_box에 class명 추가 ( sm, md, lg )</p>
          <p class="mg_t10 font_gray">※ 너비별로 select_row에 class명 추가 ( xxs, xs, sm, md, g, xlg )</p>
        </div>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">달력</h4>
          </div>

          <VDateInput v-model="date" placeholder="시작일"></VDateInput>
          <VDateInput v-model="date" placeholder="종료일" :disabled="true"></VDateInput>

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
                <p class="total_count"><strong>2</strong>개의 비교과 프로그램</p>
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
                  <button type="button" class="btn_search btn_icon icon_only">검색</button>
                </div>
                <button type="button" class="btn_round btn_lg btn_primary mg_l10">조회하기</button>
                <button type="button" class="btn_round btn_lg btn_gray mg_l5">초기화</button>
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
                <p class="total_count"><strong>2</strong>개의 비교과 프로그램</p>
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
                  <button type="button" class="btn_search btn_icon icon_only">검색</button>
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
                    <VDateInput v-model="date" placeholder="운영시작"></VDateInput>
                  </div>
                  <span>~</span>
                  <div class="wd_150">
                    <VDateInput v-model="date" placeholder="운영종료"></VDateInput>
                  </div>
                </div>

                <div class="input_wrap mg_r10">
                  <span class="tag">상태</span>
                  <div>
                    <p class="check_row">
                      <input type="checkbox" id="checka1" class="hidden" checked />
                      <label for="checka1">심사중</label>
                    </p>
                    <p class="check_row">
                      <input type="checkbox" id="checka2" class="hidden" />
                      <label for="checka2">진행중</label>
                    </p>
                    <p class="check_row">
                      <input type="checkbox" id="checka3" class="hidden" />
                      <label for="checka3">종료</label>
                    </p>
                  </div>
                </div>
                <div class="input_wrap mg_r10">
                  <span class="tag">상태</span>
                  <div>
                    <p class="radio_row">
                      <input type="radio" id="radioa1" class="hidden" checked />
                      <label for="radioa1">심사중</label>
                    </p>
                    <p class="radio_row">
                      <input type="radio" id="radioa2" class="hidden" />
                      <label for="radioa2">진행중</label>
                    </p>
                    <p class="radio_row">
                      <input type="radio" id="radioa3" class="hidden" />
                      <label for="radioa3">종료</label>
                    </p>
                  </div>
                </div>
                <button type="button" class="btn_round btn_lg btn_primary mg_l10">조회하기</button>
                <button type="button" class="btn_round btn_lg btn_gray mg_l5">초기화</button>
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
                <p class="total_count"><strong>2</strong>개의 비교과 프로그램</p>
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
                  <button type="button" class="btn_search btn_icon icon_only">검색</button>
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

          <p class="mg_t10 font_gray font_14">반응형 가로 스크롤 클래스명은 table.css 에서 scrollx_tbl_... 참고</p>
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
                    <span>딥러닝에 대한 인공지능 논문을 작성해보았습니다. 수정된 내용을 검토해주세요.</span>
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
                          <button type="button" class="btn_icon icon_only download">다운로드</button>
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
            <p class="mg_t10 font_gray font_14">.tbl_scroll_body 는 높이 320px 이상 스크롤됨</p>
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
                  <td>
                    <button type="button" class="btn_round btn_sm btn_white">선택</button>
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
                  <td>
                    <button type="button" class="btn_round btn_sm btn_white">선택</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">내용</th>
                  <td>내용</td>
                  <td>내용</td>
                  <td>
                    <button type="button" class="btn_round btn_sm btn_white">선택</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section_tit_wrap mg_t40">
            <h4 class="section_tit_xs">스크롤 세로테이블</h4>
            <p class="mg_t10 font_gray font_14">.tbl_scroll_body 는 높이 320px 이상 스크롤됨</p>
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
                    <td>
                      <button type="button" class="btn_round btn_sm btn_white">선택</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td>
                      <button type="button" class="btn_round btn_sm btn_white">선택</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td>
                      <button type="button" class="btn_round btn_sm btn_white">선택</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td>
                      <button type="button" class="btn_round btn_sm btn_white">선택</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td>
                      <button type="button" class="btn_round btn_sm btn_white">선택</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td>
                      <button type="button" class="btn_round btn_sm btn_white">선택</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td>내용</td>
                    <td>내용</td>
                    <td>
                      <button type="button" class="btn_round btn_sm btn_white">선택</button>
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
        <h3 class="section_tit_md">페이징</h3>
      </div>

      <div class="sub_section_xs">
        <div class="box">
          <div class="paging_wrap">
            <button class="page_con prev_page" disabled>이전페이지</button>
            <button class="active"><p>1</p></button>
            <button><p>2</p></button>
            <button><p>3</p></button>
            <button><p>4</p></button>
            <button><p>5</p></button>
            <button class="page_con next_page">다음페이지</button>
          </div>
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
            <div class="add_photo">
              <!-- <img src="@/assets/images/common/img_ex1.png" alt="프로필 이미지" /> -->
              <label class="btn_add_photo">
                <p>사진추가</p>
                <input type="file" class="hidden" />
              </label>
            </div>
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
                    <button type="button" class="btn_icon icon_only download">다운로드</button>
                    <button type="button" class="btn_icon icon_only delete">삭제</button>
                  </div>
                </div>
                <div class="file_row">
                  <div class="file_name">
                    <p>알고리즘수정.hwp</p>
                    <i>145KB</i>
                    <button type="button" class="btn_icon icon_only download">다운로드</button>
                    <button type="button" class="btn_icon icon_only delete">삭제</button>
                  </div>
                </div>
                <div class="file_row">
                  <div class="file_name">
                    <p>알고리즘수정.hwp</p>
                    <i>145KB</i>
                    <button type="button" class="btn_icon icon_only download">다운로드</button>
                    <button type="button" class="btn_icon icon_only delete">삭제</button>
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

export default {
  components: {
    VDateInput,
  },
  data: () => ({
    date: "",
    selectOption: {
      value: "전체전체전체전체전체전체전체",
      type: [
        { label: "전체", value: "" },
        { label: "전공 필수", value: "01" },
        { label: "전공 선택", value: "02" },
        { label: "교양 필수", value: "03" },
        { label: "교양 선택", value: "04" },
      ],
    },
    checkValue1: ["checkValue1"],
    radioValue1: "",
  }),
};
</script>
