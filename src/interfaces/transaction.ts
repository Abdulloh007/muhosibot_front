import {Counterparty} from "./counterpaty";
import { Document } from "./document";

export interface TransactionType {
    id: number;
    title: string;
    description: string;
    parent_id: null | number;
    operation: string;
    is_group: boolean;
}

export interface Transaction {
    id: number;
    operation: string;
    type: TransactionType;
    type_id: number;
    doctype_id: number;
    document_id: null | number;
    document: null | Document;
    resource: string;
    title: string;
    details: string;
    date: string;
    total: number;
    total_tax: number;
    counterparty: Counterparty;
    counterparty_id: number;
    organization_id: number;
    payment_account: number;
}