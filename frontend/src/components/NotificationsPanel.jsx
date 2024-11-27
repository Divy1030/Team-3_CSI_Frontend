import React from 'react';
import { X, ThumbsUp, UserPlus, MessageCircle } from 'lucide-react';

const NotificationsPanel = ({ onClose }) => {
  const notifications = [
    { id: 1, user: "Alanna Myassa", action: "Followed you", time: "30 minutes ago", type: "follow" },
    { id: 2, user: "Alanna Myassa", action: 'Liked your post "Nice logo"', time: "30 minutes ago", type: "like" },
    { id: 3, user: "Alanna Myassa", action: 'Liked your post "Nice logo"', time: "30 minutes ago", type: "like" },
    { id: 4, user: "Alanna Myassa", action: 'Liked your post "Nice logo"', time: "30 minutes ago", type: "like" },
    { id: 5, user: "Alanna Myassa", action: "Followed you", time: "30 minutes ago", type: "follow" },
    { id: 6, user: "Alanna Myassa", action: "commented on your post", time: "30 minutes ago", type: "comment" },
    { id: 7, user: "Alanna Myassa", action: "commented on your post", time: "30 minutes ago", type: "comment" },
    { id: 8, user: "Alanna Myassa", action: "Followed you", time: "30 minutes ago", type: "follow" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="text-blue-500 w-4 h-4" />;
      case 'follow':
        return <UserPlus className="text-green-500 w-4 h-4" />;
      case 'comment':
        return <MessageCircle className="text-yellow-500 w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-lg bg-[#2b2b2b] text-white rounded-xl shadow-lg">
      {/* <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Notifications</h2>
        <button className="text-gray-400 hover:text-white" onClick={onClose}>
          <X size={24} />
        </button>
      </div> */}

      <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center gap-3 p-4 hover:bg-gray-900 border-b border-gray-700"
          >
            {getIcon(notification.type)}
            <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0" />
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm">
                  <span className="font-medium">{notification.user}</span>
                  {' '}
                  {notification.action}
                </p>
              </div>
              <p className="text-xs text-gray-400">{notification.time}</p>
            </div>

            {notification.type === "follow" && (
              <button className="px-4 py-1 text-sm bg-[#1a1a1a] text-[#baacf3] rounded-md hover:bg-gray-700 border-2 border-[#baacf3]">
                {notification.id === 8 ? "Follow back" : "Followed"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;