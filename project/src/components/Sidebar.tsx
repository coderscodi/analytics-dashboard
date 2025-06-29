import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  Shield,
  ChevronDown,
  ChevronRight,
  Home,
  User,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: number;
  subItems?: { id: string; label: string }[];
}

export function Sidebar({ 
  activeSection, 
  onSectionChange, 
  isCollapsed, 
  isMobileMenuOpen = false,
  onCloseMobileMenu 
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['products']);

  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { 
      id: 'products', 
      label: 'Product', 
      icon: Package,
      subItems: [
        { id: 'all-products', label: 'All Products' },
        { id: 'categories', label: 'Categories' },
        { id: 'inventory', label: 'Inventory' }
      ]
    },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 18 },
    { id: 'transactions', label: 'Transactions', icon: CreditCard }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  const sidebarVariants = {
    expanded: { 
      width: 288,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    collapsed: { 
      width: 80,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isCollapsed ? "collapsed" : "expanded"}
        className="bg-white h-screen fixed left-0 top-0 z-30 shadow-xl border-r border-gray-100 hidden lg:block"
      >
        <div className="p-6">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <h1 className="text-xl font-bold text-[#374151]">
                    Siohioma
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Menu Label */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6"
              >
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  MENU
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (item.subItems) {
                      toggleExpanded(item.id);
                    } else {
                      handleSectionChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                    activeSection === item.id || (item.subItems && expandedItems.includes(item.id))
                      ? 'bg-[#A78BFA]/10 text-[#A78BFA] shadow-sm border border-[#A78BFA]/20'
                      : 'hover:bg-gray-50 text-[#374151] hover:text-[#374151]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="font-medium overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.badge && !isCollapsed && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-[#6EE7B7] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    {item.subItems && !isCollapsed && (
                      <motion.div
                        animate={{ rotate: expandedItems.includes(item.id) ? 90 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>

                {/* Sub Items */}
                <AnimatePresence>
                  {item.subItems && expandedItems.includes(item.id) && !isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-8 mt-2 space-y-1 overflow-hidden"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <motion.button
                          key={subItem.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: subIndex * 0.1 } }}
                          whileHover={{ x: 6, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSectionChange(subItem.id)}
                          className={`w-full text-left p-2.5 rounded-lg text-sm transition-all duration-200 ${
                            activeSection === subItem.id
                              ? 'text-[#A78BFA] bg-[#A78BFA]/10 shadow-sm border border-[#A78BFA]/20'
                              : 'text-gray-500 hover:text-[#374151] hover:bg-gray-50'
                          }`}
                        >
                          {subItem.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* General Section */}
        <div className="px-6 mt-8">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4"
              >
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  GENERAL
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            {[
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'security', label: 'Security', icon: Shield }
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[#A78BFA]/10 text-[#A78BFA] shadow-sm border border-[#A78BFA]/20'
                    : 'hover:bg-gray-50 text-[#374151] hover:text-[#374151]'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom Profile Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6EE7B7] to-[#10B981] rounded-xl flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#374151] truncate">
                      Fandawy Punx
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      fandawy6@gmail.com
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white h-screen fixed left-0 top-0 z-50 w-72 shadow-2xl lg:hidden"
          >
            <div className="p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-[#374151]">Siohioma</h1>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onCloseMobileMenu}
                  className="p-2 text-gray-500 hover:text-[#374151] rounded-lg hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Mobile Menu */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                  >
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (item.subItems) {
                          toggleExpanded(item.id);
                        } else {
                          handleSectionChange(item.id);
                        }
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        activeSection === item.id || (item.subItems && expandedItems.includes(item.id))
                          ? 'bg-[#A78BFA]/10 text-[#A78BFA] shadow-sm border border-[#A78BFA]/20'
                          : 'hover:bg-gray-50 text-[#374151] hover:text-[#374151]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className="bg-[#6EE7B7] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                            {item.badge}
                          </span>
                        )}
                        {item.subItems && (
                          <motion.div
                            animate={{ rotate: expandedItems.includes(item.id) ? 90 : 0 }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>

                    {/* Mobile Sub Items */}
                    <AnimatePresence>
                      {item.subItems && expandedItems.includes(item.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-8 mt-2 space-y-1"
                        >
                          {item.subItems.map((subItem) => (
                            <motion.button
                              key={subItem.id}
                              whileHover={{ x: 6 }}
                              onClick={() => handleSectionChange(subItem.id)}
                              className={`w-full text-left p-2.5 rounded-lg text-sm transition-all duration-200 ${
                                activeSection === subItem.id
                                  ? 'text-[#A78BFA] bg-[#A78BFA]/10 shadow-sm border border-[#A78BFA]/20'
                                  : 'text-gray-500 hover:text-[#374151] hover:bg-gray-50'
                              }`}
                            >
                              {subItem.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile General Section */}
              <div className="mt-8">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  GENERAL
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'settings', label: 'Settings', icon: Settings },
                    { id: 'security', label: 'Security', icon: Shield }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-[#A78BFA]/10 text-[#A78BFA] shadow-sm border border-[#A78BFA]/20'
                          : 'hover:bg-gray-50 text-[#374151] hover:text-[#374151]'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}