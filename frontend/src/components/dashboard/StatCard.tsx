interface Props {
    title: string;
    value: number | string;
}

export default function StatCard({
    title,
    value,
}: Props) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm border">
            <p className="text-sm text-gray-500">
                {title}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
                {value}
            </h2>
        </div>
    );
}