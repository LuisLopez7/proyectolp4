import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Lógica de inicio de sesión
        console.log('Inicio de sesión con:', email, password);
        // Navegar a la página de estadísticas después de iniciar sesión
        navigate('/estadisticas');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Iniciar Sesión</h2>
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
                <Link to="/forgot-password" className="forgot-password-link">Olvidé mi contraseña</Link>
            </form>
        </div>
    );
}

export default Login;
