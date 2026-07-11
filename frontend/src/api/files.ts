import api from "./axios";

export const getFiles = async () => {
    const response = await api.get("/files");
    return response.data;
};

export const renameFile = async (
    id: string,
    filename: string,
) => {
    const response = await api.put(`/files/${id}`, {
        filename,
    });

    return response.data;
};

export const deleteFile = async (
    id: string,
) => {
    await api.delete(`/files/${id}`);
};

export const uploadFile = async (
    folderId: string,
    file: File,
) => {
    const formData = new FormData();

    formData.append(
        "folder_id",
        folderId,
    );

    formData.append(
        "file",
        file,
    );

    const response = await api.post(
        "/files/upload",
        formData,
    );

    return response.data;
};

export const searchFiles = async (
    keyword: string,
) => {
    const response = await api.get(
        "/files/search",
        {
            params: {
                q: keyword,
            },
        },
    );

    return response.data;
};