'use client';

import { useState } from 'react';
import { Bell, X, Settings } from 'lucide-react';

interface NotificationCenterProps {
  theme: 'light' | 'dark';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
}

export function NotificationCenter({ theme }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Mise à jour disponible',
      message: 'Une nouvelle version est disponible',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '2',
      title: 'Connexion WiFi',
      message: 'Connecté au réseau "Home_Network"',
      type: 'success',
      timestamp: new Date()
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'bg-gray-800/50 text-white hover:bg-white/10'
            : 'bg-white/80 text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Bell size={16} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-80">
          <div className={`rounded-xl shadow-2xl border transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900/95 backdrop-blur-md border-gray-700/50'
              : 'bg-white/95 backdrop-blur-md border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Centre de notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className={`p-4 text-center ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Aucune notification
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)} ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs opacity-80">{notification.message}</div>
                          <div className="text-xs opacity-60 mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <button className={`w-full flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <Settings size={16} />
                <span className="text-sm">Paramètres des notifications</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
