import { useEffect, useState } from "react";

import { getDashboard } from "../api/dashboard";

import Loading from "../components/common/Loading";

import RecentActivities from "../components/dashboard/RecentActivities";
import RecentUploads from "../components/dashboard/RecentUploads";
import StatCard from "../components/dashboard/StatCard";

import type { Dashboard as DashboardType } from "../types/dashboard";

export default function Dashboard() {
    const [dashboard, setDashboard] =
        useState<DashboardType | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        getDashboard()
            .then(setDashboard)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!dashboard) {
        return (
            <div>
                Failed to load dashboard.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Overview of your document storage.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <StatCard
                    title="Total Files"
                    value={dashboard.total_files}
                />

                <StatCard
                    title="Total Folders"
                    value={dashboard.total_folders}
                />

                <StatCard
                    title="Storage Used"
                    value={`${(
                        dashboard.storage_used /
                        1024 /
                        1024
                    ).toFixed(2)} MB`}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <RecentUploads
                    uploads={dashboard.recent_uploads}
                />

                <RecentActivities
                    activities={dashboard.recent_activities}
                />
            </div>
        </div>
    );
}