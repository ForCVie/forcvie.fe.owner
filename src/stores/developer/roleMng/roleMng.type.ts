import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

export type AdRoleResDTO = {
    roleId: string;
    roleCd: string;
    roleNm: string;
    roleSiteCd: string;
    rowNum: number;
}

export type AdRoleFilterRequest = {
    roleCd: string;
    roleNm: string;
    roleSiteCd: string;
    page: number;
    size: number;
    sort: string;
}

export type AdRoleDetailDTO = {
    roleId: string;
    roleNm: string;
    roleDesc: string;
    roleSiteCd: string;
    roleCd: string;
    listMenu: String[];
}

export type AdMenuRoleDetailDTO = {
    menuId: string;
    status: string;
}

export type AdRoleRequest = {
    roleId: string;
    roleNm: string;
    roleDesc: string;
    roleSiteCd: string;
    roleCd: string;
    listMenu: String[];
}

export type AdMenuRoleRequest = {
    menuId: string;
    status: string;
}

export type AdRoleFormDTO = {
    listMenu: CodeMngModel[]
}