import { Counterparty } from "./counterpaty"
import PaymentAccount from "./payment_account"

export interface Payment {
    created_at: string
    id: number
    type_id: number
    date: string
    number: string
    payer_account: PaymentAccount
    payment_sum: string
    payment_purpose: string
    comment: string
    owner_id: number
    owner: Counterparty
    organization_id: number
}