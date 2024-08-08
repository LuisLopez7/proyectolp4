import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Estadisticas from './Estadisticas';
import Feed from './Feed';
import Header from './Header';
import Notifications from './Notifications';
import UpdateProfile from './UpdateProfile';
import Profile from './profile';
import chat from './chat';
import Calendar from './Calendar';
import Reporte from './Reporte';
import SearchResults from './SearchResults';
import UploadPhoto from './UploadPhoto';
import CreateAlbum from './CreateAlbum';
import LoadingPage from './LoadingPage';
import PrivacyPolicy from './PrivacyPolicy'; 
import './App.css';

function App() {
    const [notifications, setNotifications] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const addNotification = (message, link) => {
        const newNotification = { id: notifications.length + 1, message, link, read: false };
        setNotifications([...notifications, newNotification]);
    };

    const markAsRead = (id) => {
        const updatedNotifications = notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        );
        setNotifications(updatedNotifications);
    };

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <Router>
            <div className="App">
                {isLoading ? (
                    <LoadingPage onLoadingComplete={handleLoadingComplete} />
                ) : (
                    <>
                        {isAuthenticated && (
                            <Header
                                isAuthenticated={isAuthenticated}
                                notificationsCount={notifications.filter(notification => !notification.read).length}
                            />
                        )}
                        <Routes>
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                            <Route path="/register" element={<Register addNotification={addNotification} />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/estadisticas" element={isAuthenticated ? <Estadisticas /> : <Navigate to="/login" />} />
                            <Route path="/Feed" element={isAuthenticated ? <Feed /> : <Navigate to="/login" />} />
                            <Route path="/notifications" element={isAuthenticated ? <Notifications notifications={notifications} markAsRead={markAsRead} /> : <Navigate to="/login" />} />
                            <Route path="/updateprofile" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
                            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                            <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />} />
                            <Route path="/chat" element={isAuthenticated ? <chat /> : <Navigate to="/login" />} />
                            <Route path="/reporte/:postId" element={isAuthenticated ? <Reporte /> : <Navigate to="/login" />} />
                            <Route path="/search" element={isAuthenticated ? <SearchResults /> : <Navigate to="/login" />} />
                            <Route path="/upload-photo" element={isAuthenticated ? <UploadPhoto /> : <Navigate to="/login" />} />
                            <Route path="/create-album" element={isAuthenticated ? <CreateAlbum /> : <Navigate to="/login" />} />
                            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} /> {/* Verifica la ruta aquí */}
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
