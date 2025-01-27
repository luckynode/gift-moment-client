export interface CopyLetterUrlResponse {
    letter_link: string;
}

export interface GetMyLettersResponse {
    username: string;
    before_birthday: boolean;
    total_letters: number;
    letters: Letter[];
}

export interface Letter {
    id: number;
    content: string;
    created_at: string; // ISO 8601 형식의 날짜 문자열
    recipient_id: number;
    sender_name: string;
    recipient_to: string;
}