import { Device } from "./device";
import Organization from "./organization";

export interface UserMain {
    id:  number;
    avatar: null | string;
    username: string;
    name: string;
    surname: string;
    patronimic: string;
    email: string;
    phone: string;
    status: string;
    token: string | null;
    age: null | number;
    birth: null | string | Date;
    gender: null | string;
    code_phrase: null | string;
    devices: null | Device[];
    organizations: Organization[];
    incomes_total: number
    outgoing_total: number
}