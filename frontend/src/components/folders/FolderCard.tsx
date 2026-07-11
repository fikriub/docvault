import type { Folder } from "../../types/folder";

interface Props {
    folder: Folder;
    onRename: () => void;
    onDelete: () => void;
}

export default function FolderCard({
    folder,
    onRename,
    onDelete,
}: Props) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">
                {folder.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                Created:
                {" "}
                {new Date(
                    folder.created_at,
                ).toLocaleString()}
            </p>

            <div className="mt-5 flex gap-3">
                <button
                    onClick={onRename}
                    className="rounded bg-yellow-500 px-4 py-2 text-white"
                >
                    Rename
                </button>

                <button
                    onClick={onDelete}
                    className="rounded bg-red-600 px-4 py-2 text-white"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}