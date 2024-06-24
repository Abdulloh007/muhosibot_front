import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import Cashbox from '@/interfaces/cashbox'


const initialState: Cashbox = {
    title: '',
    status: '',
    organization_id: 0,
    balance: 0
}

export const cashboxSlice = createSlice({
    name: 'payment_account',
    initialState,
    reducers: {
        setCashbox: (state, action) => {
            state.title = action.payload.title
            state.organization_id = action.payload.organization_id
            state.balance = action.payload.balance
            state.status = action.payload.status
        }
    }
})

export const { setCashbox } = cashboxSlice.actions

export default cashboxSlice.reducer