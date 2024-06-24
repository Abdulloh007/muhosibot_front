import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import PaymentAccount from '@/interfaces/payment_account'


const initialState: PaymentAccount = {
    id: 0,
    account: '',
    bank_code: null,
    bank_name: '',
    bic: '',
    сorrespondent_account: null,
    comments: null,
    status: '',
    owner_id: 0,
    balance: 0
}

export const paymentAccountSlice = createSlice({
    name: 'payment_account',
    initialState,
    reducers: {
        setPaymentAccount: (state, action) => {
            state.id = action.payload.id
            state.account = action.payload.account
            state.bank_code = action.payload.bank_code
            state.bank_name = action.payload.bank_name
            state.bic = action.payload.bic
            state.сorrespondent_account = action.payload.сorrespondent_account
            state.comments = action.payload.comments
            state.owner_id = action.payload.owner_id
            state.balance = action.payload.balance
            state.status = action.payload.status
        }
    }
})

export const { setPaymentAccount } = paymentAccountSlice.actions

export default paymentAccountSlice.reducer