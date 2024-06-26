import React, { useState } from 'react';
import './App.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        // Aquí debería ir la lógica para enviar el enlace de restablecimiento de contraseña
        console.log('Enlace de restablecimiento enviado a:', email);
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleForgotPassword}>
                <h2>Recuperar Contraseña</h2>
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
