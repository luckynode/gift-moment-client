import axios, {AxiosResponse} from 'axios';
import { AddWishRequest, AddWishResponse } from '../types/api/wishItem';
import { ApiResponse } from '../types/common/apiResponse';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const addWishlistItem = async (
    data: AddWishRequest
): Promise<ApiResponse<AddWishResponse>> => {
    const jwt_token = localStorage.getItem('jwt_token');
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
