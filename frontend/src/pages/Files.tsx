import { useEffect, useState } from "react";

import {
    deleteFile,
    getFiles,
    renameFile,
    searchFiles,
    uploadFile,
} from "../api/files";

import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import UploadForm from "../components/files/UploadForm";
import FileCard from "../components/files/FileCard";

import type { FileItem } from "../types/file";

export default function Files() {
    const [files, setFiles] =
        useState<FileItem[]>([]);

    const [keyword, setKeyword] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const loadFiles = () => {
        setLoading(true);

        getFiles()
            .then(setFiles)
            .finally(() =>
                setLoading(false),
            );
    };

    const handleSearch = async () => {
        if (!keyword.trim()) {
            loadFiles();
            return;
        }

        setLoading(true);

        searchFiles(keyword)
            .then(setFiles)
            .finally(() =>
                setLoading(false),
            );
    };

    useEffect(() => {
        loadFiles();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Files
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your uploaded files.
                </p>
            </div>

            <div className="flex gap-3">
                <input
                    className="flex-1 rounded-lg border p-3"
                    placeholder="Search file..."
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(
                            e.target.value,
                        )
                    }
                />

                <button
                    className="rounded-lg bg-blue-600 px-6 text-white cursor-pointer"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <UploadForm
                onUpload={async (
                    folderId,
                    file,
                ) => {
                    await uploadFile(
                        folderId,
                        file,
                    );

                    loadFiles();
                }}
            />

            {files.length === 0 ? (
                <EmptyState title="No files found." />
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {files.map((file) => (
                        <FileCard
                            key={file.id}
                            file={file}
                            onRename={async () => {
                                const name =
                                    window.prompt(
                                        "New filename",
                                        file.filename,
                                    );

                                if (!name)
                                    return;

                                await renameFile(
                                    file.id,
                                    name,
                                );

                                loadFiles();
                            }}
                            onDelete={async () => {
                                const ok =
                                    window.confirm(
                                        `Delete "${file.filename}"?`,
                                    );

                                if (!ok)
                                    return;

                                await deleteFile(
                                    file.id,
                                );

                                loadFiles();
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}