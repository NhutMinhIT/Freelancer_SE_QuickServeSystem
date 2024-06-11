export interface ITemplateStep {
    id: number;
    productTemplateId: number;
    name: string;
    status: number;
    createdBy: string;
    created: Date | string;
    lastModifiedBy: string;
    lastModified: Date | string;
    productTemplate: string;
}
export interface ITemplateStepCreate {
    productTemplateId: number;
    name: string;
}

export interface ITemplateStepRename {
    id: number;
    name: string;
}