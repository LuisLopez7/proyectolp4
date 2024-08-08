import React, { useState } from 'react';
import './updateprofile.css';

const ProfileUpdateForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [socialLinks, setSocialLinks] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos actualizados al servidor o realizar alguna acción necesaria
        // Por ahora, solo mostraremos el mensaje de perfil actualizado
        alert('Perfil actualizado');
    };

    return (
        <div className="update-container">
            <div className="update-form">
                <h2>Actualizar Perfil</h2>
                <form onSubmit={handleSubmit}>
                <label>
                        Foto de Perfil:
                        <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} />
                    </label>
                    <label>
                        Nombre:
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label>
                        Apellido:
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label>
                        Correo Electrónico:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Biografía:
                        <input type="biografia" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </label>
                    <label>
                        Enlaces a Redes Sociales:
                        <input type="text" value={socialLinks} onChange={(e) => setSocialLinks(e.target.value)} />
                    </label>
                    <button className="btn-update" type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdateForm;
