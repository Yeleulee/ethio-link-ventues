import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Ship, 
  PackageOpen, 
  FileText, 
  Clock, 
  Bell, 
  Settings, 
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  Upload,
  Check,
  X,
  Plus,
  Eye,
  Download,
  UserCircle2,
  Briefcase,
  HelpCircle,
  ChevronRight,
  Users,
  Building,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newDocuments, setNewDocuments] = useState<any[]>([]);
  const [filteredStatus, setFilteredStatus] = useState('All Statuses');
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // IMPORTANT: In production, these sample data should be replaced with:
  // 1. API calls to fetch user-specific data from the backend
  // 2. Real-time database queries (e.g., Firestore) to get current user data
  // 3. Data should be filtered to only show items relevant to the current user
  // 4. Implement pagination for large datasets
  // This ensures each user sees only their own shipments, documents, and notifications.

  // Sample data for shipments
  const shipments = [
    { id: 'SHP-2023-001', origin: 'China', destination: 'Ethiopia', status: 'In Transit', eta: '2023-05-20', type: 'Sea Freight' },
    { id: 'SHP-2023-002', origin: 'UAE', destination: 'Ethiopia', status: 'Customs Clearance', eta: '2023-05-18', type: 'Air Freight' },
    { id: 'SHP-2023-003', origin: 'USA', destination: 'Ethiopia', status: 'Delivered', eta: '2023-05-15', type: 'Air Freight' },
    { id: 'SHP-2023-004', origin: 'Kenya', destination: 'Ethiopia', status: 'Processing', eta: '2023-05-25', type: 'Road Freight' },
    { id: 'SHP-2023-005', origin: 'Italy', destination: 'Ethiopia', status: 'In Transit', eta: '2023-05-22', type: 'Sea Freight' },
  ];

  // Sample data for documents
  const documents = [
    { id: 'DOC-2023-001', name: 'Commercial Invoice.pdf', status: 'Approved', date: '2023-05-10', url: 'https://example.com/documents/commercial-invoice.pdf', size: '245 KB' },
    { id: 'DOC-2023-002', name: 'Bill of Lading.pdf', status: 'Pending', date: '2023-05-12', url: 'https://example.com/documents/bill-of-lading.pdf', size: '320 KB' },
    { id: 'DOC-2023-003', name: 'Customs Declaration.pdf', status: 'Needs Revision', date: '2023-05-14', url: 'https://example.com/documents/customs-declaration.pdf', size: '180 KB' },
    { id: 'DOC-2023-004', name: 'Import Permit.pdf', status: 'Approved', date: '2023-05-08', url: 'https://example.com/documents/import-permit.pdf', size: '198 KB' },
    { id: 'DOC-2023-005', name: 'Packing List.pdf', status: 'Pending', date: '2023-05-15', url: 'https://example.com/documents/packing-list.pdf', size: '215 KB' },
  ];

  // Sample data for notifications
  const notifications = [
    { id: 1, message: 'Shipment SHP-2023-001 has cleared customs', time: '2 hours ago', read: false },
    { id: 2, message: 'New document uploaded: Import Permit', time: '1 day ago', read: true },
    { id: 3, message: 'Quote request approved', time: '2 days ago', read: true },
    { id: 4, message: 'Shipment SHP-2023-005 has departed from origin port', time: '3 hours ago', read: false },
    { id: 5, message: 'Document DOC-2023-003 needs revision', time: '5 hours ago', read: false },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadingFile(true);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadingFile(false);
            setUploadProgress(0);
            
            // Add the uploaded file to newDocuments
            const file = e.target.files![0];
            const newDoc = {
              id: `DOC-${Date.now()}`,
              name: file.name,
              status: 'Pending',
              date: new Date().toISOString().split('T')[0],
              size: (file.size / 1024).toFixed(2) + ' KB',
              url: URL.createObjectURL(file)
            };
            
            setNewDocuments(prev => [...prev, newDoc]);
          }, 500);
        }
      }, 300);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleViewDocument = (doc: any) => {
    setViewingDocument(doc);
    setShowDocumentModal(true);
  };
  
  const handleDownloadDocument = (doc: any) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const getFilteredDocuments = () => {
    const allDocs = [...documents, ...newDocuments];
    if (filteredStatus === 'All Statuses') {
      return allDocs;
    } else if (filteredStatus === 'Pending') {
      return allDocs.filter(doc => doc.status === 'Pending');
    } else if (filteredStatus === 'Approved') {
      return allDocs.filter(doc => doc.status === 'Approved');
    } else if (filteredStatus === 'Needs Revision') {
      return allDocs.filter(doc => doc.status === 'Needs Revision');
    }
    return allDocs;
  };

  // Helper function to get status badge styling
  const getStatusBadgeClasses = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-purple-100 text-purple-800';
      case 'Customs Clearance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Needs Revision':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome banner */}
            <motion.div 
              className="bg-gradient-to-r from-navy-800 to-indigo-900 rounded-xl p-6 text-white shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to SIDU™ Provider Dashboard</h2>
                  <p className="text-gray-200 max-w-2xl">
                    Your trusted bridge for logistics, employment matching, and business services. 
                    Monitor your operations, track shipments, and manage documents all in one place.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-white text-navy-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Quick Guide
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Key stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-blue-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Shipments</p>
                    <h3 className="text-2xl font-bold text-gray-900">{shipments.filter(s => s.status !== 'Delivered').length}</h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Ship className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-blue-600 font-medium">12% more</span>
                    <span className="text-gray-500 ml-1">than last month</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-yellow-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pending Documents</p>
                    <h3 className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === 'Pending').length}</h3>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <FileText className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-gray-500">Oldest deadline: 2 days</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-green-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Completed Services</p>
                    <h3 className="text-2xl font-bold text-gray-900">24</h3>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">18% increase</span>
                    <span className="text-gray-500 ml-1">this quarter</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Cost Savings</p>
                    <h3 className="text-2xl font-bold text-gray-900">$2,450</h3>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <BarChart3 className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-purple-600 font-medium">$850</span>
                    <span className="text-gray-500 ml-1">in customs fees</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Recent activity and shipments */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <motion.div 
                className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Shipments</h3>
                  <button 
                    onClick={() => setActiveTab('shipments')}
                    className="text-sm text-blue-600 font-medium hover:underline flex items-center"
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {shipments.slice(0, 4).map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-gray-50">
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.id}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{shipment.origin} → {shipment.destination}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{shipment.type}</td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(shipment.status)}`}>
                              {shipment.status}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{shipment.eta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.div 
                className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className="text-sm text-blue-600 font-medium hover:underline flex items-center"
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {notifications.slice(0, 4).map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-l-4 rounded-r-lg ${notification.read ? 'border-gray-300 bg-gray-50' : 'border-blue-600 bg-blue-50'}`}
                    >
                      <div className="flex items-start">
                        <Bell className={`h-5 w-5 mr-3 ${notification.read ? 'text-gray-400' : 'text-blue-600'}`} />
                        <div>
                          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Service categories */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">SIDU Provider Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <Users className="h-8 w-8 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Employee-Employer Matching</h4>
                  <p className="text-sm text-gray-600">Connect with skilled workers for your needs</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <Truck className="h-8 w-8 text-green-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Delivery Coordination</h4>
                  <p className="text-sm text-gray-600">Fast, safe logistics solutions</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <Building className="h-8 w-8 text-yellow-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Business Promotion</h4>
                  <p className="text-sm text-gray-600">Boost your brand visibility</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <FileText className="h-8 w-8 text-purple-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Document Handling</h4>
                  <p className="text-sm text-gray-600">Streamline your document processes</p>
                </div>
              </div>
            </motion.div>
          </div>
        );
      case 'shipments':
        return (
          <div className="space-y-6">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Shipment Tracker</h2>
                  <p className="text-gray-600">Track and manage all your shipments through SIDU™ Provider</p>
                </div>
                <button className="mt-3 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  New Shipment
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Stats overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Shipments</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{shipments.length}</p>
                      </div>
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <PackageOpen className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">In Transit</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{shipments.filter(s => s.status === 'In Transit').length}</p>
                      </div>
                      <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Ship className="h-5 w-5 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Customs</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{shipments.filter(s => s.status === 'Customs Clearance').length}</p>
                      </div>
                      <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Delivered</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{shipments.filter(s => s.status === 'Delivered').length}</p>
                      </div>
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Search and filter bar */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="Search shipments by ID, origin, destination..."
                      className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex space-x-2">
                    <select className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                      <option>All Statuses</option>
                      <option>In Transit</option>
                      <option>Customs Clearance</option>
                      <option>Delivered</option>
                      <option>Processing</option>
                    </select>
                    <select className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                      <option>All Types</option>
                      <option>Sea Freight</option>
                      <option>Air Freight</option>
                      <option>Road Freight</option>
                    </select>
                  </div>
                </div>

                {/* Shipment tables */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                          <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shipments.map((shipment, index) => (
                          <motion.tr 
                            key={shipment.id} 
                            className="hover:bg-gray-50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{shipment.id}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{shipment.origin}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{shipment.destination}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {shipment.type === 'Sea Freight' && (
                                  <svg className="h-4 w-4 text-blue-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                  </svg>
                                )}
                                {shipment.type === 'Air Freight' && (
                                  <svg className="h-4 w-4 text-blue-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                  </svg>
                                )}
                                {shipment.type === 'Road Freight' && (
                                  <svg className="h-4 w-4 text-blue-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                  </svg>
                                )}
                                <span className="text-sm text-gray-700">{shipment.type}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(shipment.status)}`}>
                                {shipment.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{shipment.eta}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                              <div className="flex justify-center space-x-2">
                                <button 
                                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors"
                                  title="View details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors"
                                  title="Track shipment"
                                >
                                  <Ship className="w-4 h-4" />
                                </button>
                                <button 
                                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors"
                                  title="View documents"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Previous</button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{shipments.length}</span> of <span className="font-medium">{shipments.length}</span> results
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Previous</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Next</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipment tracking detail - You can keep this section or modify it as needed */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Shipment Details: SHP-2023-001</h3>
                  <p className="text-gray-600 text-sm mt-1">Tracking your shipment's journey</p>
                </div>
                <div className="mt-3 md:mt-0">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClasses('Customs Clearance')}`}>
                    Customs Clearance
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div>
                  <span className="text-xs font-medium text-gray-500">Shipment Type</span>
                  <p className="text-sm font-medium text-gray-900 flex items-center mt-1">
                    <svg className="h-4 w-4 text-blue-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                    Sea Freight
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Carrier</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">Ethio Express</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Current Location</span>
                  <p className="text-sm font-medium text-blue-600 mt-1">Bole International Airport</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Estimated Delivery</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">May 20, 2023</p>
                </div>
              </div>
              
              {/* Timeline */}
              <div className="relative mb-6">
                <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
                <ul className="space-y-6">
                  <li className="relative">
                    <div className="flex items-start">
                      <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-gray-500 text-right pr-4">Today</div>
                      <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-blue-600 border-4 border-white ring-4 ring-blue-100 z-10"></div>
                      <div className="flex-1 pt-0.5">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <h4 className="text-sm font-medium text-gray-900">In Customs Clearance</h4>
                          <p className="text-xs text-gray-600">Your shipment has arrived at Bole International Airport and is undergoing customs clearance procedures.</p>
                          <p className="text-xs text-gray-500 mt-1">May 15, 2023 • 08:45 AM</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative">
                    <div className="flex items-start">
                      <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-gray-500 text-right pr-4">May 12</div>
                      <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-gray-300 border-4 border-white z-10"></div>
                      <div className="flex-1 pt-0.5">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-gray-900">In Transit</h4>
                          <p className="text-xs text-gray-600">Your shipment has departed from Shanghai International Airport and is en route to Ethiopia.</p>
                          <p className="text-xs text-gray-500 mt-1">May 12, 2023 • 22:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative">
                    <div className="flex items-start">
                      <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-gray-500 text-right pr-4">May 10</div>
                      <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-gray-300 border-4 border-white z-10"></div>
                      <div className="flex-1 pt-0.5">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-gray-900">Processing at Origin</h4>
                          <p className="text-xs text-gray-600">Your shipment has been processed and is waiting for departure at Shanghai International Airport.</p>
                          <p className="text-xs text-gray-500 mt-1">May 10, 2023 • 15:20 PM</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative">
                    <div className="flex items-start">
                      <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-gray-500 text-right pr-4">May 08</div>
                      <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-gray-300 border-4 border-white z-10"></div>
                      <div className="flex-1 pt-0.5">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-gray-900">Shipment Created</h4>
                          <p className="text-xs text-gray-600">Your shipment has been registered in our system and is waiting for pickup.</p>
                          <p className="text-xs text-gray-500 mt-1">May 08, 2023 • 09:15 AM</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Related documents */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Related Documents</h3>
                  <button 
                    onClick={() => setActiveTab('documents')}
                    className="text-sm text-blue-600 font-medium hover:underline flex items-center"
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Bill of Lading.pdf</p>
                      <p className="text-xs text-gray-500">Added on May 12, 2023</p>
                    </div>
                    <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Commercial Invoice.pdf</p>
                      <p className="text-xs text-gray-500">Added on May 10, 2023</p>
                    </div>
                    <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-6">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Document Management</h2>
                  <p className="text-gray-600">Upload, view and manage all your trade documents with SIDU™ Provider</p>
                </div>
                <button 
                  onClick={triggerFileInput}
                  className="mt-3 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Document
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
              
              {uploadingFile && (
                <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Uploading document...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Processing...</span>
                    <span className="text-xs text-gray-500">{uploadProgress}%</span>
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-center md:text-left md:flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Drop files here or click to upload</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Support for PDF, Word documents, and images (max 10MB)
                    </p>
                    <button 
                      onClick={triggerFileInput}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Document categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">All Documents</h4>
                      <p className="text-xs text-gray-500">
                        {[...documents, ...newDocuments].length} total documents
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Approved</h4>
                      <p className="text-xs text-gray-500">
                        {[...documents, ...newDocuments].filter(doc => doc.status === 'Approved').length} approved documents
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-600 h-1.5 rounded-full" 
                      style={{ 
                        width: `${([...documents, ...newDocuments].filter(doc => doc.status === 'Approved').length / [...documents, ...newDocuments].length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Pending</h4>
                      <p className="text-xs text-gray-500">
                        {[...documents, ...newDocuments].filter(doc => doc.status === 'Pending').length} pending documents
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-yellow-500 h-1.5 rounded-full" 
                      style={{ 
                        width: `${([...documents, ...newDocuments].filter(doc => doc.status === 'Pending').length / [...documents, ...newDocuments].length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Document list */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">Document Library</h4>
                  <div className="flex items-center">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search documents..." 
                        className="text-sm border border-gray-300 rounded-lg py-1.5 pl-8 pr-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
                      />
                      <svg className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <select 
                      className="ml-2 text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filteredStatus}
                      onChange={(e) => setFilteredStatus(e.target.value)}
                    >
                      <option>All Statuses</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Needs Revision</option>
                    </select>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {getFilteredDocuments().map((doc, index) => (
                    <motion.div 
                      key={doc.id} 
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex items-center mb-3 sm:mb-0">
                          <div className="p-2 bg-gray-100 rounded-lg mr-3 flex-shrink-0">
                            {doc.name.endsWith('.pdf') && <FileText className="h-6 w-6 text-red-500" />}
                            {doc.name.endsWith('.doc') || doc.name.endsWith('.docx') && <FileText className="h-6 w-6 text-blue-500" />}
                            {(doc.name.endsWith('.jpg') || doc.name.endsWith('.jpeg') || doc.name.endsWith('.png')) && (
                              <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                            {!doc.name.match(/\.(pdf|doc|docx|jpg|jpeg|png)$/i) && <FileText className="h-6 w-6 text-gray-500" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">Added on {doc.date} {doc.size && `• ${doc.size}`}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end">
                          <span className={`mr-4 px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(doc.status)}`}>
                            {doc.status}
                          </span>
                          
                          <div className="flex">
                            <button 
                              onClick={() => handleViewDocument(doc)}
                              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors flex items-center mr-1"
                              title="View document"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              <span className="text-xs hidden sm:inline">View</span>
                            </button>
                            <button 
                              onClick={() => handleDownloadDocument(doc)}
                              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors flex items-center"
                              title="Download document"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              <span className="text-xs hidden sm:inline">Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {getFilteredDocuments().length === 0 && (
                    <div className="p-8 text-center">
                      <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 mb-2">No documents with the selected status</p>
                      <button 
                        onClick={triggerFileInput}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm inline-flex items-center"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </button>
                    </div>
                  )}
                </div>
                
                {getFilteredDocuments().length > 0 && (
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{getFilteredDocuments().length}</span> documents
                    </p>
                    {getFilteredDocuments().length > 5 && (
                      <button className="text-sm text-blue-600 font-medium hover:underline">
                        Load More
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Notifications</h2>
                  <p className="text-gray-600">Stay updated with your shipments, documents, and SIDU™ Provider services</p>
                </div>
                <div className="mt-3 md:mt-0 flex items-center">
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    Mark All as Read
                  </button>
                  <button className="ml-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Recent Activity</h3>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {notifications.filter(n => !n.read).length} unread
                  </span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification, index) => (
                    <motion.div 
                      key={notification.id} 
                      className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <div className="flex">
                        <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'} mr-3 flex-shrink-0`}>
                          <Bell className={`h-5 w-5 ${notification.read ? 'text-gray-500' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-gray-500">{notification.time}</p>
                            {!notification.read && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <button className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {notifications.length === 0 && (
                    <div className="p-8 text-center">
                      <Bell className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">No notifications at this time</p>
                    </div>
                  )}
                </div>
                
                {notifications.length > 0 && (
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-center">
                    <button className="text-sm text-blue-600 font-medium hover:underline">
                      View All Activity
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                      <p className="text-xs text-gray-500 mt-1">Receive updates about your shipments and documents</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                      <input 
                        type="checkbox" 
                        id="email-notifications"
                        className="absolute opacity-0 w-0 h-0"
                        defaultChecked
                      />
                      <label 
                        htmlFor="email-notifications"
                        className="block w-12 h-6 rounded-full bg-blue-600 cursor-pointer transition-colors"
                      >
                        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS Alerts</p>
                      <p className="text-xs text-gray-500 mt-1">Get text messages for urgent updates</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                      <input 
                        type="checkbox" 
                        id="sms-alerts"
                        className="absolute opacity-0 w-0 h-0"
                      />
                      <label 
                        htmlFor="sms-alerts"
                        className="block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors"
                      >
                        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Desktop Notifications</p>
                      <p className="text-xs text-gray-500 mt-1">Show notifications on your desktop</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                      <input 
                        type="checkbox" 
                        id="desktop-notifications"
                        className="absolute opacity-0 w-0 h-0"
                        defaultChecked
                      />
                      <label 
                        htmlFor="desktop-notifications"
                        className="block w-12 h-6 rounded-full bg-blue-600 cursor-pointer transition-colors"
                      >
                        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">Account Settings</h2>
              <p className="mb-6 text-gray-600">Manage your SIDU™ Provider account preferences and profile information</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-white">
                          {currentUser?.email?.charAt(0).toUpperCase() || 'S'}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {currentUser?.email?.split('@')[0] || 'SIDU User'}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{currentUser?.email || 'user@example.com'}</p>
                      <button className="text-sm text-blue-600 font-medium hover:underline inline-flex items-center">
                        <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Change Avatar
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="h-4 w-4 text-blue-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Account Status
                    </h4>
                    <div className="flex items-center mb-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">75%</span>
                    </div>
                    <p className="text-xs text-gray-600">Complete your profile to unlock all features</p>
                    <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Complete Profile
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your full name"
                            defaultValue={currentUser?.email?.split('@')[0] || ''}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                            value={currentUser?.email || ''}
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your company name"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your business address"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-500">Receive updates about your shipments</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                            <input 
                              type="checkbox" 
                              id="settings-email-notifications"
                              className="absolute opacity-0 w-0 h-0"
                              defaultChecked
                            />
                            <label 
                              htmlFor="settings-email-notifications"
                              className="block w-12 h-6 rounded-full bg-blue-600 cursor-pointer transition-colors"
                            >
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                            <p className="text-sm text-gray-500">Get text messages for urgent updates</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                            <input 
                              type="checkbox" 
                              id="settings-sms-alerts"
                              className="absolute opacity-0 w-0 h-0"
                            />
                            <label 
                              htmlFor="settings-sms-alerts"
                              className="block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors"
                            >
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Enhanced security for your account</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                            <input 
                              type="checkbox" 
                              id="settings-two-factor"
                              className="absolute opacity-0 w-0 h-0"
                            />
                            <label 
                              htmlFor="settings-two-factor"
                              className="block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors"
                            >
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                <div className="space-y-4">
                  <button className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <svg className="h-4 w-4 text-blue-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Change Password
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">Update your account password</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <svg className="h-4 w-4 text-blue-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Manage Connected Accounts
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">Control which services have access</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex justify-between items-center p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left">
                    <div>
                      <h4 className="font-medium text-red-600 flex items-center">
                        <svg className="h-4 w-4 text-red-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Account
                      </h4>
                      <p className="text-sm text-red-500 mt-1">Permanently remove your account and data</p>
                    </div>
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  // Document Viewer Modal
  const DocumentViewerModal = () => {
    if (!showDocumentModal || !viewingDocument) return null;

    // Determine document type to render appropriate viewer
    const fileExtension = viewingDocument.name.split('.').pop()?.toLowerCase();
    const isPdf = fileExtension === 'pdf';
    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
    const isDoc = ['doc', 'docx'].includes(fileExtension);

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-accent-green mr-2" />
              <h3 className="font-medium text-lg text-charcoal-900">{viewingDocument.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleDownloadDocument(viewingDocument)}
                className="flex items-center px-3 py-1.5 bg-accent-green text-white rounded-lg hover:bg-accent-green/90 transition-colors text-sm"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Download
              </button>
              <button 
                onClick={() => setShowDocumentModal(false)}
                className="text-charcoal-500 hover:text-charcoal-900 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            {isPdf && (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-2 bg-gray-100 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <button className="p-1 hover:bg-gray-200 rounded-md mr-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded-md mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <span className="text-sm">Page 1 of 3</span>
                  </div>
                  <div>
                    <button className="p-1 hover:bg-gray-200 rounded-md">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 min-h-[60vh] flex items-center justify-center">
                  {/* Embed PDF viewer */}
                  <iframe 
                    src={viewingDocument.url} 
                    className="w-full h-[60vh]"
                    title={viewingDocument.name}
                  />
                </div>
              </div>
            )}
            
            {isImage && (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-2 bg-gray-100 border-b">
                  <span className="text-sm">{viewingDocument.name}</span>
                </div>
                <div className="bg-gray-800 p-4 min-h-[60vh] flex items-center justify-center">
                  <img 
                    src={viewingDocument.url} 
                    alt={viewingDocument.name} 
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                </div>
              </div>
            )}
            
            {!isPdf && !isImage && (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">Document Preview</h3>
                <p className="text-charcoal-600 mb-6">This file type cannot be previewed directly in the browser.</p>
                <button 
                  onClick={() => handleDownloadDocument(viewingDocument)}
                  className="inline-flex items-center px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-accent-green/90 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download to View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-4 bg-navy-800 text-white text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-navy-800">
                    {currentUser?.email?.charAt(0).toUpperCase() || 'S'}
                  </span>
                </div>
                <h3 className="font-medium">{currentUser?.email?.split('@')[0] || 'SIDU User'}</h3>
                <p className="text-xs text-gray-300 mt-1">Business Account</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'overview' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('overview')}
                    >
                      <LayoutDashboard className="h-5 w-5 mr-3" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'shipments' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('shipments')}
                    >
                      <Ship className="h-5 w-5 mr-3" />
                      Shipments
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'documents' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('documents')}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      Documents
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'notifications' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      Notifications
                      {notifications.filter(n => !n.read).length > 0 && (
                        <span className="ml-auto bg-red-500 text-xs text-white font-bold px-2 py-0.5 rounded-full">
                          {notifications.filter(n => !n.read).length}
                        </span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'settings' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
              
              <div className="border-t border-gray-200 p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
                    Support Center
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold mb-2">Fast & Trusted Support</h3>
              <p className="text-sm opacity-90 mb-4">SIDU™ Provider is ready to assist with your business and logistics needs</p>
              <button className="w-full py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
      
      {/* Document Viewer Modal */}
      <DocumentViewerModal />
    </div>
  );
}; 