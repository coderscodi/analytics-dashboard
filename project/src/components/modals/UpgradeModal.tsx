import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Star, Zap, Shield, BarChart3 } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get detailed insights with custom reports and real-time data'
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 premium support with dedicated account manager'
    },
    {
      icon: Zap,
      title: 'Automation Tools',
      description: 'Automate repetitive tasks and streamline your workflow'
    },
    {
      icon: Star,
      title: 'Custom Integrations',
      description: 'Connect with your favorite tools and platforms'
    }
  ];

  const handleUpgrade = () => {
    // Simulate upgrade process
    console.log('Upgrading to Siohioma+...');
    onClose();
  };

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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#6EE7B7] via-[#34D399] to-[#10B981] rounded-t-2xl p-6 text-white overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Upgrade to Siohioma+</h2>
                    <p className="text-green-100">Unlock premium features and boost your productivity</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-4xl font-bold text-[#374151]">$29</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">Billed monthly, cancel anytime</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#374151] mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* What's Included */}
              <div className="bg-[#93C5FD]/20 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-[#374151] mb-4">What's included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Unlimited products',
                    'Advanced reporting',
                    'Priority support',
                    'Custom integrations',
                    'Team collaboration',
                    'Data export'
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <Check className="h-4 w-4 text-[#6EE7B7]" />
                      <span className="text-sm text-[#374151]">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 text-[#374151] bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpgrade}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6EE7B7] to-[#10B981] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Upgrade Now
                </motion.button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                30-day money-back guarantee. No questions asked.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}