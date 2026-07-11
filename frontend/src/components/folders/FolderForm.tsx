import { useState } from "react";

interface Props {
    initialValue?: string;
    submitText: string;
    onSubmit: (name: string) => void;
}

export default function FolderForm({
    initialValue = "",
    submitText,
    onSubmit,
}: Props) {
    const [name, setName] =
        useState(initialValue);

    return (
        <form
            className="flex gap-3"
            onSubmit={(e) => {
                e.preventDefault();

                if (!name.trim()) return;

                onSubmit(name);

                setName("");
            }}
        >
            <input
                className="flex-1 rounded-lg border p-3"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                placeholder="Folder name"
            />

            <button
                className="rounded-lg bg-blue-600 px-5 text-white"
            >
                {submitText}
            </button>
        </form>
    );
}