import { SITE_OWNER } from "@/constants/common.const";
import http from "@/utils/http";
import type { OwnerProductFilterReq, OwnerProductReq, OwnerProductActionReq } from "./productMng.type";
const url = `${SITE_OWNER}/food-mng`;

export const getPageData = (data: OwnerProductFilterReq) => {
  return http.post(url + '/list', data);
};

export const getDataDetail = (data: string) => {
  return http.post(url + '/detail', data);
};

export const saveData = (data: OwnerProductReq) => {
  return http.post(url + '/save', data);
};

// --- API HÀNG LOẠT ---
export const deactivateProducts = (data: OwnerProductActionReq) => {
  return http.post(url + '/deactivate-multiple', data);
};

export const activateProducts = (data: OwnerProductActionReq) => {
  return http.post(url + '/activate-multiple', data);
};

export const removeProducts = (data: OwnerProductActionReq) => {
  return http.post(url + '/remove-multiple', data);
};