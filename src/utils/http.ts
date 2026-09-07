import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import router from "@/router";
import {removeUserInfo} from "@/utils/storage";
import {decode} from "html-entities";
import {SCREEN} from "@/router/screen";
import commonService from "@/service/common/CommonService";
import { ACCESS_TOKEN } from '@/constants/common.const';
import { getToken } from './cookies';

class Http {
    instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            // baseURL: import.meta.env.VITE_API_ENDPOINT,
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
              const token = getToken();
              console.log(token)
              if (token) {
                config.headers[`${ACCESS_TOKEN}`] = token;
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

    getByCode<T = any>(
        code: string,
        config?: AxiosRequestConfig
    ) {
        return this.instance.get<T>(config?.baseURL ?? import.meta.env.VITE_API_ENDPOINT, {
            ...config,
            headers: {
                ...config?.headers,
                TARGET: code
            }
        })
    }

    postByCode<T = any>(
        code: string,
        data?: any,
        config?: AxiosRequestConfig,
    ) {
        return this.instance.post<T>(config?.baseURL ?? import.meta.env.VITE_API_ENDPOINT, data, {
            ...config,
            headers: {
                ...config?.headers,
                TARGET: code
            }
        })
    }

    putByCode<T = any>(
        code: string,
        data?: any,
        config?: AxiosRequestConfig
    ) {
        return this.instance.put<T>(config?.baseURL ?? import.meta.env.VITE_API_ENDPOINT, data, {
            ...config,
            headers: {
                ...config?.headers,
                TARGET: code
            }
        })
    }

    deleteByCode<T = any>(
        code: string,
        config?: AxiosRequestConfig
    ) {
        return this.instance.delete<T>(config?.baseURL ?? import.meta.env.VITE_API_ENDPOINT, {
            ...config,
            headers: {
                ...config?.headers,
                TARGET: code
            }
        })
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

const http = new Http()
export default http
