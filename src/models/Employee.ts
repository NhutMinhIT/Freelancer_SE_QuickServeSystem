export interface IEmployee {
    id: string;
    userName: string;
    email: string;
    role?: string | null;
    phoneNumber: string | null;
    name?: string | null;
    address?: string | null;
    avatar: string | null;
    created: Date | string;
}

export interface ICreateEmployee {
    email: string;
    userName?: string | null;
    password?: string | null;
}
