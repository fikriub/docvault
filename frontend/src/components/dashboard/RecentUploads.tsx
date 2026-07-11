import type { RecentUpload } from "../../types/dashboard";

interface Props {
    uploads: RecentUpload[];
}

export default function RecentUploads({
    uploads,
}: Props) {
    return (
        <div className="rounded-xl bg-white border shadow-sm">
            <div className="border-b p-5">
                <h2 className="text-lg font-semibold">
                    Recent Uploads
                </h2>
            </div>

            <div>
                {uploads.length === 0 ? (
                    <div className="p-5 text-gray-500">
                        No uploads
                    </div>
                ) : (
                    uploads.map(upload => (
                        <div
                            key={upload.id}
                            className="border-b p-5 last:border-none"
                        >
                            <div className="font-medium">
                                {upload.filename}
                            </div>

                            <div className="text-sm text-gray-500">
                                {upload.size} bytes
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}