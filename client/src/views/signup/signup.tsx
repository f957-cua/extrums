import React, { useState, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUp } from "../../operations/axios.js";
import './index.css';

const SignUp: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const res = await signUp(name, password);
            if (!res) {
                console.log("DB connection problems")
            }
            console.log(res);
            navigate("/login");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth_container">
            <form className="auth_form" onSubmit={handleSubmit}>
                <h2>Registration</h2>
                <label> Enter your name
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"/>
                </label>
                <label> Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                </label>
                <button type="submit">register</button>
            </form>
            <p>Already have an account?</p>
            <NavLink className="auth_link" to="/login">Login</NavLink>
        </div>
    )
}

export default SignUp;