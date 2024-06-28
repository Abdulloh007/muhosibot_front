import Counterparty from "./counterpaty";

export interface DocumentType {
    id:  number;
    title: string;
    description: null | string;
    metatag: null | string;
    type: string;
    act: string;
    hasInvoice: boolean;
}

export interface Document {
    id:  number;
    title: string
    template: string
    doc_type: number
    document_type: DocumentType
    with_sign_seal: string
    public: string
    sum: number
    status: string
    isGroup: boolean
    parent_id: string
    counterparty: Counterparty
    counterparty_id: number
    doc_group_id: number
    docGroup: any
}