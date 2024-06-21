export interface ILoginResponse {
    data: IUser;
    success: boolean;
    errors: string[] | null;
}
export interface IUser {
    id: string;
    userName: string;
    email: string;
    roles: string;
    isVerified: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    password: string;
    userName: string;
    role: string;
}
