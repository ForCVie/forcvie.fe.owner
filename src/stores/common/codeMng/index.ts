import { defineStore } from "pinia";
import { getCodeMngByUpCdId } from "./codeMng.service";
import { ref } from "vue";
import type { CodeMngModel, CodeMngRes } from "./codeMng.type";
export const codeMngStore = defineStore('codemng', () => {
    const codeInfo = ref<CodeMngModel[]>();
    const status = ref<number>();
    const getCodeInfo = async (params: CodeMngRes) => {
        status.value = 0
        const response = await getCodeMngByUpCdId(params);
        codeInfo.value = response.data;
        status.value = response.status;
    }
    return {
        codeInfo,
        status,
        getCodeInfo,
    }
})