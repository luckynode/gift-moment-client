export interface AddLetterRequest {
    recipient_to: string;
    sender_name: string;
    content: string;
}

export interface GetGuestLettersResponse {
    birthday_owner_name: string;
    before_birthday: boolean;
    total_letters: number;
}

