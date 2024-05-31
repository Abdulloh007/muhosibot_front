import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { UserMain } from '@/interfaces/user'


const initialState: UserMain = {
    username: '',
    token: '',
    email: '',
    phone: '',
    status: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username
        },
        checkToken: (state) => {
            state.token = localStorage.getItem(btoa('token'))
        },
        logout: (state) => {
            localStorage.clear();
        },
    }
})

export const { setUser, checkToken, logout } = userSlice.actions

export default userSlice.reducer