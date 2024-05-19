import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { UserMain } from '@/interfaces/user'


const initialState: UserMain = {
    
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export const {} = userSlice.actions

export default userSlice.reducer