import { useEffect, useState } from "react";

import { getFolders } from "../../api/folders";
import type { Folder } from "../../types/folder";

interface Props {
    onUpload: (
        folderId: string,
        file: File,
    ) => void;
}

export default function UploadForm({
    onUpload,
}: Props) {
    const [folders, setFolders] =
        useState<Folder[]>([]);

    const [folderId, setFolderId] =
        useState("");

    const [file, setFile] =
        useState<File | null>(null);

    useEffect(() => {
        getFolders().then((data) => {
            setFolders(data);

            if (data.length > 0) {
                setFolderId(data[0].id);
            }
        });
    }, []);

    return (
        <div className="rounded-lg border bg-white p-5">
            <div className="grid gap-4 md:grid-cols-3">
                <select
                    value={folderId}
                    onChange={(e) =>
                        setFolderId(e.target.value)
                    }
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        text-gray-700
                        shadow-sm
                        transition
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {folders.map((folder) => (
                        <option
                            key={folder.id}
                            value={folder.id}
                        >
                            {folder.name}
                        </option>
                    ))}
                </select>

                <input
                    type="file"
                    onChange={(e) =>
                        setFile(e.target.files?.[0] ?? null)
                    }
                    className="
                        block w-full text-sm text-gray-600
                        file:mr-4
                        file:rounded-lg
                        file:border-0
                        file:bg-blue-600
                        file:px-4
                        file:py-2
                        file:text-sm
                        file:font-medium
                        file:text-white
                        hover:file:bg-blue-700
                        file:cursor-pointer
                        cursor-pointer
                    "
                />

                <button
                    className="rounded bg-blue-600 text-white cursor-pointer"
                    onClick={() => {
                        if (
                            !folderId ||
                            !file
                        )
                            return;

                        onUpload(
                            folderId,
                            file,
                        );
                    }}
                >
                    Upload
                </button>
            </div>
        </div>
    );
}