mport React from 'react';
import './App.css';

function Chat() {
    return (
        <div className="chat-body">
            {/* Barra de navegación */}
            <header className="navbar">
                <div className="container">
                    <div className="logo">
                    </div>
                </div>
            </header>

            {/* Contenedor principal */}
            <div className="chat-container">
                {/* Lista de Conversaciones */}
                <div className="conversation-list">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar conversación..." />
                    </div>
                    <ul>
                        <li>
                            <div className="profile-pic"></div>
                            <div className="conversation-info">
                                <h3>Usuario1</h3>
                                <p>Último mensaje...</p>
                            </div>
                        </li>
                        <li>
                            <div className="profile-pic"></div>
                            <div className="conversation-info">
                                <h3>Usuario2</h3>
                                <p>Último mensaje...</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Ventana de Chat */}
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="profile-pic">
                            <img src="https://example.com/profile-picture.jpg" alt="" />
                        </div>
                        <div className="user-info">
                            <h2>Usuario 2</h2>
                        </div>
                        <div className="header-icons">
                            <span><i className="fa fa-video-camera"></i></span>
                            <span><i className="fa fa-phone"></i></span>
                            <span><i className="fa fa-info-circle"></i></span>
                        </div>
                    </div>
                    <div className="chat-messages">
                        <div className="message sent">
                            <p></p>
                        </div>
                        <div className="message received">
                            <p></p>
                        </div>
                    </div>
                    <div className="chat-input">
                        <textarea placeholder="Escribe tu mensaje..."></textarea>
                        <div className="input-icons">
                            <span><i className="fa fa-paperclip"></i></span>
                            <span><i className="fa fa-smile-o"></i></span>
                        </div>
                        <button type="submit"><i className="fa fa-paper-plane"></i> Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
