import {ApiResponse} from "../types/common/apiResponse.ts";
import {CopyLetterUrlResponse} from "../types/api/myLetter.ts";
import axios, {AxiosResponse} from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const jwt_token = localStorage.getItem('jwt_token');

export const copyLetterUrl = async (): Promise<ApiResponse<CopyLetterUrlResponse>> => {
    const response: AxiosResponse<ApiResponse<CopyLetterUrlResponse>> = await axios.get(
        `${BASE_URL}/api/v1/letters/copy`,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            },
        }
    );
    return response.data;
};