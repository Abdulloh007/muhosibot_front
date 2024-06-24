import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { UserMain } from '@/interfaces/user'


const initialState: UserMain = {
    username: '',
    token: '',
    email: '',
    phone: '',
    status: '',
    id: 0,
    avatar: null,
    name: '',
    surname: '',
    patronimic: '',
    age: null,
    birth: null,
    gender: null,
    code_phrase: null,
    devices: null,
    organizations: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username
            state.surname = action.payload.surname
            state.name = action.payload.name
            state.patronimic = action.payload.patronimic
            state.age = action.payload.age
            state.birth = action.payload.birth
            state.id = action.payload.id
            state.avatar = action.payload.avatar
            state.code_phrase = action.payload.code_phrase
            state.gender = action.payload.gender
            state.devices = action.payload.devices
            state.status = action.payload.status
            state.phone = action.payload.phone
            state.email = action.payload.email
            state.organizations = action.payload.organizations
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