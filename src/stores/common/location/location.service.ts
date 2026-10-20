import { GET_COUNTRIES, GET_PROVINCES } from "@/constants/api.const";
import http from "@/utils/http";

export const getListCountries = () => {
    return http.getByCode(GET_COUNTRIES);
}
export const getListProvinces = () => {
    return http.getByCode(GET_PROVINCES);
}