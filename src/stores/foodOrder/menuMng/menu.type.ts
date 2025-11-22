import type { OwnerProductResDTO } from "../productMng/productMng.type";

export type OwnerMenuResDTO = {
  foodMenuSeq: string;
  name: string;
  description: string;
  useYn: string; // 'Y' hoặc 'N'
  delYn: string; // 'Y' hoặc 'N'
  createdDate: string;
  rowNum: number;
  checkedFlag: boolean;
};

// DTO cho request filter/search Menu
export type OwnerMenuFilterReq = {
  name: string;
  foodStoreSeq: string;
  page: number;
  size: number;
  sort: string;
  useYn: string;
};

// DTO cho request tạo/cập nhật Menu
export type OwnerMenuReq = {
  foodMenuSeq?: string;
  foodStoreSeq: string;
  name: string;
  code: string;
  description: string;
  useYn: string;
  foodSeqs: string[];
};

// DTO cho chi tiết Menu
export type OwnerMenuDetailDTO = OwnerMenuReq & {
  foodSeqs: OwnerProductResDTO[]; // Danh sách sản phẩm trong menu
};

// DTO cho các hành động hàng loạt
export type OwnerMenuActionReq = {
  foodMenuSeqs: string[];
};

// DTO để cập nhật sản phẩm trong menu
export type UpdateMenuProductsRequest = {
  foodMenuSeq: string;
  foodSeqs: string[];
};
