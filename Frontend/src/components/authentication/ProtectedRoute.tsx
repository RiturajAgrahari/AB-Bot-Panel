import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import api from "../../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constants";
import { useState, useEffect, ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
};

function ProtectedRoute({children}: ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh", {
                refresh: refreshToken,
            });
            if (res.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
                setLoading(false)
            } else {
                setIsAuthorized(false)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            setLoading(false)
            return 
        }
        const decoded: any = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
            setLoading(false)
        }
    }

    if (loading === true){
        return (
            <div className="loader" style={{display: loading ? "flex" : "none"}}>
                <div style={{backgroundColor: "white"}} className="loading-bar"></div>
                <div style={{backgroundColor: "white"}} className="loading-bar"></div>
                <div style={{backgroundColor: "white"}} className="loading-bar"></div>
                <div style={{backgroundColor: "white"}} className="loading-bar"></div>
            </div>
        ) 
    } else if (loading === false ) {
        return isAuthorized ? children : <Navigate to="/login"/>
    }
    
    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute;