import { Navigate } from "react-router-dom";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const handleStorageChange = () => {
            auth().catch(() => setIsAuthorized(false));
        };

        window.addEventListener('storage', handleStorageChange);

        // Initial authentication check
        auth().catch(() => setIsAuthorized(false));

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const auth = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;