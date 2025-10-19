import http from "@/utils/http";
import { SITE_STAFF } from "@/constants/common.const";
const url = `${SITE_STAFF}/store-order`;

export const changeActiveStore = (isActive: String) => {
    return http.post(url + '/change-active', isActive);
}

export const getDetailStoreOrder = () => {
    return http.post(url + '/store-detail');
}
