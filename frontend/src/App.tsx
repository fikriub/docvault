import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import Folders from "./pages/Folders";

function App() {
    return (        
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
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
            </Route>
        </Routes>        
    );
}

export default App;