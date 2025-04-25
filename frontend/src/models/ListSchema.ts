
export interface ListSchema {
    id: number;
    title: string;
    description?: string;
    created_at: string; // ISO 8601 datetime string
    updated_at: string;
}

export interface ListCreate {
    title: string;
    description?: string;
}

export interface ListUpdate {
    title: string;
    description?: string;
}