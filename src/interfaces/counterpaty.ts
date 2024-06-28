export interface CounterpartyCategory {
    id: number
    title: string
    description: string
}

export interface Counterparty {
    id: number
    full_name: string
    short_name: null | string
    legal_address: null | string
    physic_address: null | string
    site: null | string
    category_id: null | number
    category: null | CounterpartyCategory
    inn: null | string
    kpp: null | string
    contacts: null | string
    for_sign_docs: null | string
    by_person: null | string
    passport_details: null | string
    comment: null | string
    payment_method: null | string
    organization_i: number
}