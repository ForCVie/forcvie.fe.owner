import http from "@/utils/http";
import { SITE_OWNER } from "@/constants/common.const"; 
import type { OwnerProductSizeFilterReq, OwnerProductSizeReq } from "./sizeMng.type";

const url = `${SITE_OWNER}/product-size-mng`;

export const getPageData = (data: OwnerProductSizeFilterReq) => {
  return http.post(url + '/list', data);
};

export const getDataDetail = (data: string) => {
  return http.post(url + '/detail', data);
};

export const saveData = (data: OwnerProductSizeReq) => {
  return http.post(url + '/save', data);
};

export const removeData = (data: string) => {
  return http.post(url + '/remove', data);
};
