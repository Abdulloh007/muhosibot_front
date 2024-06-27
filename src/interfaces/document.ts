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
    with_sign_seal: string
    public: string
    sum: number
    status: string
    isGroup: boolean
    parent_id: string
}