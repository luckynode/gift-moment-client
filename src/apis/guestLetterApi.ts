import axios, {AxiosResponse} from 'axios';
import {ApiResponse} from '../types/common/apiResponse';
import {AddLetterRequest, GetGuestLettersResponse} from "../types/api/guestLetter.ts";

const BASE_URL_PREFIX = import.meta.env.VITE_BACKEND_URL_PREFIX;

export const addLetter = async (
    uniqueString: string,
    data: AddLetterRequest
): Promise<ApiResponse<{}>> => {
    const response: AxiosResponse<ApiResponse<{}>> = await axios.post(
        `${BASE_URL_PREFIX}/v1/letters/create/${uniqueString}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};


export const getGuestLetters = async (
    uniqueString: string
): Promise<ApiResponse<GetGuestLettersResponse>> => {
    const response: AxiosResponse<ApiResponse<GetGuestLettersResponse>> = await axios.get(
        `${BASE_URL_PREFIX}/v1/letters/guestview/${uniqueString}`
    );
    return response.data;
};