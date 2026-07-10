export interface RecentUpload {
    id: string;
    filename: string;
    size: number;
    created_at: string;
}

export interface RecentActivity {
    id: string;
    action: string;
    created_at: string;
}

export interface Dashboard {
    total_files: number;
    total_folders: number;
    storage_used: number;

    recent_uploads: RecentUpload[];

    recent_activities: RecentActivity[];
}