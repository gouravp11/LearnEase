import { Navigate, Route, Routes } from "react-router-dom";
import { AddContentProvider } from "./context/AddContentContext.jsx";
import { AddContentDialog } from "./components/AddContentDialog.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Library from "./pages/Library.jsx";
import Auth from "./pages/Auth.jsx";
import { SubjectsProvider } from "./context/SubjectsContext.jsx";
import CreateSubjectDialog from "./components/CreateSubjectDialog.jsx";

export default function App() {
    return (
        <SubjectsProvider>
            <AddContentProvider>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/login" element={<Auth mode="login" />} />
                    <Route path="/signup" element={<Auth mode="signup" />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <CreateSubjectDialog />
                <AddContentDialog />
            </AddContentProvider>
        </SubjectsProvider>
    );
}
