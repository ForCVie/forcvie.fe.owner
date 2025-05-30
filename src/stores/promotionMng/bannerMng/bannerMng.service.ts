import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdBannerFilterReq, AdBannerReq } from "./bannerMng.type";
const url = `${SITE_ADMIN}/promotion/banner-mng`;

export const getPageData = (data: AdBannerFilterReq) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdBannerReq) => {
    return http.post(url + '/save', data)
}

export const removeData = (data: string) => {
    return http.post(url + '/remove', data)
}
