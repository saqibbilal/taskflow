export interface Task {
    id: number;
    title: string;
    is_completed: boolean;
    project_id: number;
    created_at: string;
}

export interface Project {
    id: number;
    name: string;
    tasks: Task[];
    created_at: string;
}