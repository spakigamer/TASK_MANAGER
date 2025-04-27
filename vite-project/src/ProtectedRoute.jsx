import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const tokenFromUrl = new URLSearchParams(location.search).get("token");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (tokenFromUrl) {
            localStorage.setItem("token", tokenFromUrl);
            window.history.replaceState({}, document.title, "/dashboard");
        }
    }, [tokenFromUrl]);

    return token || tokenFromUrl ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
