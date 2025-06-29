import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatisticsModal({ isOpen, onClose }: StatisticsModalProps) {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$193,000',
      change: '+35%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Customers',
      value: '856',
      change: '+8%',
      changeType: 'positive',
      icon: PieChart,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      changeType: 'positive',
      icon: Activity,
      color: 'orange'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#374151]">Sales Statistics</h2>
                  <p className="text-sm text-gray-500">Detailed analytics and performance metrics</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-[#374151] rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${
                        stat.color === 'emerald' ? 'from-[#6EE7B7] to-[#10B981]' :
                        stat.color === 'blue' ? 'from-[#93C5FD] to-[#3B82F6]' :
                        stat.color === 'purple' ? 'from-[#A78BFA] to-[#8B5CF6]' :
                        'from-[#FDBA74] to-[#F59E0B]'
                      } rounded-lg flex items-center justify-center`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className={`text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-[#6EE7B7]' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                    <p className="text-2xl font-bold text-[#374151]">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-xl p-8 text-center"
              >
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#374151] mb-2">Detailed Charts</h3>
                <p className="text-gray-600">
                  Interactive charts and graphs would be displayed here with real-time data visualization.
                </p>
              </motion.div>

              {/* Action */}
              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}