import axios, {AxiosResponse} from 'axios';
import {AddWishResponse, GetWishResponse} from '../types/api/wishItem';
import {ApiResponse} from '../types/common/apiResponse';

const BASE_URL_PREFIX = import.meta.env.VITE_BACKEND_URL;
const jwt_token = localStorage.getItem('jwt_token');
export const addWishItem = async (
    data: FormData
): Promise<ApiResponse<AddWishResponse>> => {
    const response: AxiosResponse<ApiResponse<AddWishResponse>> = await axios.post(
        `${BASE_URL_PREFIX}/v1/wishlists`,
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
        `${BASE_URL_PREFIX}/v1/wishlists`,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
            params: {
                gift_id: itemId,
            },
        }
    );
    return response.data;
};

export const modifyWishItem = async (
    itemId: number,
    data: FormData
): Promise<ApiResponse<GetWishResponse>> => {
    const response: AxiosResponse<ApiResponse<GetWishResponse>> = await axios.patch(
        `${BASE_URL_PREFIX}/v1/wishlists/${itemId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
}

export const deleteWishItem = async (
    itemId: number
): Promise<ApiResponse<{}>> => {
    const response: AxiosResponse<ApiResponse<{}>> = await axios.delete(
        `${BASE_URL_PREFIX}/v1/wishlists/${itemId}`,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
        }
    );
    return response.data;
}