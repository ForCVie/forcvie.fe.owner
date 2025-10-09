export const foodManagerRoute = {
    sizeManager: {
        path: "/food-manager/size-manager",
        name: "sizeManager",
        component: import("@/views/foodManager/sizeManager/SizeManager.vue"),
    },
    categoryManager: {
        path: "/food-manager/category-manager",
        name: "categoryManager",
        component: import("@/views/foodManager/categoryManager/CategoryManager.vue"),
    },
    foodManager: {
        path: "/food-manager/food-manager",
        name: "foodManager",
        component: import("@/views/foodManager/foodManager/FoodManager.vue"),
    },
    foodManagerForm: {
        path: "/food-manager/food-manager/form",
        name: "foodManagerForm",
        component: import("@/views/foodManager/foodManager/FoodManagerForm.vue"),
    },
    menuManager: {
        path: "/food-manager/menu-manager",
        name: "menuManager",
        component: import("@/views/foodManager/menuManager/MenuManager.vue"),
    },
    menuManagerForm: {
        path: "/food-manager/menu-manager/form",
        name: "menuManagerForm",
        component: import("@/views/foodManager/menuManager/MenuManagerForm.vue"),
    },
    menuManagerReview: {
        path: "/food-manager/menu-manager/review",
        name: "menuManagerReview",
        component: import("@/views/foodManager/menuManager/MenuReview.vue"),
    },
};
