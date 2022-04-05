import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/firebase-config"

interface FormData {
    email: string,
    password: string,
    passwordConfirm: string
}

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        passwordConfirm: ""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.password === formData.passwordConfirm) {
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                sessionStorage.setItem("currentUser", JSON.stringify({
                    uid: userCredentials.user.uid,
                    email: userCredentials.user.email
                }))
                navigate("/todos")
            } catch (e) {
                switch ((e as FirebaseError).code) {
                    case "auth/email-already-in-use":
                        setError("Email is already in use")
                        return
                    case "auth/invalid-email":
                        setError("Invalid email")
                        return
                    case "auth/weak-password":
                        setError("Weak password")
                        return
                    default:
                        return
                }
            }
        } else {
            setError("Invalid password confirmation")
        }    
    }

    const handleRedirectToSignin = () => {
        navigate("/login")
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Sign Up</h3>
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => handleChange(e)} />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={(e) => handleChange(e)} />
            <input name="passwordConfirm" type="password" placeholder="Confirm password" value={formData.passwordConfirm} onChange={(e) => handleChange(e)} />
            <button type="submit">SIGN UP</button>
            <p>Already have an account? <span onClick={handleRedirectToSignin}>Sign in</span></p>
            {error.length > 0 && <p>{error}</p>}
        </form>
    )
}

export default SignupForm