import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdNoticeFilterReq, AdNoticeReq } from "./noticeMng.type";
const url = `${SITE_ADMIN}/fqa/notice`;

export const getPageData = (data: AdNoticeFilterReq) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdNoticeReq) => {
    return http.post(url + '/save', data)
}

export const removeData = (data: string) => {
    return http.post(url + '/remove', data)
}

export const getDataForm = (data: string[]) => {
    return http.post(url + '/form', data)
}

export const setNoticeUp = (data: string[]) => {
    return http.post(url + '/set-up', data)
}

export const setNoticeDown = (data: string[]) => {
    return http.post(url + '/set-down', data)
}

export const getFormData = () => {
    return http.post(url + '/form')
}