import React, { ReactChildren } from "react"
import { Navigate } from "react-router-dom"

interface AuthMiddlewareProps {
    children: ReactChildren
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({children}) => {
    const currentUser = sessionStorage.getItem("currentUser")

    return (
        <>
            currentUser === null 
                ? <Navigate to="/login" />
                : {children}
        </>
    )
}