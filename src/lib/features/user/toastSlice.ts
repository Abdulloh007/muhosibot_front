import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { UserMain } from '@/interfaces/user'

interface Toast {
    color: string | null;
    text: string;
}

interface ToastList { 
    list: any[]
}

const initialState: ToastList = {
    list: []
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToList: (state, action) => {
            state.list.unshift({
                color: action.payload.color,
                text: action.payload.text
            })
        },
    }
})

export const { addToList } = toastSlice.actions

export default toastSlice.reducer