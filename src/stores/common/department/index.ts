import { defineStore } from "pinia";
import { ref } from "vue";
import type { DepartmentDTO, DepartmentFilterDTO } from "./department.type";
import { getDepartmentList } from "./department.service";
export const departmentStore = defineStore('departmentStore', () => {
    const deptRes = ref<DepartmentDTO[]>();
    const status = ref<number>();
    const getDepartment = async (params: DepartmentFilterDTO) => {
        const response = await getDepartmentList(params);
        deptRes.value = response.data.data;
        status.value = response.status;
    }
    return {
        deptRes,
        status,
        getDepartment,
    }
})