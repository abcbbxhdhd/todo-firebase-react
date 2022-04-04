import { onAuthStateChanged, signOut } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/firebase-config"

const Header: React.FC = () => {
    const [isLogged, setIsLogged] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true)
            } else {
                setIsLogged(false)
            }
        })
    }, [])

    const handleLogout = async () => {
        await signOut(auth)
        sessionStorage.removeItem("currentUser")
        navigate("/login")
    }

    const handleTodosNavigate = () => {
        navigate("/todos")
    }

    const handleSignInNavigate = () => {
        navigate("/login")
    }

    return (
        <header>
            <h1>Logo</h1>
            <div className="nav__links">
                <h2 onClick={handleTodosNavigate}>TODOS</h2>
                {
                    isLogged
                        ? <h2 onClick={handleLogout}>LOGOUT</h2>
                        : <h2 onClick={handleSignInNavigate}>SIGN IN</h2>
                }
            </div>
        </header>
    )
}

export default Header