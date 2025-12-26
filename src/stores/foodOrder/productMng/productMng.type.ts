export type OwnerProductResDTO = {
  foodSeq: string;
  name: string;
  categoryName: string; // Tên danh mục
  useYn: string; // 'Y' hoặc 'N'
  delYn: string; // 'Y' hoặc 'N'
  createdDate: string;
  imageUrl?: string; // URL ảnh
  rowNum: number;
  checkedFlag: boolean;
  price: number;
};

// DTO cho request filter/search sản phẩm
export type OwnerProductFilterReq = {
  name: string;
  foodStoreSeq: string;
  categorySeq: string | null; // Có thể tìm theo mục lục
  page: number;
  size: number;
  sort: string;
  useYn: string;
};

// DTO cho request tạo/cập nhật sản phẩm
export type OwnerProductReq = {
  foodSeq?: string;
  foodStoreSeq: string;
  sizeSeq: string;
  name: string;
  categorySeq: string;
  price: number;
  description: string;
  delYn: string;
  useYn: string;
  imageUrl?: string | null;
};

// DTO cho chi tiết sản phẩm
export type OwnerProductDetailDTO = OwnerProductReq & {};

// DTO cho các hành động hàng loạt
export type OwnerProductActionReq = {
  foodSeqs: string[];
};
