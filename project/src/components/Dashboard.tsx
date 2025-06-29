import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { DashboardContent } from './DashboardContent';

export function Dashboard() {
  const [isDark, setIsDark] = useLocalStorage('darkMode', false);
  const [activeSection, setActiveSection] = useLocalStorage('activeSection', 'overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage('sidebarCollapsed', false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Apply dark mode class to document
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] transition-colors duration-300">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleToggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={isSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-500 ease-in-out ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        } ml-0`}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Top Navigation */}
        <TopNavbar
          activeSection={activeSection}
          onToggleSidebar={handleToggleSidebar}
          onToggleMobileMenu={handleToggleMobileMenu}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
        />

        {/* Dashboard Content */}
        <main className="min-h-[calc(100vh-5rem)]">
          <DashboardContent activeSection={activeSection} />
        </main>
      </motion.div>
    </div>
  );
}