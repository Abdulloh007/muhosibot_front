export default interface Organization {
    id: number;
    title: string;
    inn: null | string;
    kpp: null | string;
    tax_system: string;
    legal_address: null | string;
    physic_address: null | string;
    owner_id: number;
    type: string;
    contacts: null | string;
    status: string;
}