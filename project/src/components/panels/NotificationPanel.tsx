import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Order Completed',
      message: 'Order #12345 has been successfully processed',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'iPhone 15 Pro Max is running low on stock (5 remaining)',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'New Customer',
      message: 'John Doe has created a new account',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of $299.99 has been received',
      time: '1 day ago',
      unread: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-[#6EE7B7]" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-[#FDBA74]" />;
      case 'info':
        return <Info className="h-4 w-4 text-[#93C5FD]" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-[#6EE7B7]/10 border-[#6EE7B7]/20';
      case 'warning':
        return 'bg-[#FDBA74]/10 border-[#FDBA74]/20';
      case 'info':
        return 'bg-[#93C5FD]/10 border-[#93C5FD]/20';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-[#374151]">Notifications</h3>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-gray-400 hover:text-[#A78BFA] rounded"
              >
                <Check className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-[#374151] rounded"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                  notification.unread ? 'bg-[#A78BFA]/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg border ${getBgColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#374151] truncate">
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-[#A78BFA] rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-center text-sm text-[#A78BFA] hover:text-[#8B5CF6] font-medium"
            >
              View All Notifications
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}