export const storeManagerRoute = {
    storeManager: {
        path: "/store-manager/store-manager",
        name: "storeManager",
        component: import("@/views/storeManager/storeManager/StoreManager.vue"),
    },
    storeManagerForm: {
        path: "/store-manager/store-manager/form",
        name: "storeManagerForm",
        component: import("@/views/storeManager/storeManager/StoreManagerForm.vue"),
    },
    storeManagerReview: {
        path: "/store-manager/store-manager/review",
        name: "storeManagerReview",
        param: "",
        component: import("@/views/storeManager/storeManager/StoreManagerReview.vue"),
    }
};
