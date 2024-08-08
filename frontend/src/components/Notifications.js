import React, { useState } from 'react';
import NotificationItem from './NotificationItem';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nuevo seguidor:', type: 'follower', read: false },
    { id: 2, message: 'Nuevo comentario en tu publicación', type: 'comment', read: false },
    { id: 3, message: 'Te han etiquetado en una foto', type: 'tag', read: false }
  ]);

  const markAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notificaciones</h2>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          markAsRead={markAsRead}
        />
      ))}
    </div>
  );
};

export default Notifications;
