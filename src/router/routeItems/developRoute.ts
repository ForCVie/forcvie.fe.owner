export const developRoute = {
  resourceManagement: {
    path: "/develop/resource",
    name: "resourceManagement",
    component: import("@/views/developer/resourceMng/ResourceMngList.vue"),
  },
  menuManagement: {
    path: "/develop/menu",
    name: "menuManagement",
    component: import("@/views/developer/menuMng/MenuMngList.vue"),
  },
  menuManagementForm: {
    path: "/develop/menu/form",
    name: "menuManagementForm",
    component: import("@/views/developer/menuMng/MenuMngForm.vue"),
  },
  roleManagement: {
    path: "/develop/role",
    name: "roleManagement",
    component: import("@/views/developer/roleMng/RoleMngList.vue"),
  },
  roleManagementForm: {
    path: "/develop/role/form",
    name: "roleManagementForm",
    component: import("@/views/developer/roleMng/RoleMngForm.vue"),
  },
};
