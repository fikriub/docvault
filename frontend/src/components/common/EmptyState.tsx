interface Props {
    title: string;
}

export default function EmptyState({
    title,
}: Props) {
    return (
        <div className="rounded-lg border bg-white p-10 text-center text-gray-500">
            {title}
        </div>
    );
}