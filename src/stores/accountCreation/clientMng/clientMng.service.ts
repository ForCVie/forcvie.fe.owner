import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdClientFilterRequest, AdClientMngRequest } from "./clientMng.type";

const url = `${SITE_ADMIN}/account-creation/client-mng`;

export const getPageData = (data: AdClientFilterRequest) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdClientMngRequest) => {
    return http.post(url + '/save', data)
}

export const removeData = (data: string) => {
    return http.post(url + '/remove', data)
}