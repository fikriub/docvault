export interface FileItem {
    id: string;
    folder_id: string;
    filename: string;
    s3_key: string;
    size: number;
    mime_type: string;
    checksum: string;
    status: string;
    created_at: string;
    updated_at: string;
}