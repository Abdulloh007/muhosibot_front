export default interface PaymentAccount {
    id: number;
    account: string;
    bank_code: null | string;
    bank_name: string;
    bic: string;
    сorrespondent_account: null | string;
    comments: null | string;
    status: string;
    owner_id: number;
    balance: number;
}