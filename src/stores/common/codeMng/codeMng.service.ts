import http from "@/utils/http";
import type { CodeMngRes, CodeMngResModel } from "./codeMng.type";

export const getCodeMngByUpCdId = (param: CodeMngRes) => {
    return http.post(`/code/`, param);
}

export const getListCodeMng= (upcIdList: CodeMngResModel) => {
    return http.post(`/code/listCode`, upcIdList);
}

