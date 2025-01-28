export interface AddWishRequest {
    title: string;
    image: string; // TODO 이미지 파일
    price: number;
    link: string;
    description: string;
}

export interface AddWishResponse {
    id: number;
    memberId: number;
    title: string;
    image: string; // 이미지 url
    price: number;
    link: string;
    description: string;
}

export type GetWishResponse = Array<{
    name: string;
    birth: string;
    dday: number;
    member_id: number;
    gift: wishItem;
}>;

export interface wishItem {
    id: number;
    title: string;
    image: string; // 이미지 url
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

export interface ModifyWishRequest {
    image: string; // TODO 이미지 파일
    link: string;
    description: string;
}