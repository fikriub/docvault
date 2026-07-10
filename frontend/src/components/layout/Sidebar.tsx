import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r">
            <div className="p-6 text-2xl font-bold">
                DocVault
            </div>

            <nav className="flex flex-col">
                <NavLink
                    to="/"
                    className="px-6 py-3 hover:bg-gray-100"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/folders"
                    className="px-6 py-3 hover:bg-gray-100"
                >
                    Folders
                </NavLink>

                <NavLink
                    to="/files"
                    className="px-6 py-3 hover:bg-gray-100"
                >
                    Files
                </NavLink>
            </nav>
        </aside>
    );
}