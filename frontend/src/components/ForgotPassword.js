import React, { useState } from 'react';
import './App.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage(''); // Resetear el mensaje antes de enviar la solicitud

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {  // Cambiado aquí
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Enlace de restablecimiento enviado. Revisa tu correo electrónico.');
            } else {
                setMessage(data.message || 'Error al enviar el enlace de restablecimiento.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al enviar el enlace de restablecimiento.');
        }
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleForgotPassword} className="forgot-password-form">
                <h2>Recuperar Contraseña</h2>
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
                <button type="submit" className="btn-recover">Enviar Enlace de Restablecimiento</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
