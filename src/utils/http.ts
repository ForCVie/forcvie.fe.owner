import axios from 'axios'
import type { AxiosInstance } from 'axios'
import router from "@/router";
import {removeUserInfo} from "@/utils/storage";
import {decode} from "html-entities";
import {SCREEN} from "@/router/screen";
import commonService from "@/service/common/CommonService";

class Http {
    instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_ENDPOINT,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true,
        })

        this.instance.interceptors.request.use(
            (config) => {
              const currentRoute = router.currentRoute.value
              if (currentRoute) {
                const parentRoute = currentRoute.matched[1];
                if (parentRoute && parentRoute.name) {
                  config.headers["x-api-screen-name"] = parentRoute.name;
                } else if (currentRoute.name) {
                  config.headers["x-api-screen-name"] = currentRoute.name;
                }
              }
                return config
            },
            (error) => Promise.reject(error)
        )

        this.instance.interceptors.response.use(
            (response) => {
                if (response) {
                    response = decodeHtmlEntities(response);
                }

                return response
            },
            async (error) => {
                if (error.response.status === 404) {
                    await removeUserInfo()
                    await router.push({name:SCREEN.notFound.name})
                }

                if (error.response.status === 500) {
                    await removeUserInfo()
                    await router.push({name:SCREEN.internalError.name})
                }
                if (error.response.status === 401) {
                    await removeUserInfo()
                    return router.push({name:SCREEN.unauthorized.name})
                }
                if (error.response.status === 403) {
                    await commonService.logout()
                    await removeUserInfo()
                    return router.push({path:'/login'})
                }

                return Promise.reject(error)
            }
        )
    }
}

function decodeHtmlEntities(data:any):any {
    if (data instanceof File || data instanceof ArrayBuffer || data instanceof Blob) {
        return data;
    }
    if (typeof data === 'string') {
        return decode(data);
    } else if (Array.isArray(data)) {
        return data.map(item => decodeHtmlEntities(item));
    } else if (data && typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = decodeHtmlEntities(data[key]);
            return acc;
        }, {});
    } else {
        return data;
    }
}

const http = new Http().instance
// http.defaults.withCredentials = true
export default http
