import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineBell } from 'react-icons/ai'; // Importa el ícono de notificaciones de React Icons

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <h1>Red Social</h1>
                </div>
                <nav className="nav-links">
                    <ul>
                        <li>
                            <Link to="/notifications">
                                <AiOutlineBell /> {/* Ícono de notificaciones */}
                                <span className="notification-badge">3</span> {/* Número de notificaciones */}
                            </Link>
                        </li>
                        {/* Otros enlaces del menú */}
                        <li><Link to="/about">Acerca de</Link></li>
                        <li><Link to="/services">Servicios</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
