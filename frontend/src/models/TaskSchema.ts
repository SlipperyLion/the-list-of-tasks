export interface TaskSchema {
    id: number;
    title: string;
    is_checked: boolean;
    is_priority: boolean;
    list_id: number;
    created_at: string;
    updated_at: string;
}

export interface TaskCreate {
    title: string;
    is_checked?: boolean;
    is_priority?: boolean;
    list_id: number;
}

export interface TaskUpdate {
    title?: string;
    is_checked?: boolean;
    is_priority?: boolean;
}

export interface TaskPatch {
    is_checked?: boolean;
    is_priority?: boolean;
}