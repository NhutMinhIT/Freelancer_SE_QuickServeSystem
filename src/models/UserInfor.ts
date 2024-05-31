export interface IUserInfo {
    id: string;
    userName: string;
    email: string;
    roles: string[] | null;
    phoneNumber?: string | null;
    name: string | null;
    address?: string | null;
    avatar?: string | null;
    created: Date | string;
}
