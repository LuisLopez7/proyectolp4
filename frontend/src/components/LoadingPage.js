import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gif1 from '../assets/gifs/gif1.gif';
import gif2 from '../assets/gifs/gif2.gif';
import gif3 from '../assets/gifs/gif3.gif';
import './LoadingPage.css';

const LoadingPage = ({ onLoadingComplete }) => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [gif1, gif2, gif3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleLoginClick = () => {
        onLoadingComplete();
        navigate('/login');
    };

    const handlePrivacyClick = () => {
        onLoadingComplete();
        navigate('/PrivacyPolicy');
    };

    return (
        <div className="loading-page">
            <div className="connect-us-logo">ConnectUS</div>
            <div className="loading-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`gif ${index + 1}`}
                        style={{
                            opacity: index === currentImageIndex ? 1 : 0,
                            transform: index === currentImageIndex ? 'translateX(0)' : 'translateX(-100%)'
                        }}
                    />
                ))}
            </div>
            <div className="navigation-buttons">
                <button onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}>
                    &lt;
                </button>
                <button onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}>
                    &gt;
                </button>
            </div>
            <div className={`button-container right`}>
                <button className="Privacy-button" onClick={handlePrivacyClick}>Políticas de Privacidad</button>
                <button className="login-button" onClick={handleLoginClick}>Login</button>
            </div>
        </div>
    );
};

export default LoadingPage;
