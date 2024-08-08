import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function ResetPassword() {
    const { token } = useParams(); // Obtiene el token de la URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setMessage('Token de restablecimiento no válido.');
        }
    }, [token]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage(''); 

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Contraseña restablecida exitosamente. Serás redirigido a la página de inicio de sesión.');
                setTimeout(() => {
                    navigate('/login'); 
                }, 3000);
            } else {
                setMessage(data.message || 'Error al restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al restablecer la contraseña.');
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleResetPassword} className="reset-password-form">
                <h2>Restablecer Contraseña</h2>
                {message && <p>{message}</p>}
                <label>
                    Nueva Contraseña:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </label>
                <label>
                    Confirmar Contraseña:
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </label>
                <button type="submit" className="btn-reset">Restablecer Contraseña</button>
            </form>
        </div>
    );
}

export default ResetPassword;
