import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  User, 
  Plus, 
  Menu,
  Sun,
  Moon,
  LogOut,
  Settings,
  ChevronDown,
  Calendar,
  Share,
  Filter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AddProductModal } from './modals/AddProductModal';
import { NotificationPanel } from './panels/NotificationPanel';

interface TopNavbarProps {
  activeSection: string;
  onToggleSidebar: () => void;
  onToggleMobileMenu: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export function TopNavbar({ 
  activeSection, 
  onToggleSidebar, 
  onToggleMobileMenu,
  isDark, 
  onToggleDark 
}: TopNavbarProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      overview: 'Sales Admin',
      statistics: 'Statistics',
      customers: 'Customers',
      products: 'Products',
      'all-products': 'All Products',
      categories: 'Categories',
      inventory: 'Inventory',
      messages: 'Messages',
      transactions: 'Transactions',
      settings: 'Settings',
      security: 'Security'
    };
    return titles[section] || 'Sales Admin';
  };

  const getSectionDescription = (section: string) => {
    const descriptions: Record<string, string> = {
      overview: 'An easy way to manage sales with care and precision.',
      statistics: 'View detailed analytics and performance metrics',
      customers: 'Manage customer relationships and data',
      products: 'Organize and track your product inventory',
      messages: 'Customer support and communication center',
      transactions: 'Monitor all financial transactions',
      settings: 'Configure system preferences',
      security: 'Manage security and privacy settings'
    };
    return descriptions[section] || 'Manage your business operations';
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20 shadow-sm"
      >
        <div className="flex items-center justify-between h-20 px-4 lg:px-8">
          {/* Left Section */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleMobileMenu}
              className="p-2 text-[#374151] hover:text-[#A78BFA] rounded-lg hover:bg-gray-100 transition-all duration-200 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </motion.button>

            {/* Desktop Sidebar Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSidebar}
              className="p-2 text-[#374151] hover:text-[#A78BFA] rounded-lg hover:bg-gray-100 transition-all duration-200 hidden lg:block"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
            
            <div className="hidden sm:block">
              <motion.h1 
                className="text-xl lg:text-2xl font-bold text-[#374151] flex items-center space-x-2"
                whileHover={{ scale: 1.01 }}
              >
                <span>{getSectionTitle(activeSection)}</span>
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-500 mt-0.5 hidden lg:block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {getSectionDescription(activeSection)}
              </motion.p>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything in Siohioma..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent transition-all duration-300 text-sm text-[#374151]"
              />
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Date Range - Hidden on mobile */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="hidden lg:flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
            >
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-[#374151] font-medium">
                Jan 2024 - May 2024
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </motion.div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-[#374151] hover:text-[#A78BFA] rounded-lg hover:bg-gray-100 transition-all duration-200 hidden sm:block"
              >
                <Filter className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-[#374151] hover:text-[#A78BFA] rounded-lg hover:bg-gray-100 transition-all duration-200 hidden sm:block"
              >
                <Share className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Add New Product Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddProductModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white px-3 lg:px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Product</span>
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleDark}
              className="p-2 text-[#374151] hover:text-[#A78BFA] rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-[#374151] hover:text-[#A78BFA] rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <Bell className="h-4 w-4" />
                <motion.span 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-[#FDBA74] text-white text-xs rounded-full flex items-center justify-center font-semibold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  3
                </motion.span>
              </motion.button>

              <NotificationPanel 
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#6EE7B7] to-[#10B981] rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className="h-3 w-3 text-gray-400 hidden sm:block" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-[#374151] text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(167, 139, 250, 0.05)', x: 4 }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-[#374151] hover:text-[#A78BFA] transition-all duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(248, 113, 113, 0.05)', x: 4 }}
                      onClick={logout}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Modals */}
      <AddProductModal 
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
      />
    </>
  );
}