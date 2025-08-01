export const employeeManagerRoute = {
    employeeManager: {
        path: "/employee/manager",
        name: "employeeManager",
        component: import("@/views/employeeManager/EmployeeManager.vue"),
    },
    employeeManagerForm: {
        path: "/employee/manager/form",
        name: "employeeManagerForm",
        component: import("@/views/employeeManager/EmployeeManagerForm.vue"),
    },
};
