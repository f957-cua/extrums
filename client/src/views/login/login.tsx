import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../signup/index.css';
import { login } from '../../operations/axios';

const Login: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const res = await login(name, password);
            const { token } = res;
            navigate("/counter", {state: {token}});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="auth_form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label> Type your name
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"/>
                </label>
                <label> Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                </label>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default Login;