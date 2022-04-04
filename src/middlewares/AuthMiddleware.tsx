import React, { ReactChildren, ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface AuthMiddlewareProps {
    children: ReactNode
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
    const currentUser = sessionStorage.getItem("currentUser")

    return (
        <>  
            {
                !currentUser 
                    ? <Navigate to="/login" />
                    : {children}
            }   
        </>
    )
}

export default AuthMiddleware