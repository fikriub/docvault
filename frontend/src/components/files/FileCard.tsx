import type { FileItem } from "../../types/file";

interface Props {
    file: FileItem;
    onRename: () => void;
    onDelete: () => void;
}

export default function FileCard({
    file,
    onRename,
    onDelete,
}: Props) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">
                {file.filename}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                {file.size} bytes
            </p>

            <p className="text-sm text-gray-500">
                folder id: {file.folder_id}
            </p>

            <p className="text-sm text-gray-500">
                {file.status}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
                <a
                    href={`http://localhost:8000/api/files/${file.id}/preview`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded bg-green-600 px-3 py-2 text-white cursor-pointer"
                >
                    Preview
                </a>

                <a
                    href={`http://localhost:8000/api/files/${file.id}/download`}
                    className="rounded bg-blue-600 px-3 py-2 text-white cursor-pointer"
                >
                    Download
                </a>

                <button
                    onClick={onRename}
                    className="rounded bg-yellow-500 px-3 py-2 text-white cursor-pointer"
                >
                    Rename
                </button>

                <button
                    onClick={onDelete}
                    className="rounded bg-red-600 px-3 py-2 text-white cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}