import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
    return (
        <div className="h-screen flex flex-col">
            
            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <main className="flex-1 p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;