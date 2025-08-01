<template>
    
  <TModal
    :is-open="modalOpen"
    :is-show-header="true"
    :size="'xl'"
    :is-show-footer="true"
    @close-modal="closeModal(0)"
  >
    <template #title>
      <strong class="bold">Thông tin hóa đơn</strong>
    </template>
    <template #default>
      <div>
        <div class="box_inner">
          <h3 class="box_title">Thông tin chung</h3>
        </div>
        <div class="box_section">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 12%" />
              <col style="width: auto" />
              <col style="width: 12%" />
              <col style="width: auto" />
              <col style="width: 12%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">Mã khách hàng</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
                <th scope="row">Tên khách hàng</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
                <th scope="row">Số điện thoại</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">Trạng thái</th>
                <td class="td_input">
                  <InputBase readonly :value="'Yêu cầu thanh toán'" />
                </td>
                <th scope="row">Mã giảm giá</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
                <th scope="row">Tổng tiền</th>
                <td class="td_input">
                  <InputBase readonly />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div class="box_section mt_5">
          <div class="box_inner">
            <h3 class="box_title">Thông tin đặt món</h3>
            <div class="box_title_funtion">
              <button
                  @click="openViewOrderFood()"
                  class="button btn_md btn_blue">Đặt món giúp khách
              </button>
            </div>
          </div>
          <table class="tbl_col">
              <col style="width: 8%" />
              <col style="width: 20%" />
              <col style="width: 12%" />
              <col style="width: 8%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên món</th>
                <th scope="col">Thời gian đặt</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="ta_c py-5" colspan="8">
                    <p>Không có dữ liệu</p>
                </th>
              </tr>
              <tr>
                <td class="ta_c">1</td>
                <td class="ta_c">Chả nướng</td>
                <td class="ta_c">2023-10-01 12:00</td>
                <td class="ta_c">3</td>
                <td class="ta_c">Đã lên món</td>
                <td class="ta_c">200.000đ</td>
                <td class="ta_c">400.000đ</td>
                <td class="ta_c">
                  <button type="button" class="btn_icon icon_only document" @click="openModal(2)" v-tooltip="'Xem chi tiết'">document</button>
                  <button type="button" class="btn_icon icon_only delete" @click="openModal(3)" v-tooltip="'Hủy món'">Xóa</button>
                </td>
              </tr>
              <tr>
                <td class="ta_c">2</td>
                <td class="ta_c">Chả nướng</td>
                <td class="ta_c">2023-10-01 12:00</td>
                <td class="ta_c">3</td>
                <td class="ta_c">Chờ lên món</td>
                <td class="ta_c">200.000đ</td>
                <td class="ta_c">400.000đ</td>
                <td class="ta_c">
                  <button type="button" class="btn_icon icon_only document" @click="openModal(2)" v-tooltip="'Xem chi tiết'">document</button>
                  <button type="button" class="btn_icon icon_only delete" @click="openModal(3)" v-tooltip="'Hủy món'">Xóa</button>
                </td>
              </tr>
              <tr>
                <td class="ta_c">3</td>
                <td class="ta_c">Chả nướng</td>
                <td class="ta_c">2023-10-01 12:00</td>
                <td class="ta_c">3</td>
                <td class="ta_c">Đã hủy</td>
                <td class="ta_c">200.000đ</td>
                <td class="ta_c">400.000đ</td>
                <td class="ta_c">
                  <button type="button" class="btn_icon icon_only document" @click="openModal(2)" v-tooltip="'Xem chi tiết'">document</button>
                  <button type="button" class="btn_icon icon_only delete" @click="openModal(3)" v-tooltip="'Hủy món'">Xóa</button>
                </td>
              </tr>
              <tr>
                <td class="ta_c">4</td>
                <td class="ta_c">Chả nướng</td>
                <td class="ta_c">2023-10-01 12:00</td>
                <td class="ta_c">3</td>
                <td class="ta_c">Mới order</td>
                <td class="ta_c">200.000đ</td>
                <td class="ta_c">400.000đ</td>
                <td class="ta_c">
                  <button type="button" class="btn_icon icon_only document" @click="openModal(2)" v-tooltip="'Xem chi tiết'">document</button>
                  <button type="button" class="btn_icon icon_only delete" @click="openModal(3)" v-tooltip="'Hủy món'">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal(0)"
      >
        닫기
      </button>
      <button
        type="button"
        class="button btn_xl btn_blue"
        @click="closeModal(0)"
      >
        확인
      </button>
    </template>
  </TModal>
</template>
<script setup lang="ts">
const props = defineProps({
  modalOpen: {
    type: Boolean,
    default: false,
  },
  closeModal: {
    type: Function,
    required: true,
  },
  openModal: {
    type: Function,
    required: true,
  },
});

const openViewOrderFood = () => {
  props.openModal(5);
  props.closeModal(0);
};
</script>