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

export interface GetWishResponse {
    name: string;
    birth: string;
    dday: number;
    member_id: number;
    gift: wishItem;
}

export interface wishItem {
    id: number;
    title: string;
    image: string;
    price: string;
    link: string;
    description: string;
    payments: Array<payment>;
}

export interface payment {
    name: string;
    amount: string;
    payment_id: number;
    percentage: number;
}