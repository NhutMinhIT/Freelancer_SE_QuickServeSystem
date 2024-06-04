export interface ICategory {
    id: number;
    name: string;
    status: number;
    createdBy: string;
    created: Date | string;
    lastModifiedBy: string;
    lastModified: Date | string;
}
export interface ICategoryCreate {
    name: string;
}
export interface ICategoryRename {
    id: number;
    name: string;
}
