export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string; // Renamed for clarity and consistency
    created_at: string; // Renamed for clarity and consistency
    updated_at: string; // Renamed for clarity and consistency
}
