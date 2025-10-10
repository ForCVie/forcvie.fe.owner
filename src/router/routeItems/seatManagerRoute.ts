export const seatManagerRoute = {
    seatCategoryManager: {
        path: "/seat-manager/category",
        name: "seatCategoryManager",
        component: import("@/views/seatManager/seatCategory/SeatCategory.vue"),
    },
    seatManager: {
        path: "/seat-manager/seat-manager",
        name: "seatManager",
        component: import("@/views/seatManager/seatManager/SeatManager.vue")
    }
};
