import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Package,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  Sparkles,
  Star,
  Target,
  Zap,
  TrendingDown,
  Eye,
  BarChart3,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { StatisticsModal } from './modals/StatisticsModal';
import { UpgradeModal } from './modals/UpgradeModal';

interface DashboardContentProps {
  activeSection: string;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.01,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: { type: "spring", stiffness: 400, damping: 15 }
    }
  };

  if (activeSection !== 'overview') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 lg:p-8"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#374151] mb-4">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            This section is under development. Content for {activeSection} will be added here.
          </p>
        </div>
      </motion.div>
    );
  }

  const kpiData = [
    {
      title: 'Net Income',
      value: '$193,000',
      change: '+35%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'emerald',
      description: 'from last month'
    },
    {
      title: 'Total Return',
      value: '$32,000',
      change: '-24%',
      changeType: 'negative' as const,
      icon: TrendingDown,
      color: 'red',
      description: 'from last month'
    }
  ];

  const transactions = [
    { 
      id: 'Premium T-Shirt', 
      customer: 'Jul 12th 2024', 
      amount: 'Completed', 
      status: 'completed', 
      code: '0JWEJS7SNC',
      icon: '👕'
    },
    { 
      id: 'Playstation 5', 
      customer: 'Jul 12th 2024', 
      amount: 'Pending', 
      status: 'pending', 
      code: '0JWEJS7SNC',
      icon: '🎮'
    },
    { 
      id: 'Hoodie Gombrong', 
      customer: 'Jul 12th 2024', 
      amount: 'Pending', 
      status: 'pending', 
      code: '0JWEJS7SNC',
      icon: '👘'
    },
    { 
      id: 'iPhone 15 Pro Max', 
      customer: 'Jul 12th 2024', 
      amount: 'Completed', 
      status: 'completed', 
      code: '0JWEJS7SNC',
      icon: '📱'
    },
    { 
      id: 'Coffee Beans', 
      customer: 'Jul 12th 2024', 
      amount: 'Completed', 
      status: 'completed', 
      code: '0JWEJS7SNC',
      icon: '☕'
    },
    { 
      id: 'Starbucks Mug', 
      customer: 'Jul 12th 2024', 
      amount: 'Completed', 
      status: 'completed', 
      code: '0JWEJS7SNC',
      icon: '☕'
    }
  ];

  const salesReport = [
    { product: 'Product Launched', count: '(233)', progress: 85, color: 'emerald' },
    { product: 'Ongoing Product', count: '(23)', progress: 45, color: 'yellow' },
    { product: 'Product Sold', count: '(482)', progress: 95, color: 'emerald' }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-[#6EE7B7]/20 text-[#6EE7B7] border border-[#6EE7B7]/30',
      pending: 'bg-[#FDBA74]/20 text-[#FDBA74] border border-[#FDBA74]/30',
      failed: 'bg-red-100 text-red-700 border border-red-200'
    };
    return styles[status as keyof typeof styles] || '';
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 lg:p-8 space-y-6 lg:space-y-8"
      >
        {/* Header with Update Card */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Update Card */}
          <motion.div
            variants={cardHoverVariants}
            whileHover="hover"
            className="xl:col-span-1 bg-gradient-to-br from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED] rounded-2xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                className="flex items-center space-x-2 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-2 h-2 bg-[#FDBA74] rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Update</span>
              </motion.div>
              <p className="text-sm text-purple-100 mb-2">Feb 12th 2024</p>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">
                Sales revenue increased <span className="text-[#FDBA74]">40%</span> in 1 week
              </h3>
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowStatisticsModal(true)}
                className="flex items-center space-x-2 text-sm font-medium hover:text-[#FDBA74] transition-colors"
              >
                <span>See Statistics</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* KPI Cards */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base lg:text-lg font-semibold text-[#374151]">
                    {kpi.title}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    className="p-2 text-gray-400 hover:text-[#A78BFA] rounded-lg hover:bg-gray-50"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <motion.p 
                    className="text-3xl lg:text-4xl font-bold text-[#374151]"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                  >
                    {kpi.value}
                  </motion.p>
                  
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className={`flex items-center space-x-1 text-sm font-semibold ${
                        kpi.changeType === 'positive' 
                          ? 'text-[#6EE7B7]' 
                          : 'text-red-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {kpi.changeType === 'positive' ? 
                        <ArrowUpRight className="h-4 w-4" /> : 
                        <ArrowDownRight className="h-4 w-4" />
                      }
                      <span>{kpi.change}</span>
                    </motion.div>
                    <span className="text-sm text-gray-500">
                      {kpi.description}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Transaction List */}
          <motion.div 
            variants={itemVariants}
            variants={cardHoverVariants}
            whileHover="hover"
            className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 lg:p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg lg:text-xl font-bold text-[#374151]">Transaction</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  className="p-2 text-gray-400 hover:text-[#A78BFA] rounded-lg hover:bg-gray-50"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 space-y-3 max-h-96 overflow-y-auto">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 6,
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="flex items-center justify-between p-3 lg:p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <motion.div
                      className="text-xl lg:text-2xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {transaction.icon}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-[#374151] text-sm">
                        {transaction.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.customer}
                      </p>
                      <p className="text-xs text-gray-400">
                        {transaction.code}
                      </p>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(transaction.status)}`}
                  >
                    {transaction.amount}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Revenue Chart */}
          <motion.div 
            variants={itemVariants}
            variants={cardHoverVariants}
            whileHover="hover"
            className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-[#374151]">Revenue</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#6EE7B7] rounded-full" />
                    <span className="text-sm text-gray-600">Income</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#FDBA74] rounded-full" />
                    <span className="text-sm text-gray-600">Expenses</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                className="p-2 text-gray-400 hover:text-[#A78BFA] rounded-lg hover:bg-gray-50"
              >
                <MoreHorizontal className="h-4 w-4" />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <motion.span 
                  className="text-2xl lg:text-3xl font-bold text-[#374151]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  $193,000
                </motion.span>
                <div className="flex items-center space-x-1 text-[#6EE7B7]">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-semibold">+35% from last month</span>
                </div>
              </div>
              
              <div className="h-40 lg:h-48 flex items-end justify-between space-x-1">
                {[40, 65, 45, 78, 52, 89, 67, 94, 73, 85, 91, 76].map((height, index) => (
                  <div key={index} className="flex flex-col space-y-1 flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="bg-gradient-to-t from-[#6EE7B7] to-[#34D399] rounded-t-lg min-h-[20px] shadow-sm"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height * 0.6}%` }}
                      transition={{ 
                        delay: index * 0.1 + 0.2, 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="bg-gradient-to-t from-[#FDBA74] to-[#FCD34D] rounded-t-lg min-h-[15px] shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Total View Performance */}
          <motion.div 
            variants={itemVariants}
            variants={cardHoverVariants}
            whileHover="hover"
            className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg lg:text-xl font-bold text-[#374151]">
                Total View Performance
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                className="p-2 text-gray-400 hover:text-[#A78BFA] rounded-lg hover:bg-gray-50"
              >
                <MoreHorizontal className="h-4 w-4" />
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <motion.svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-200"
                  />
                  
                  {/* Progress circles */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${68 * 2.51} ${100 * 2.51}`}
                    initial={{ strokeDasharray: "0 251" }}
                    animate={{ strokeDasharray: `${68 * 2.51} ${100 * 2.51}` }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                  
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="32"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${23 * 2.01} ${100 * 2.01}`}
                    initial={{ strokeDasharray: "0 201" }}
                    animate={{ strokeDasharray: `${23 * 2.01} ${100 * 2.01}` }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                  
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="24"
                    fill="none"
                    stroke="url(#gradient3)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${16 * 1.51} ${100 * 1.51}`}
                    initial={{ strokeDasharray: "0 151" }}
                    animate={{ strokeDasharray: `${16 * 1.51} ${100 * 1.51}` }}
                    transition={{ duration: 1.5, delay: 1.3 }}
                  />
                  
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6EE7B7" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FDBA74" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#93C5FD" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.p 
                    className="text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Total Count
                  </motion.p>
                  <motion.p 
                    className="text-xl lg:text-2xl font-bold text-[#374151]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 1.7 }}
                  >
                    565K
                  </motion.p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { label: 'View Count', color: 'bg-[#FDBA74]', percentage: '68%' },
                { label: 'Percentage', color: 'bg-[#6EE7B7]', percentage: '23%' },
                { label: 'Sales', color: 'bg-[#93C5FD]', percentage: '16%' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`} />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#374151]">
                    {item.percentage}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="mt-6 p-4 bg-gradient-to-r from-[#93C5FD]/20 to-[#A78BFA]/20 rounded-xl border border-[#93C5FD]/30"
            >
              <p className="text-sm text-gray-600 mb-2">
                Here are some tips on how to improve your score.
              </p>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white text-sm font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Guide Views
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Sales Report */}
        <motion.div 
          variants={itemVariants}
          variants={cardHoverVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg lg:text-xl font-bold text-[#374151]">Sales Report</h3>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="p-2 text-gray-400 hover:text-[#A78BFA] rounded-lg hover:bg-gray-50"
            >
              <MoreHorizontal className="h-4 w-4" />
            </motion.button>
          </div>
          
          <div className="space-y-6">
            {salesReport.map((item, index) => (
              <motion.div
                key={item.product}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[#374151] font-medium">
                    {item.product} <span className="text-gray-500">{item.count}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ 
                      delay: index * 0.2 + 0.5, 
                      duration: 1.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    className={`h-full rounded-full shadow-sm ${
                      item.color === 'emerald' 
                        ? 'bg-gradient-to-r from-[#6EE7B7] to-[#10B981]' 
                        : 'bg-gradient-to-r from-[#FDBA74] to-[#F59E0B]'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upgrade Card */}
        <motion.div 
          variants={itemVariants}
          variants={cardHoverVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-[#6EE7B7] via-[#34D399] to-[#10B981] rounded-2xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex-1">
              <motion.h3 
                className="text-2xl lg:text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Level up your sales managing to the next level.
              </motion.h3>
              <motion.p 
                className="text-green-100 mb-6 text-base lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                An easy way to manage sales with care and precision.
              </motion.p>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setShowUpgradeModal(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold shadow-lg hover:bg-white/30 transition-all duration-200"
              >
                Update to Siohioma+
              </motion.button>
            </div>
            
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            >
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="h-12 w-12 lg:h-16 lg:w-16 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <StatisticsModal 
        isOpen={showStatisticsModal}
        onClose={() => setShowStatisticsModal(false)}
      />
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}