import axios, { AxiosResponse } from "axios";

// CONSTANTS
import { Storage } from "../constant";
import { API_BASE_URL, DISABLE_API_LOGS } from "./apiRoutes";

// PACKAGES
import NetInfo from '@react-native-community/netinfo';
import { Alert } from "react-native";

let hasShownNoInternetAlert = false;

export const Instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',       
    }
});

Instance.interceptors.request.use(
    async (config) => {
        const netState = await NetInfo.fetch();

        if (!netState.isConnected) {
            // ✅ Show Alert Only Once
            if (!hasShownNoInternetAlert) {
                hasShownNoInternetAlert = true;
                Alert.alert('No Internet', 'Please check your internet connection.');
            }

            return Promise.reject({
                message: 'No internet connection',
                code: 503,
                status: false,
                data: null
            });
        } else {
            // 🔄 Reset once internet is back
            if (hasShownNoInternetAlert) {
                hasShownNoInternetAlert = false;
            }
        }
        
        if (!DISABLE_API_LOGS) {
            console.log(`Config Header ${JSON.stringify(config?.headers)}`)
            console.log(`Config Base URL ${config?.method} ${JSON.stringify(config?.baseURL)} ${JSON.stringify(config?.url)}`)
            console.log(`Config Data ${JSON.stringify(config?.data)}`)
        }

        if (!config.headers.Authorization) {
            const userData: any = await Storage.get(Storage.USER_DETAILS)
            const result = JSON.parse(userData)
            const accessToken = result?.token
            if (accessToken) {                
                    config.headers.Authorization = "Bearer " + `${accessToken}`            
            }
        }
        return config;
    },
    (error) => {
        if (!DISABLE_API_LOGS) {
            console.log(`Config Error ${error}`)
            console.log(`Config Error Status ${error?.response?.status}`)
            console.log(`Config Error Header ${JSON.stringify(error?.response?.config?.headers)}`)
            console.log(`Config Error Base URL ${JSON.stringify(error?.response?.config?.baseURL)}`)
            console.log(`Config Error Data ${JSON.stringify(error?.response?.config?.data)}`)
            console.log(`Config Error Details ${JSON.stringify(error?.response?.data)}`)
        }

        return {
            message: error?.response?.data?.message ?? error?.message ?? 'Something went wrong',
            code: error?.response?.status,
            data: error?.response?.data ?? null,
            status: false,
        };
    }
);

const responseValidator = (response: AxiosResponse<any, any>) => {
    if (!DISABLE_API_LOGS) {
        console.log(`Response Status ${response?.status}`)
        console.log(`Response Config Header ${JSON.stringify(response?.config?.headers)}`)
        console.log(`Response Config Base URL ${JSON.stringify(response?.config?.baseURL)} ${JSON.stringify(response?.config?.url)}`)
        console.log(`Response Config Data ${JSON.stringify(response?.config?.data)}`)
        console.log(`Response Details ${JSON.stringify(response?.data)}`)
    }
    const res: any = {
        status: true,
        code: response?.status,
        data: response?.data,
    }
    return res
};

const errorValidator = (error: any) => {

    if (!DISABLE_API_LOGS) {
        console.log(`Error ${error}`)
        console.log(`Error Status ${error?.response?.status}`)
        console.log(`Error Config Header ${JSON.stringify(error?.response?.config?.headers)}`)
        console.log(`Error Config Base URL ${JSON.stringify(error?.response?.config?.baseURL)} ${JSON.stringify(error?.response?.config?.url)}`)
        console.log(`Error Config Data ${JSON.stringify(error?.response?.config?.data)}`)
        console.log(`Error Details ${JSON.stringify(error?.response?.data)}`)
    }
    if (error?.response?.status == 401) {

    }

    if (error?.message === 'canceled') {
        return {
            error: error,
            message: 'Request canceled',
            code: 408,
            data: null,
            status: false
        };
    }

    const hasResponse = !!error?.response;
    let friendlyMessage = error?.response?.data?.message ?? error?.message ?? 'Something went wrong';
    if (!hasResponse) {
        // Network error (no response object)
        friendlyMessage = 'Network Error';
        if (error?.message === 'No internet connection') {
            friendlyMessage = 'No internet connection';
        }
    }

    return {
        error: error,
        code: error?.response?.status ?? error?.code,
        message: friendlyMessage,
        data: { ...(error?.response?.data ?? {}), message: friendlyMessage },
        status: false
    };
};

Instance.interceptors.response.use(responseValidator, errorValidator);