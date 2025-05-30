import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdBannerTeeFilterReq, AdBannerTeeReq } from "./bannerTeeMng.type";
const url = `${SITE_ADMIN}/promotion/banner-tee`;

export const getPageData = (data: AdBannerTeeFilterReq) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdBannerTeeReq) => {
    return http.post(url + '/save', data)
}

export const removeData = (data: string) => {
    return http.post(url + '/remove', data)
}
