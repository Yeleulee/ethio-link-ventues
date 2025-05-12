import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { motion } from 'framer-motion';
import { Settings, Bell, Users, FileText, Calendar, Clock, LogOut, MessageCircle, AlertCircle } from 'lucide-react';

export const SimpleDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const [notifications] = useState([
    { id: 1, message: 'Welcome to SIDU Provider!', time: 'Just now', read: false },
    { id: 2, message: 'Your account has been activated', time: '1 hour ago', read: true },
  ]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleDismissError = () => {
    setShowErrorMessage(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo width={32} height={32} className="mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">SIDU Provider</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <Bell size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-accent-green flex items-center justify-center text-white">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                  {currentUser?.email || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error message */}
        {showErrorMessage && (
          <motion.div 
            className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  We're showing you a simplified dashboard while our main dashboard is loading. Full functionality will be available soon!
                </p>
              </div>
              <div className="ml-auto">
                <button 
                  onClick={handleDismissError}
                  className="text-blue-400 hover:text-blue-500"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.nav 
            className="w-full md:w-64 bg-white rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="bg-gradient-to-r from-accent-green to-accent-green/80 rounded-lg p-4 text-white">
                <Logo width={40} height={40} className="mb-2" />
                <h2 className="font-semibold">SIDU Provider</h2>
                <p className="text-xs text-green-50">Your trusted logistics partner</p>
              </div>
            </div>
            
            <div className="p-2">
              <ul className="space-y-1">
                <li>
                  <button 
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'overview' 
                        ? 'bg-accent-green text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <Users size={18} />
                    <span>Overview</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'documents' 
                        ? 'bg-accent-green text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('documents')}
                  >
                    <FileText size={18} />
                    <span>Documents</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'schedule' 
                        ? 'bg-accent-green text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    <Calendar size={18} />
                    <span>Schedule</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'support' 
                        ? 'bg-accent-green text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('support')}
                  >
                    <MessageCircle size={18} />
                    <span>Support</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'settings' 
                        ? 'bg-accent-green text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                </li>
                <li className="pt-4">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </motion.nav>

          {/* Main content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome banner */}
                <div className="bg-gradient-to-r from-accent-green to-accent-green/80 rounded-lg p-6 text-white shadow-sm">
                  <h2 className="text-xl font-semibold mb-2">Welcome to SIDU Provider</h2>
                  <p className="text-green-50 text-sm">
                    Your trusted bridge for logistics, employment matching, and business services. 
                    This simplified dashboard gives you access to essential features while we finish optimizing the main dashboard.
                  </p>
                </div>

                {/* Status cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between mb-4">
                      <div className="text-sm font-medium text-gray-500">Account Status</div>
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Users size={16} className="text-green-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">Active</div>
                    <div className="text-xs text-gray-500">Last login: Today</div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between mb-4">
                      <div className="text-sm font-medium text-gray-500">Documents</div>
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText size={16} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">2</div>
                    <div className="text-xs text-gray-500">Pending review</div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between mb-4">
                      <div className="text-sm font-medium text-gray-500">Recent Activity</div>
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Clock size={16} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">3 mins ago</div>
                    <div className="text-xs text-gray-500">Login successful</div>
                  </div>
                </div>

                {/* Recent notifications */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-700">Recent Notifications</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-6 py-4 flex items-start space-x-3">
                        <div className={`flex-shrink-0 h-3 w-3 rounded-full mt-1 ${notification.read ? 'bg-gray-300' : 'bg-accent-green'}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="px-6 py-4 text-center text-sm text-gray-500">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                <p className="text-gray-500 text-sm mb-4">
                  This section is currently being updated. You will be able to view and manage your documents soon.
                </p>
                <div className="p-8 text-center">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Document management will be available shortly</p>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Your upcoming appointments and scheduled events will appear here.
                </p>
                <div className="p-8 text-center">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No upcoming events scheduled</p>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Support</h3>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Need help with SIDU Provider services? Contact our support team.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Email Support</h4>
                    <p className="text-sm text-gray-600 mb-2">Send us an email and we'll get back to you within 24 hours</p>
                    <a href="mailto:support@siduprovider.com" className="text-accent-green hover:underline text-sm font-medium">
                      support@siduprovider.com
                    </a>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Phone Support</h4>
                    <p className="text-sm text-gray-600 mb-2">Available Monday to Friday, 9 AM - 5 PM</p>
                    <a href="tel:+1234567890" className="text-accent-green hover:underline text-sm font-medium">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Manage your account settings and preferences
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Account Information</h4>
                        <p className="text-sm text-gray-500 mt-1">Update your account details</p>
                      </div>
                      <button className="text-sm text-accent-green font-medium hover:underline">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Password</h4>
                        <p className="text-sm text-gray-500 mt-1">Change your password</p>
                      </div>
                      <button className="text-sm text-accent-green font-medium hover:underline">
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Notifications</h4>
                        <p className="text-sm text-gray-500 mt-1">Manage notification preferences</p>
                      </div>
                      <button className="text-sm text-accent-green font-medium hover:underline">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};