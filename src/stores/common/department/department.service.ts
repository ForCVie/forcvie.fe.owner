import http from "@/utils/http";
import type { DepartmentFilterDTO, FalcutyFilterDTO } from "./department.type";

export const getDepartmentList = (param: DepartmentFilterDTO) => {
    param = param ?? {}
    param.deptCd = param.deptCd ?? [];
    param.deptDivCd = param.deptDivCd ?? [];
    param.upDeptCd = param.upDeptCd ?? [];
    param.useYn = param.useYn ?? '';
    return http.post(`/department/list`, param);
}

export const getFalcutyList = (param: FalcutyFilterDTO) => {
    param = param ?? {}
    param.deptCd = param.deptCd ?? [];
    param.deptDivCd = param.deptDivCd ?? [];
    param.upDeptCd = param.upDeptCd ?? [];
    param.useYn = param.useYn ?? '';
    return http.post(`/department/fal-list`, param);
}

