import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdPopupNoticeFilterReq, AdPopupNoticeReq } from "./popupPromotion.type";
const url = `${SITE_ADMIN}/promotion/popup-notice`;

export const getPageData = (data: AdPopupNoticeFilterReq) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdPopupNoticeReq) => {
    return http.post(url + '/save', data)
}

export const removeData = (data: string) => {
    return http.post(url + '/remove', data)
}
