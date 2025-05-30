import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import {UserManagementSearchModel, DetailModel, ProfSearchModel} from "./userManagement.type"
const url = `${SITE_ADMIN}/userMng`;

export const getListData = (data: UserManagementSearchModel) => {
    return http.post(url + '/list', data)
}

export const getListProfs = (data: ProfSearchModel) => {
    return http.post(url + '/list/prof', data)
}

export const getListRole = () => {
    return http.get(url + '/listRole')
}

export const getDetaiData = (data: string) => {
    return http.post(url + '/detail', data)
}

export const updateRole = (data: DetailModel) => {
    return http.post(url + '/updateRole', data)
}