export const accountCreationRoute = {
  clientMng: {
    path: "/account-creation/client",
    name: "clientMng",
    component: import("@/views/accountCreation/clientMng/ClientMng.vue"),
  },
  clientMngForm: {
    path: "/account-creation/client/form",
    name: "clientMngForm",
    component: import("@/views/accountCreation/clientMng/ClientMngForm.vue"),
  },
  ownerMng: {
    path: "/account-creation/owner",
    name: "ownerMng",
    component: import("@/views/accountCreation/ownerMng/OwnerMng.vue"),
  },
  ownerMngForm: {
    path: "/account-creation/owner/form",
    name: "ownerMngForm",
    component: import("@/views/accountCreation/ownerMng/OwnerMngForm.vue"),
  },
  staffMng: {
    path: "/account-creation/staff",
    name: "staffMng",
    component: import("@/views/accountCreation/staffMng/StaffMng.vue"),
  },
  staffMngForm: {
    path: "/account-creation/staff/form",
    name: "staffMngForm",
    component: import("@/views/accountCreation/staffMng/StaffMngForm.vue"),
  },
};
