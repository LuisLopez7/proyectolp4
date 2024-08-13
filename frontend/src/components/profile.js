import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

const MiPerfil = () => {
    const [userData, setUserData] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [posts, setPosts] = useState([]); // Definir el estado de posts

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log('User data:', response.data);
                    setUserData(response.data);
                    setPosts(response.data.posts || []); // Actualizar el estado de posts
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    // Considera mostrar un mensaje de error aquí
                }
            } else {
                // Redirige o muestra un mensaje si el token no está presente
                console.log('Token no encontrado');
            }
        };

        fetchUserData();
    }, []);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    // Filtrar posts según la configuración de privacidad (ajusta esto según tu lógica)
    const filteredPosts = posts.filter(post => {
        // Implementa lógica de filtrado aquí si es necesario
        return true; 
    });

    return (
        <div className="profile-body">
            {/* Navbar */}
            <div className="profile-navbar">
                <div className="container">
                    <div className="logo">
                        {/* Aquí puedes colocar tu logo */}
                    </div>
                    <div className="button-container">
                        <Link to="/updateprofile" className="btn">Editar Perfil</Link>
                        <Link to="/privacysettings" className="btn">Configuración de Privacidad</Link>
                        <button className="btn" onClick={toggleOptions}>Opciones</button>
                        <div className={`dropdown-menu ${showOptions ? 'show' : ''}`}>
                            <Link to="/calendar" className="dropdown-item">Eventos</Link>
                            <Link to="/estadisticas" className="dropdown-item">Estadísticas</Link>
                            <Link to="/create-album" className="dropdown-item">Crear Álbum</Link>
                            <Link to="/userprofile" className="dropdown-item">Perfil</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Container */}
            <div className="profile-container">
                <div className="profile-content">
                    {/* Profile Header */}
                    <div className="profile-header">
                        <div className="profile-picture">
                            <img src={userData?.profilePicture || 'default-image.jpg'} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <div className="username">Usuario: {userData?.username || 'Cargando...' }</div>
                            <div className="fullname">
                                Nombre Completo: {`${userData?.firstName || 'Cargando...'} ${userData?.lastName || ''}`}
                            </div>
                            <div className="profile-stats">
                                <span>Posts: {userData?.posts?.length || '0'}</span>
                                <span>Followers: {userData?.followers || '0'}</span>
                                <span>Following: {userData?.following || '0'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div className="posts-section">
                        {/* Post Tabs */}
                        <div className="post-tabs">
                            <div className="tab active">Posts</div>
                            <div className="tab">Tagged</div>
                        </div>

                        {/* Posts */}
                        <div className="posts">
                            {filteredPosts.map((post, index) => (
                                <div key={index} className="post" onClick={() => handlePostClick(post)}>
                                    <img src={post} alt="Post" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedPost && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="modal-left">
                            <img src={selectedPost} alt="Selected Post" />
                        </div>
                        <div className="modal-right">
                            <div className="comments-container">
                                {/* Aquí puedes agregar tus comentarios */}
                                <p>Comentario 1</p>
                                <p>Comentario 2</p>
                            </div>
                            <div className="interaction-buttons">
                                <button className="btn">Me gusta</button>
                                <button className="btn">Comentar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiPerfil;
