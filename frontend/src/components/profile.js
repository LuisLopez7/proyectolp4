import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

const MiPerfil = () => {
    const [userData, setUserData] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    
    const posts = [
        "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2024/06/19/17187971620723.jpg",
        "https://phantom-marca.unidadeditorial.es/7e747731a77d954af79f60b4392d75f4/resize/828/f/jpg/assets/multimedia/imagenes/2024/02/05/17071705902442.jpg",
        "https://ichef.bbci.co.uk/news/2048/cpsprodpb/85aa/live/47176430-b058-11ee-beb5-e1400df560f2.jpg"
    ];

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
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
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
                        <button className="btn" onClick={toggleOptions}>Opciones</button>
                        <div className={`dropdown-menu ${showOptions ? 'show' : ''}`}>
                            <Link to="/calendar" className="dropdown-item">Eventos</Link>
                            <Link to="/estadisticas" className="dropdown-item">Estadísticas</Link>
                            <Link to="/create-album" className="dropdown-item">Crear Álbum</Link>
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
                            {posts.map((post, index) => (
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
