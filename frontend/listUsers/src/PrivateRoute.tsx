import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface IPrivateRouteProps {
    children: ReactNode
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
    
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/"/>
    }

    return children
}