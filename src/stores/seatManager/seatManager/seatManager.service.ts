import http from "@/utils/http";
import { SITE_STAFF } from "@/constants/common.const";
import type { OwnerFloorRequest } from "./seatManager.type";
const url = `${SITE_STAFF}/seat-manager/floor-mng`;

export const getPageData = () => {
    return http.post(url + '/list')
}
export const saveData = (data: OwnerFloorRequest[]) => {
    return http.post(url + '/save', data)
}
