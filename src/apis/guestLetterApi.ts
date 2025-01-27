import axios, {AxiosResponse} from 'axios';
import {ApiResponse} from '../types/common/apiResponse';
import {GetGuestLettersResponse} from "../types/api/guestLetter.ts";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const getGuestLetters = async (
    uniqueString: string
): Promise<ApiResponse<GetGuestLettersResponse>> => {
    const response: AxiosResponse<ApiResponse<GetGuestLettersResponse>> = await axios.get(
        `${BASE_URL}/api/v1/letters/guestview/${uniqueString}`
    );
    return response.data;
};