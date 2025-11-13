/**
 * Header Component
 * Global app header with user info, notifications, logout
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationsApi } from '../api/api';
import { Users, Bell, LogOut } from 'lucide-react';
import NotificationList from './NotificationList';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch notification count on mount and poll every 5 seconds
  useEffect(() => {
    // Request notification permission on first load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const fetchNotificationCount = async () => {
      try {
        const response = await notificationsApi.getNotifications(false);
        const fetchedNotifications = response.data.notifications || [];
        const unreadCount = fetchedNotifications.filter(n => !n.isRead).length || 0;
        setNotificationCount(unreadCount);

        // Show browser notifications for new unread notifications
        if ('Notification' in window && Notification.permission === 'granted') {
          const lastShownTime = localStorage.getItem('lastNotificationTime') || '0';
          const newNotifications = fetchedNotifications.filter(n =>
            !n.isRead && new Date(n.createdAt).getTime() > parseInt(lastShownTime)
          );

          // Show browser notifications for new ones (max 3 at a time)
          newNotifications.slice(0, 3).forEach(notification => {
            const browserNotif = new Notification('Peer-Tutor Connect', {
              body: notification.message,
              icon: '/favicon.ico',
              tag: notification._id,
              requireInteraction: false
            });

            browserNotif.onclick = () => {
              window.focus();
              navigate(`/questions/${notification.questionId}`);
              browserNotif.close();
            };
          });

          // Update last shown time if there are new notifications
          if (newNotifications.length > 0) {
            const latestTime = Math.max(...fetchedNotifications.map(n => new Date(n.createdAt).getTime()));
            localStorage.setItem('lastNotificationTime', latestTime.toString());
          }
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotificationCount();

    // Poll for new notifications every 5 seconds
    const interval = setInterval(fetchNotificationCount, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white/95 shadow-md border-b border-gray-200 sticky top-0 z-50 backdrop-blur-custom">
      <div className="container-centered" style={{ height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => navigate('/courses')}
          style={{ gap: '1rem' }}
        >
          <div className="bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all" style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem' }}>
            <Users style={{ width: '1.75rem', height: '1.75rem' }} className="text-white" aria-hidden="true" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-gray-900" style={{ fontSize: '1.25rem', lineHeight: '1.2' }}>
              Peer-Tutor Connect
            </h1>
            <p className="text-gray-500 font-medium" style={{ fontSize: '0.75rem' }}>Stevens Institute of Technology</p>
          </div>
        </div>

        {/* User Info and Actions */}
        <div className="flex items-center" style={{ gap: '1rem' }}>
          {/* User Greeting */}
          <div className="hidden md:flex items-center bg-gradient-to-r from-teal-50 to-emerald-50" style={{ gap: '0.75rem', padding: '0.5rem 1rem', borderRadius: '0.75rem' }}>
            <div className="bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%' }}>
              <span className="text-white font-bold" style={{ fontSize: '0.875rem' }}>
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-gray-500 font-medium" style={{ fontSize: '0.75rem' }}>Welcome back,</p>
              <p className="font-bold text-gray-900" style={{ fontSize: '0.875rem' }}>{user?.firstName} {user?.lastName}</p>
            </div>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all group"
              style={{ padding: '0.75rem', borderRadius: '0.75rem' }}
              aria-label="Notifications"
            >
              <Bell style={{ width: '1.5rem', height: '1.5rem' }} className="group-hover:scale-110 transition-transform" />
              {notificationCount > 0 && (
                <span
                  className="absolute bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold flex items-center justify-center shadow-lg animate-pulse"
                  style={{
                    top: '-0.25rem',
                    right: '-0.25rem',
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    fontSize: '0.75rem'
                  }}
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <NotificationList
                onClose={() => setShowNotifications(false)}
                onCountChange={setNotificationCount}
              />
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all font-medium group"
            style={{ gap: '0.5rem', padding: '0.625rem 1rem', borderRadius: '0.75rem' }}
            aria-label="Logout"
          >
            <LogOut style={{ width: '1.25rem', height: '1.25rem' }} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
