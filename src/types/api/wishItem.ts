export interface AddWishRequest {
    title: string;
    image: string;
    price: number;
    link: string;
    description: string;
}

export interface AddWishResponse {
    id: number;
    memberId: number;
    title: string;
    image: string;
    price: number;
    link: string;
    description: string;
}