import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdMenuFilterRequest, AdMenuRequest } from "./menuMng.type";
const url = `${SITE_ADMIN}/developer/menu-mng`;

export const getPageData = (data: AdMenuFilterRequest) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdMenuRequest) => {
    return http.post(url + '/save', data)
}

export const removeData = (data: string) => {
    return http.post(url + '/remove', data)
}

export const getDataForm = (data: string[]) => {
    return http.post(url + '/form', data)
}