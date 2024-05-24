import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { UserMain } from '@/interfaces/user'


const initialState: UserMain = {
    name: 'test'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        test: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { test } = userSlice.actions

export default userSlice.reducer