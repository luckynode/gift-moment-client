import axios, {AxiosResponse} from 'axios';
import {AddWishRequest, AddWishResponse, GetWishResponse, ModifyWishRequest} from '../types/api/wishItem';
import {ApiResponse} from '../types/common/apiResponse';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// const jwt_token = localStorage.getItem('jwt_token');

const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiMjFrZXVuZ2hlZUBnbWFpbC5jb20iLCJpYXQiOjE3Mzc4OTI5NTYsImV4cCI6MTczNzg5NjU1Nn0.FI-YIUTUrXKFmxejaz_yHTaFn7SS2Ps_jFws0suRpw4";
export const addWishItem = async (
    data: FormData
): Promise<ApiResponse<AddWishResponse>> => {
    const response: AxiosResponse<ApiResponse<AddWishResponse>> = await axios.post(
        `${BASE_URL}/api/v1/wishlists`,
        data,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

export const getWishItem = async (
    itemId: number
): Promise<ApiResponse<GetWishResponse>> => {
    const response: AxiosResponse<ApiResponse<GetWishResponse>> = await axios.get(
        `${BASE_URL}/api/v1/wishlists/${itemId}`,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
        }
    );
    return response.data;
};

export const modifyWishItem = async (
    itemId: number,
    data: ModifyWishRequest
): Promise<ApiResponse<GetWishResponse>> => {
    const response: AxiosResponse<ApiResponse<GetWishResponse>> = await axios.patch(
        `${BASE_URL}/api/v1/wishlists/${itemId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
}

export const deleteWishItem = async (
    itemId: number
): Promise<ApiResponse<{}>> => {
    const response: AxiosResponse<ApiResponse<{}>> = await axios.delete(
        `${BASE_URL}/api/v1/wishlists/${itemId}`,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
        }
    );
    return response.data;
}