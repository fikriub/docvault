import api from "./axios";

export const getFolders = async () => {
    const response = await api.get("/folders");
    return response.data;
};

export const createFolder = async (name: string) => {
    const response = await api.post("/folders", {
        name,
    });

    return response.data;
};

export const updateFolder = async (
    id: string,
    name: string,
) => {
    const response = await api.put(`/folders/${id}`, {
        name,
    });

    return response.data;
};

export const deleteFolder = async (
    id: string,
) => {
    await api.delete(`/folders/${id}`);
};