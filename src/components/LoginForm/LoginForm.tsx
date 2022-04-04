import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/firebase-config"
import "./LoginForm.css"

interface FormData {
    email: string,
    password: string
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            sessionStorage.setItem("currentUser", JSON.stringify({
                uid: userCredentials.user.uid,
                email: userCredentials.user.email
            }))
            navigate("/todos")
        } catch (_e) {
            switch ((_e as FirebaseError).code) {
                case "auth/user-not-found":
                    setError("User not found")
                    return 
                case "auth/wrong-password":
                    setError("Wrong password")
                    return
                case "auth/invalid-credential":
                    setError("Invalid credential")
                    return
                default:
                    return
            }
        }
    }
        
    const handleRedirectToSignup = () => {
        navigate("/signup")
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input name="email" placeholder="Email" type="email" value={formData.email} onChange={(e) => handleChange(e)} />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={(e) => handleChange(e)} />
            <button type="submit">Sign In</button>
            <p>Don't have an account? <span onClick={handleRedirectToSignup}>Sign up</span></p>
            {error.length > 0 && <p>{error}</p>}
        </form>
    )
}

export default LoginForm