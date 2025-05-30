<template>
  <div class="content_wrap">
    <div id="content" class="grid_content" tabindex="0">
      <div class="box dp_block">
        <div class="box_section company_overview dp_flex">
          <div class="wd_200">
            <div class="img_wrap">
              <img
                class=""
                src="https://cdn.tgdd.vn/Files/2019/03/07/1153472/chinese-new-year_600x800.jpg"
              />
            </div>
          </div>
          <div class="mg_l40">
            <div class="box_section">
              <div class="section_tit_wrap">
                <h3 class="section_tit_md">Cửa Hàng Top 1 Vn 관리자</h3>
              </div>
              <div class="search_box col_2">
                <ul class="form_info">
                  <li>
                    <p>Mã Cửa Hàng</p>
                    <span>ST943jk4324</span>
                  </li>
                  <li>
                    <p>Số điện thoại</p>
                    <span>0328843156</span>
                  </li>
                  <li>
                    <p>Email</p>
                    <span>nguyenquochuy@gmail.com</span>
                  </li>
                  <li>
                    <p>SNS</p>
                    <span>
                      <div class="company_sns">
                        <ul>
                          <li
                            class="f14"
                            v-tooltip="'https://www.instagram.com/hyundai'"
                          >
                            <a href="https://www.instagram.com/hyundai"
                              ><i class="insta"></i
                            ></a>
                          </li>
                          <li
                            class="f14"
                            v-tooltip="'https://www.instagram.com/hyundai'"
                          >
                            <a href="javascript:void()"
                              ><i class="youtube"></i
                            ></a>
                          </li>
                          <li class="f14 not_exits" v-tooltip="'Chưa Cấu Hình'">
                            <i class="facebook"></i>
                          </li>
                          <li class="f14 not_exits" v-tooltip="'Chưa Cấu Hình'">
                            <i class="tiktok"></i>
                          </li>
                        </ul>
                      </div>
                    </span>
                  </li>
                  <li>
                    <p>Chủ cửa hàng</p>
                    <span
                      ><a href="https://www.instagram.com/hyundai"
                        >Nguyễn Quốc Huy</a
                      ></span
                    >
                  </li>
                  <li>
                    <p>Địa Chỉ</p>
                    <span
                      >123 Phố BAB, Phường BDCM HSnm, Quận Hai Bà Trưng, TP Hà
                      Nội</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divide_box">
        <div class="box">
          <h3 class="box_title">DIVIDE BOX TITLE</h3>
          <p>box 외 영역 2개로 나눌때</p>
        </div>
        <div class="box">
          <h3 class="box_title">DIVIDE BOX TITLE</h3>
          <p>box 외 영역 2개로 나눌때</p>
        </div>
        <div class="box">
          <h3 class="box_title">DIVIDE BOX TITLE</h3>
          <p>box 외 영역 2개로 나눌때</p>
        </div>
        <div class="box">
          <h3 class="box_title">DIVIDE BOX TITLE</h3>
          <p>box 외 영역 2개로 나눌때</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.company_overview .img_wrap {
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
}
.company_overview .img_wrap > img {
  max-width: 200px;
}
.img_wrap > img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}
.form_info > li > p {
  text-align: left !important;
  font-size: 14px !important;
}
.search_box.col_2 > .form_info {
  gap: 20px;
}
.not_exits {
  filter: brightness(0.5);
}
</style>
