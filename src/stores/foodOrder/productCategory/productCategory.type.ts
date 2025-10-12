// DTO cho response trong danh sách
export type OwnerProductCategoryResDTO = {
  categorySeq: string;
  name: string;
  description: string;
  parentCategorySeq: string;
  createdDate: string;
  rowNum: number;
};

// DTO cho request filter/search
export type OwnerProductCategoryFilterReq = {
  name: string;
  foodStoreSeq: string;
  page: number;
  size: number;
  sort: string;
};

// DTO cho request tạo/cập nhật
export type OwnerProductCategoryReq = {
  categorySeq?: string;
  foodStoreSeq: string;
  name: string;
  description: string;
  parentCategorySeq: string | null;
};

// DTO cho chi tiết (dùng cho form edit)
export type OwnerProductCategoryDetailDTO = {
  categorySeq: string;
  foodStoreSeq: string;
  name: string;
  description: string;
  parentCategorySeq: string | null;
};

