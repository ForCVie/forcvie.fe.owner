<template>
  <div class="content_wrap">
    <div id="content" class="grid_content" tabindex="0">
      <div class="box dp_block">
        <h3 class="box_title_sm">THÔNG TIN CƠ BẢN</h3>
        <div class="box_section company_overview dp_flex">
          <div class="wd_200">
            <div class="img_wrap">
              <img class="" src="https://cdn.tgdd.vn/Files/2019/03/07/1153472/chinese-new-year_600x800.jpg" />
            </div>
          </div>
          <div class="mg_l40 wd_p100">
            <div class="box_section">
              <table class="tbl_row">
                <colgroup>
                  <col style="width: 24%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">Mã cửa hàng</th>
                    <td class="td_input">
                      <InputBase readonly />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="required">Tên cửa hàng</th>
                    <td>
                      <InputBase />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Chủ cửa hàng (Số - Tên)</th>
                    <td class="td_input">
                      <div class="dp_flex al_center">
                        <InputBase readonly :value="'03288423156'" />
                        <span class="mg_l10 mg_r10"> - </span>
                        <InputBase readonly :value="'Nguyễn Quốc Huy'" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="required">Liên hệ (Số - Tên)</th>
                    <td class="td_input">
                      <div class="dp_flex al_center">
                        <InputBase />
                        <span class="mg_l10 mg_r10"> - </span>
                        <InputBase />
                      </div>
                      <CheckboxBase :label="'Hiển thị'" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="required">
                      Địa chỉ <br />
                      (Tỉnh/TP - Quận/Huyện - Xã/Phường)
                    </th>
                    <td>
                      <div class="dp_flex al_center">
                        <SelectBoxBase />
                        <span class="mg_l10 mg_r10"> - </span>
                        <SelectBoxBase />
                        <span class="mg_l10 mg_r10"> - </span>
                        <SelectBoxBase />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      SNS <br />
                      (Instagram - Youtobe - Facebook - Tiktok)
                    </th>
                    <td>
                      <div class="dp_flex al_center">
                        <InputBase />
                        <span class="mg_l10 mg_r10"> - </span>
                        <InputBase />
                        <span class="mg_l10 mg_r10"> - </span>
                        <InputBase />
                        <span class="mg_l10 mg_r10"> - </span>
                        <InputBase />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="required">
                      Giấy phép an toàn vệ sinh thực phẩm
                    </th>
                    <td>
                      <InputFileBase />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="required">Địa chỉ chi tiết</th>
                    <td><TextArea /></td>
                  </tr>
                  <tr>
                    <th scope="row">Ghi Chú</th>
                    <td><TextArea /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_inner">
          <h3 class="box_title">THỂ LOẠI CỬA HÀNG</h3>
          <div class="box_title_funtion">
            <a href="javascript:void(0);" @click="openModal(0)">Thêm thể loại</a>
          </div>
        </div>
        <p>
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
        </p>
        <!-- <div class="no_cnt" id="section14">
          <p>Hiên chưa có thể loại cửa hàng.</p>
        </div> -->
      </div>
      <div class="box dp_block">
        <div class="box_inner">
          <h3 class="box_title">TỪ KHÓA TÌM KIẾM</h3>
          <div class="box_title_funtion">
            <a href="javascript:void(0);" @click="openModal(1)">Thêm từ khóa</a>
          </div>
        </div>
        <p>
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
        </p>
        <!-- <div class="no_cnt" id="section14">
          <p>Hiên chưa có từ khóa.</p>
        </div> -->
      </div>
      <div class="box dp_block">
        <div class="box_inner">
          <h3 class="box_title">CÁC CHỨNG CHỈ/ GIẢI THƯỞNG</h3>
          <div class="box_title_funtion">
            <a href="javascript:void(0);" @click="openModal(2)">Thêm giấy tờ</a>
          </div>
        </div>
        <p>
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
          <Tags :label="'Loại 1'" :color="'yellow'" />
        </p>
        <!-- <div class="no_cnt" id="section14">
          <p>Hiên chưa có chứng chỉ/giải thưởng.</p>
        </div> -->
      </div>
      <div class="box dp_block">
        <div class="box_inner">
          <h3 class="box_title">CÁC BÀI VIẾT LIÊN QUAN</h3>
          <div class="box_title_funtion">
            <a href="javascript:void(0);" @click="openModal(3)">Thêm bài viết</a>
          </div>
        </div>
            <div class="dp_grid grid_col_5">
                <div class="card-v1" v-for="item in 4">
                    <div class="card-v1-image" :style="{
                        backgroundImage: `url(https://via.placeholder.com/320x180.png?text=Event+1)`,
                    }"></div>
                    <div class="category">Đang diễn ra</div>
                    <div class="heading">
                        A heading that must span over two lines
                    </div>
                </div>
            </div>
        <!-- <div class="no_cnt" id="section14">
          <p>Hiên chưa có bài viết liên quan.</p>
        </div> -->
      </div>
    </div>
    <div class="box_section btn_add_form">
      <div class="btn_area">
        <button type="button" class="button btn_md btn_white ">닫기</button>
        <button type="button" class="button btn_md btn_primary  ">확인</button>
      </div>
    </div>
  </div>

  <!-- Start Popup Categorys Store -->
  <TModal :is-open="modalOpen[0]" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal(0)">
    <template #title>
      <strong>개인정보 수집 및 이용에 대한 동의</strong>
    </template>
    <template #default>
      <h1>fdfasd</h1>
    </template>
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close " @click="confirmAction">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue  " @click="cancelAction">확인
      </button>
    </template>
  </TModal>
  <!-- End Popup Categorys Store -->

  <!-- Start Popup Key Search Store -->
  <TModal :is-open="modalOpen[1]" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal(1)">
    <template #title>
      <strong>개인정보 수집 및 이용에 대한 동의</strong>
    </template>
    <template #default>
      <h1>fdfasd</h1>
    </template>
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close " @click="confirmAction">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue  " @click="cancelAction">확인
      </button>
    </template>
  </TModal>
  <!-- End Popup Key Search Store -->

  <!-- Start Popup Certificate Store -->
  <TModal :is-open="modalOpen[2]" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal(2)">
    <template #title>
      <strong>개인정보 수집 및 이용에 대한 동의</strong>
    </template>
    <template #default>

      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 24%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">Tên chứng chỉ/giải thưởng</th>
              <td>
                <InputBase />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                File chứng chỉ/giải thưởng
              </th>
              <td>
                <InputFileBase />
              </td>
            </tr>
            <tr>
              <th scope="row">Ghi Chú</th>
              <td><TextArea /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close " @click="confirmAction">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue  " @click="cancelAction">확인
      </button>
    </template>
  </TModal>
  <!-- End Popup Certificate Store -->

  <!-- Start Popup Articel Store -->
  <TModal :is-open="modalOpen[3]" :is-show-header="true" :is-show-footer="true" @close-modal="closeModal(3)">
    <template #title>
      <strong>개인정보 수집 및 이용에 대한 동의</strong>
    </template>
    <template #default>

      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 24%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">Tiêu đề</th>
              <td>
                <InputBase />
              </td>
            </tr>
            <tr>
              <th scope="row">
                Ảnh bài viết(Nếu có)
              </th>
              <td>
                <InputFileBase />
              </td>
            </tr>
            <tr>
              <th scope="row">Link bài viết</th>
              <td>
                <InputBase />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <button type="button" class="button btn_xl btn_white popup_close " @click="confirmAction">
        닫기
      </button>
      <button type="button" class="button btn_xl btn_blue  " @click="cancelAction">확인
      </button>
    </template>
  </TModal>
  <!-- End Popup Articel Store -->
</template>

<script setup lang="ts">
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import Tags from "@/components/common/tags/Tags.vue";

/* Start Setups */
const modalOpen = ref([false, false, false, false]);

/* End Setups */

/* Start methods */
const openModal = (index: number) => {
  modalOpen.value[index] = true
}
const closeModal = (index: number) => {
  modalOpen.value[index] = false
}
/* End methods */
</script>

<style scoped>
.company_overview .img_wrap {
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
}

.company_overview .img_wrap>img {
  max-width: 200px;
}

.img_wrap>img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.form_info>li>p {
  text-align: left !important;
  font-size: 14px !important;
}

.search_box.col_2>.form_info {
  gap: 20px;
}

.not_exits {
  filter: brightness(0.5);
}

.btn_add_form {
  position: sticky;
  left: 0;
  right: 0;
  bottom: 30px;
}
</style>
