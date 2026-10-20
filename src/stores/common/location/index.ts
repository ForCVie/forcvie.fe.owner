import { defineStore } from "pinia";
import { ref } from "vue";
import type { CodeMngModel } from "../codeMng/codeMng.type";
import { getListCountries, getListProvinces } from "./location.service";
import type { ProvincesDTO, ProvincesOldDTO } from "./location.type";
export const locationStore = defineStore("location", () => {
    const countries = ref<CodeMngModel[]>();
    const status = ref<number>();

    const getcountries = async () => {
        status.value = 0;
        const response = await getListCountries();
        countries.value = response.data;
        status.value = response.status;
    };

    const provinces = ref<ProvincesDTO[]>();
    const getProvinces = async () => {
        const response = await getListProvinces();
        provinces.value = response.data;
        status.value = response.status;
    };

    return {
        countries,
        status,
        getcountries,
        provinces,
        getProvinces
    };
});
