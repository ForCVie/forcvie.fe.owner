export type DepartmentDTO = {
    deptCd: string;
    deptNm: string;
    deptDivCd: string;
    upDeptCd: string;
    typeCd: string;
}

export type DepartmentFilterDTO = {
    deptCd: string[];
    deptDivCd: string[];
    upDeptCd: string[];
    useYn: string;
}

export type FalcutyFilterDTO = {
    deptCd: string[];
    deptDivCd: string[];
    upDeptCd: string[];
    useYn: string;
}