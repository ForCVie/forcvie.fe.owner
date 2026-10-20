import { GET_FILE_INFO_CMN, UPLOAD_FILE_CMN } from "@/constants/api.const";
import http from "@/utils/http";
export const createFile = (data: any) => {
    return http.postByCode(UPLOAD_FILE_CMN, data, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
}
export const getFile = (data: any) => {
    return http.postByCode(UPLOAD_FILE_CMN, data,{
        responseType: 'blob'

    })
}

export const getFileUploaded = (data: any) => {
    return http.postByCode(GET_FILE_INFO_CMN, {
            fimFileCategory: data.fimFileCategory,
            fimReferKeyId: data.fimReferKeyId,
    })
}
export const uploadFileEditor = (data: any) => {
    return http.postByCode(UPLOAD_FILE_CMN, data, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
}
export const deleteFile = (encodedFileName: number) => {
    return http.putByCode(UPLOAD_FILE_CMN)
}
