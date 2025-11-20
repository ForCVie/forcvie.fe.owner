import http from "@/utils/http";
import { SITE_OWNER } from "@/constants/common.const";
import type { OwnerMenuFilterReq, OwnerMenuReq, OwnerMenuActionReq, UpdateMenuProductsRequest } from "./menu.type";

const url = `${SITE_OWNER}/menu-mng`;

export const getPageData = (data: OwnerMenuFilterReq) => {
  return http.post(url + '/list', data);
};

export const getDataDetail = (data: string) => {
  return http.post(url + '/detail', data);
};

export const saveData = (data: OwnerMenuReq) => {
  return http.post(url + '/save', data);
};

// --- API HÀNG LOẠT ---
export const deactivateMenus = (data: OwnerMenuActionReq) => {
  return http.post(url + '/deactivate-multiple', data);
};

export const activateMenus = (data: OwnerMenuActionReq) => {
  return http.post(url + '/activate-multiple', data);
};

export const removeMenus = (data: OwnerMenuActionReq) => {
  return http.post(url + '/remove-multiple', data);
};

// --- API QUẢN LÝ SẢN PHẨM TRONG MENU ---
export const updateProductsInMenu = (data: UpdateMenuProductsRequest) => {
    return http.post(url + '/update-products', data);
};

export const findProductsInMenu = (menuSeq: string) => {
    return http.post(url + '/list-products', menuSeq);
};