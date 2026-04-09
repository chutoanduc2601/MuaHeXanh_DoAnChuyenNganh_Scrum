import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return <Navigate to="/dang-nhap" />;

    if (role && user.role !== role) return <Navigate to="/" />;

    return children;
}