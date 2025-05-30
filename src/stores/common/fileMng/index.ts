import { createFile, getFile, getFileUploaded, deleteFile } from "./fileMng.service";
import { defineStore } from "pinia";
import { fileUploadedInfo } from "./fileMng.type";
import { ref } from "vue";
export const fileMngStore = defineStore('fileMng', () => {
    const status = ref<number>();
    const fileUploadedInfoList = ref<fileUploadedInfo[]>([]);
    const fileDowload = ref<any>();
    const type = ref<any>();
    const imgInfo = ref<any>();
    const addfile = async (params: any) => {
        try {
            const response = await createFile(params)
            status.value = response.status
        } catch (error) {
            console.log('API 호출 시 오류가 있습니다')
        }
    }
    const getFileDowload = async (params: any) => {
        try {
            const response = await getFile(params)
            fileDowload.value = response.data
            type.value = response.headers['content-type'];
            status.value = response.status
        } catch (error) {
            console.log('API 호출 시 오류가 있습니다')
        }
    }
    const getListFileUpload = async (params: any) => {
        try {
            const response = await getFileUploaded(params)
            fileUploadedInfoList.value = response.data.data
            status.value = response.status
        } catch (error) {
            console.log('API 호출 시 오류가 있습니다')
        }
    }
    const deleteFileMng = async (id: number) => {
        try {
            const response = await deleteFile(id)
            status.value = response.status
        } catch (error) {
            console.log('API 호출 시 오류가 있습니다')
        }
    }
    
    return {
        status,
        addfile,
        getFileDowload,
        getListFileUpload,
        fileUploadedInfoList,
        fileDowload,
        type,
        deleteFileMng,
    }
})