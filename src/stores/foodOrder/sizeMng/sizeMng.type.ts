// DTO cho response trong danh sách Kích cỡ
export type OwnerProductSizeResDTO = {
  sizeSeq: string;
  name: string;
  delYn: string;
  createdDate: string; // Thêm ngày tạo để hiển thị
  rowNum: number;
};

// DTO cho request filter/search Kích cỡ
export type OwnerProductSizeFilterReq = {
  name: string;
  foodStoreSeq: string;
  page: number;
  size: number;
  sort: string;
};

// DTO cho request tạo/cập nhật Kích cỡ
export type OwnerProductSizeReq = {
  sizeSeq?: string; // Optional khi tạo mới
  foodStoreSeq: string;
  name: string;
  delYn: string;
};

// DTO cho chi tiết Kích cỡ (dùng cho form edit)
export type OwnerProductSizeDetailDTO = {
  sizeSeq: string;
  foodStoreSeq: string;
  name: string;
  description: string;
  delYn: string;
};
