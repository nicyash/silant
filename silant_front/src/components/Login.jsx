import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Login.css"

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function Login({
    formUsername,
    formPassword,
    token,
    setToken,
    role,
    firstName,
    error,
    loading,
    setFormUsername,
    setFormPassword,
    setLogined,
    submitHandler,
}) {
    const navigate = useNavigate();

    const handleLogout = () =>
        client.post("/api/logout", {})
            .then(() => {
                setToken(null);
                setLogined(false);
                localStorage.removeItem('token');
                navigate("/login");
            });

    const handleFormUsername = (event) => {
        setFormUsername(event.target.value);
    };

    const handleFormPassword = (event) => {
        setFormPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitHandler(event);
    };

    return (
        <>
            {error && <p>{error}</p>}
            {!token &&
                (loading ? "Загрузка..." :
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <input
                            className="inputSearch"
                            type="text"
                            name="username"
                            value={formUsername}
                            onChange={handleFormUsername}
                            placeholder="Username"
                        />
                        <input
                            className="inputSearch"
                            type="password"
                            name="password"
                            value={formPassword}
                            onChange={handleFormPassword}
                            placeholder="Password"
                        />
                        <input
                            className="buttonEnter"
                            type="submit"
                            name="submit"
                            value="Войти"
                        />
                    </form>
                )
            }
        </>
    );
}

export default Login;