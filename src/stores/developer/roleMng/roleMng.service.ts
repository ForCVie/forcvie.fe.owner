import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdRoleFilterRequest, AdRoleRequest } from "./roleMng.type";
const url = `${SITE_ADMIN}/developer/role-mng`;

export const getPageData = (data: AdRoleFilterRequest) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    console.log(data);
    
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdRoleRequest) => {
    return http.post(url + '/save', data)
}

export const removeData = (data: string) => {
    return http.post(url + '/remove', data)
}

export const getDataForm = (data: string) => {
    return http.post(url + '/form', data)
}