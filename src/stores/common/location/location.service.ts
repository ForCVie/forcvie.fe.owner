import http from "@/utils/http";

export const getListCountries = () => {
    return http.get(`/cmmn/location/countries`);
}
export const getListProvinces = () => {
    return http.get(`/cmmn/location/provinces`);
}
export const getListProvincesOld = () => {
    return http.get(`/cmmn/location/provinces-old`);
}