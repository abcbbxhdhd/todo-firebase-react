import React from "react"
import Layout from "../../components/Layout/Layout"
import SignupForm from "../../components/SignupForm/SignupForm"
import "./RegisterView.css"

const RegisterView: React.FC = () => {
    return (
        <Layout>
            <SignupForm />
        </Layout>
    )
}

export default RegisterView