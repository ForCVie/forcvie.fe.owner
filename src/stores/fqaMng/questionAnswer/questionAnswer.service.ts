import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { AdQuestionAnswerFilterReq, AdQuestionAnswerReq } from "./questionAnswer.type";
const url = `${SITE_ADMIN}/fqa/question-answer`;

export const getPageData = (data: AdQuestionAnswerFilterReq) => {
    return http.post(url + '/list', data)
}

export const getDataDetail = (data: string) => {
    return http.post(url + '/detail', data)
}

export const saveData = (data: AdQuestionAnswerReq) => {
    return http.post(url + '/save', data)
}

export const rejectQuestion = (data: string) => {
    return http.post(url + '/reject', data)
}
