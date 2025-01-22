import axios, {AxiosResponse} from 'axios';
import {AddWishRequest, AddWishResponse, GetWishResponse} from '../types/api/wishItem';
import {ApiResponse} from '../types/common/apiResponse';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const jwt_token = localStorage.getItem('jwt_token');

export const addWishItem = async (
    data: AddWishRequest
): Promise<ApiResponse<AddWishResponse>> => {
    const response: AxiosResponse<ApiResponse<AddWishResponse>> = await axios.post(
        `${BASE_URL}/api/v1/wishlists`,
        data,
        {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
                'Content-Type': 'application/json',
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
