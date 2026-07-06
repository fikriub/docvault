import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-64 border-r p-4">
            <nav className="flex flex-col gap-4">
                <Link to="/">Dashboard</Link>

                <Link to="/folders">Folders</Link>

                <Link to="/files">Files</Link>
                
                <Link to="/profiles">Profiles</Link>
            </nav>
        </aside>
    )
}

export default Sidebar;