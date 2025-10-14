import type { OwnerProductResDTO } from "../productMng/productMng.type";

export type OwnerMenuResDTO = {
  menuSeq: string;
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
  menuSeq?: string;
  foodStoreSeq: string;
  name: string;
  description: string;
  useYn: string;
  productSeqs: string[];
};

// DTO cho chi tiết Menu
export type OwnerMenuDetailDTO = OwnerMenuReq & {
  products: OwnerProductResDTO[]; // Danh sách sản phẩm trong menu
};

// DTO cho các hành động hàng loạt
export type OwnerMenuActionReq = {
  menuSeqs: string[];
};

// DTO để cập nhật sản phẩm trong menu
export type UpdateMenuProductsRequest = {
  menuSeq: string;
  productSeqs: string[];
};
