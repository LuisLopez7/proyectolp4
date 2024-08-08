import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Login({ setIsAuthenticated }) {  // Agrega el prop aquí
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login with:', { email, password });
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email,
                password
            });

            console.log('Login response:', response.data);

            if (response.data.success) {
                const { token, username, firstName, lastName } = response.data;
                // Guardar la información del usuario y el token en el localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('username', username || '');  // Maneja el caso en que estos datos no existan
                localStorage.setItem('firstName', firstName || '');
                localStorage.setItem('lastName', lastName || '');

                setIsAuthenticated(true);  // Establece la autenticación aquí
                
                // Redirigir a Feed
                navigate('/Feed');
            } else {
                setMessage(response.data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setMessage(error.response?.data?.message || 'Error desconocido');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Inicio de Sesión</h2>
                {message && <p>{message}</p>}
                <label>
                    Correo Electrónico:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="btn-login">Iniciar Sesión</button>
                <Link to="/register" className="register-link">¿No tienes una cuenta? Regístrate aquí</Link>
            </form>
        </div>
    );
}

export default Login;
