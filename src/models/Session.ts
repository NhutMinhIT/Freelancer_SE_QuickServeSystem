export interface ISession {
    id: number;
    name: string;
    storeId: number;
    startTime: string;
    endTime: string;
    status: number;
    createdBy: string;
    created: Date | string;
    lastModifiedBy: string;
    lastModified: Date | string;
}
export interface ISessionCreate {
    name: string;
    startTime: string;
    endTime: string;
}

export interface ISessionUpdate {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
}
