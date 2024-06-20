export interface IStore {
    id: number;
    name: string;
    address?: string | null;
    createdBy: string;
    created: Date | string;
}

export interface IStoreCreate {
    name: string;
    address?: string | null;
}

export interface IStoreRename {
    id: number;
    name: string;
    address?: string | null;
}
