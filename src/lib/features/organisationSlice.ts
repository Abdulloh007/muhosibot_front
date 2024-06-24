import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import Organisation from '@/interfaces/organisation'


const initialState: Organisation = {
    title: '',
    inn: '',
    kpp: '',
    tax_system: '',
    legal_address: '',
    physic_address: '',
    owner_id: 0,
    type: '',
    contacts: {},
    status: ''
}

export const organisationSlice = createSlice({
    name: 'organisation',
    initialState,
    reducers: {
        setOrganisation: (state, action) => {
            state.title = action.payload.title
            state.inn = action.payload.inn
            state.kpp = action.payload.kpp
            state.tax_system = action.payload.tax_system
            state.legal_address = action.payload.legal_address
            state.physic_address = action.payload.physic_address
            state.type = action.payload.type
            state.contacts = action.payload.contacts
            state.status = action.payload.status
        }
    }
})

export const { setOrganisation } = organisationSlice.actions

export default organisationSlice.reducer