mport React from 'react';
import { AiOutlineUser, AiOutlineComment, AiOutlineTag } from 'react-icons/ai';

const NotificationItem = ({ notification, markAsRead }) => {
  const { id, message, type, read } = notification;

  const handleClick = () => {
    markAsRead(id);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'follower':
        return <AiOutlineUser className="notification-icon" />;
      case 'comment':
        return <AiOutlineComment className="notification-icon" />;
      case 'tag':
        return <AiOutlineTag className="notification-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`notification-item ${read ? '' : 'unread'}`}>
      {getIcon(type)}
      <div className="message">{message}</div>
      <button
        className={`mark-read-button ${read ? 'read' : ''}`}
        onClick={handleClick}
      >
        {read ? 'Leído' : 'Marcar como leída'}
      </button>
    </div>
  );
};

export default NotificationItem;
