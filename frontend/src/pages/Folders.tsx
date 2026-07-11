import { useEffect, useState } from "react";

import EmptyState from "../components/common/EmptyState";
import Loading from "../components/common/Loading";
import FolderCard from "../components/folders/FolderCard";
import FolderForm from "../components/folders/FolderForm";

import {
    createFolder,
    deleteFolder,
    getFolders,
    updateFolder,
} from "../api/folders";

import type { Folder } from "../types/folder";

export default function Folders() {
    const [folders, setFolders] =
        useState<Folder[]>([]);

    const [loading, setLoading] =
        useState(true);

    const loadFolders = () => {
        setLoading(true);

        getFolders()
            .then(setFolders)
            .finally(() =>
                setLoading(false),
            );
    };
    
    useEffect(() => {
        loadFolders();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Folders
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your folders.
                </p>
            </div>

            <FolderForm
                submitText="Create"
                onSubmit={async (name) => {
                    await createFolder(name);
                    loadFolders();
                }}
            />

            {folders.length === 0 ? (
                <EmptyState title="No folders found." />
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {folders.map((folder) => (
                        <FolderCard
                            key={folder.id}
                            folder={folder}
                            onRename={async () => {
                                const name =
                                    window.prompt(
                                        "New folder name",
                                        folder.name,
                                    );

                                if (!name) return;

                                await updateFolder(
                                    folder.id,
                                    name,
                                );

                                loadFolders();
                            }}
                            onDelete={async () => {
                                const ok =
                                    window.confirm(
                                        `Delete "${folder.name}"?`,
                                    );

                                if (!ok) return;

                                await deleteFolder(
                                    folder.id,
                                );

                                loadFolders();
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}