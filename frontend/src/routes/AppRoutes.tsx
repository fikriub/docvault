import {
    Navigate,
    Route,
    Routes,    
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Files from "../pages/Files";
import Folders from "../pages/Folders";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

function AppRoutes () {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route element={<MainLayout />}>
                <Route
                    index
                    element={<Dashboard />}
                />
                <Route
                    path="/folders"
                    element={<Folders />}
                />
                <Route
                    path="/files"
                    element={<Files />}
                />
                <Route
                    path="/profiles"
                    element={<Profile />}
                />
            </Route>

            <Route
                path="/404"
                element={<NotFound />}
            />

            <Route
                path="*"
                element={<Navigate to="/404" replace />}
            />
        </Routes>
    )
}

export default AppRoutes;