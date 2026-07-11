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
                    className="rounded border p-3"
                    value={folderId}
                    onChange={(e) =>
                        setFolderId(
                            e.target.value,
                        )
                    }
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
                        setFile(
                            e.target.files?.[0] ??
                                null,
                        )
                    }
                />

                <button
                    className="rounded bg-blue-600 text-white"
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