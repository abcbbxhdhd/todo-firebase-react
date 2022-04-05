import React from "react"
import Layout from "../../components/Layout/Layout"
import LoginForm from "../../components/LoginForm/LoginForm"
import "./LoginView.css"

const LoginView: React.FC = () => {
    return (
        <Layout>
            <LoginForm />
        </Layout>
    )
}

export default LoginView