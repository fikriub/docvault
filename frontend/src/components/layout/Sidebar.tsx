import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `mx-3 rounded-lg px-4 py-3 transition ${
        isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
    }`;

export default function Sidebar() {
    return (
        <aside className="flex w-64 flex-col border-r bg-white">
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-blue-600">
                    DocVault
                </h1>
            </div>

            <nav className="mt-4 flex flex-col gap-2">
                <NavLink to="/" end className={linkClass}>
                    Dashboard
                </NavLink>

                <NavLink to="/folders" className={linkClass}>
                    Folders
                </NavLink>

                <NavLink to="/files" className={linkClass}>
                    Files
                </NavLink>
            </nav>
        </aside>
    );
}