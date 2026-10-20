import http from "@/utils/http";
import type { CodeMngRes, CodeMngResModel } from "./codeMng.type";
import { GET_BY_CODE, GET_BY_LIST_CODE } from "@/constants/api.const";

export const getCodeMngByUpCdId = (param: CodeMngRes) => {
    return http.postByCode(GET_BY_CODE, param);
}

export const getListCodeMng= (upcIdList: CodeMngResModel) => {
    return http.postByCode(GET_BY_LIST_CODE, upcIdList);
}

