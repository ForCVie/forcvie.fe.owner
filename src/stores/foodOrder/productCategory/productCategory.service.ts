import http from "@/utils/http";
import { SITE_OWNER } from "@/constants/common.const";
import type { OwnerProductCategoryFilterReq, OwnerProductCategoryReq } from "./productCategory.type";
const url = `${SITE_OWNER}/product-category-mng`;

export const getPageData = (data: OwnerProductCategoryFilterReq) => {
  return http.post(url + '/list', data);
};

export const getDataDetail = (data: string) => {
  return http.post(url + '/detail', data);
};

export const saveData = (data: OwnerProductCategoryReq) => {
  return http.post(url + '/save', data);
};

export const removeData = (data: string) => {
  return http.post(url + '/remove', data);
};

/**
 * Lấy tất cả danh mục (không phân trang) để làm dropdown danh mục cha
 */
export const getAllCategories = (data: OwnerProductCategoryFilterReq) => {
    // Giả sử backend có API này để lấy list gọn nhẹ
    return http.post(url + '/list-all', data);
}
