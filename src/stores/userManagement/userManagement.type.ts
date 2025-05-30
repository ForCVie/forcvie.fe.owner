export type UserMngModel = {
  rowNumber: number;
  name: string;
  userId: string;
  deptNm: string;
  majorNm: string;
  positionNm: string;
  posiSysNm: string;
  roleNm: string;
  roleList: Array<UserRoleModel>;
  userDeptNames: string;
};

export type UserManagementSearchModel = {
  deptNm: string;
  userId: string;
  name: string;
  page: number;
  size: number;
  sort: string;
};

export type RoleModel = {
  roleId: string;
  roleName: string;
};

export type UserRoleModel = {
  urId: string;
  userId: string;
  rlId: string;
  roleName: String;
};

export type DetailModel = {
  userId: string;
  userDeptNames: string;
  listRoleId: Array<String>;
  posiSysCd: string; 
};

export type ProfSearchModel = {
  userId: string;
  name: string;
  page: number;
  size: number;
  sort: string;
};

export type ProfModel = {
  rowNumber: number;
  name: string;
  userId: string;
  deptNm: string;
};

