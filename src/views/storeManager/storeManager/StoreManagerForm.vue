<template>
  <div class="content_wrap">
    <div id="content" class="grid_content" tabindex="0">
      <div class="box dp_block">
        <h3 class="box_title_sm">THÔNG TIN CƠ BẢN</h3>
        <div class="box_section company_overview dp_flex">
          <div class="wd_200">
            <div class="img_wrap">
              <img
                class=""
                src="https://cdn.tgdd.vn/Files/2019/03/07/1153472/chinese-new-year_600x800.jpg"
              />
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
        <h3 class="box_title">THỂ LOẠI CỬA HÀNG</h3>
        <p>box 외 영역 2개로 나눌때</p>
      </div>
      <div class="box dp_block">
        <h3 class="box_title">TỪ KHÓA TÌM KIẾM</h3>
        <p>box 외 영역 2개로 나눌때</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
</script>

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
