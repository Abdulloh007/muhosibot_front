export default interface Organisation {
    title: string;
    inn: string;
    kpp: string;
    tax_system: string;
    legal_address: string;
    physic_address: string;
    owner_id: number;
    type: string;
    contacts: any;
    status: string;
}