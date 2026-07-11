import type { RecentActivity } from "../../types/dashboard";

interface Props {
    activities: RecentActivity[];
}

export default function RecentActivities({
    activities,
}: Props) {
    return (
        <div className="rounded-xl bg-white border shadow-sm">
            <div className="border-b p-5">
                <h2 className="text-lg font-semibold">
                    Recent Activities
                </h2>
            </div>

            <div>
                {activities.length === 0 ? (
                    <div className="p-5 text-gray-500">
                        No activities
                    </div>
                ) : (
                    activities.map(activity => (
                        <div
                            key={activity.id}
                            className="border-b p-5 last:border-none"
                        >
                            {activity.action}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}