import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface Toast {
    color: string | null;
    text: string;
}

interface Sidebar { 
    isOpen: boolean
}

const initialState: Sidebar = {
    isOpen: false
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleIsOpen: (state, action) => {
            state.isOpen = !state.isOpen
        },
    }
})

export const { toggleIsOpen } = sidebarSlice.actions

export default sidebarSlice.reducer