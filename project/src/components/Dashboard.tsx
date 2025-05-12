import React, { useState, useRef, useEffect } from 'react';
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
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getUserShipments, 
  getUserDocuments, 
  getUserNotifications,
  createDocument,
  markNotificationAsRead,
  Shipment,
  Document as DocumentType,
  Notification as NotificationType
} from '../services/database';

export const Dashboard: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [newDocuments, setNewDocuments] = useState<DocumentType[]>([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [filteredStatus, setFilteredStatus] = useState('All Statuses');
  const [viewingDocument, setViewingDocument] = useState<DocumentType | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          setDataLoading(true);
          
          // Fetch user's shipments, documents, and notifications in parallel
          const [userShipments, userDocuments, userNotifications] = await Promise.all([
            getUserShipments(currentUser.uid),
            getUserDocuments(currentUser.uid),
            getUserNotifications(currentUser.uid)
          ]);
          
          setShipments(userShipments);
          setDocuments(userDocuments);
          setNotifications(userNotifications);
        } catch (error) {
          console.error('Error loading user data:', error);
          // Fallback to sample data if there's an error
          setShipments(sampleShipments);
          setDocuments(sampleDocuments);
          setNotifications(sampleNotifications);
        } finally {
          setDataLoading(false);
        }
      };
      
      fetchUserData();
    }
  }, [currentUser]);

  // Sample data for fallback
  const sampleShipments = [
    { id: 'SHP-2023-001', userId: '', origin: 'China', destination: 'Ethiopia', status: 'In Transit', eta: '2023-05-20', type: 'Sea Freight', createdAt: new Date(), updatedAt: new Date() },
    { id: 'SHP-2023-002', userId: '', origin: 'UAE', destination: 'Ethiopia', status: 'Customs Clearance', eta: '2023-05-18', type: 'Air Freight', createdAt: new Date(), updatedAt: new Date() },
    { id: 'SHP-2023-003', userId: '', origin: 'USA', destination: 'Ethiopia', status: 'Delivered', eta: '2023-05-15', type: 'Air Freight', createdAt: new Date(), updatedAt: new Date() },
  ];

  const sampleDocuments = [
    { id: 'DOC-2023-001', userId: '', name: 'Commercial Invoice.pdf', status: 'Approved', date: '2023-05-10', url: 'https://example.com/documents/commercial-invoice.pdf', size: '245 KB', createdAt: new Date() },
    { id: 'DOC-2023-002', userId: '', name: 'Bill of Lading.pdf', status: 'Pending', date: '2023-05-12', url: 'https://example.com/documents/bill-of-lading.pdf', size: '320 KB', createdAt: new Date() },
    { id: 'DOC-2023-003', userId: '', name: 'Customs Declaration.pdf', status: 'Needs Revision', date: '2023-05-14', url: 'https://example.com/documents/customs-declaration.pdf', size: '180 KB', createdAt: new Date() },
  ];

  const sampleNotifications = [
    { id: '1', userId: '', message: 'Shipment SHP-2023-001 has cleared customs', time: '2 hours ago', read: false, createdAt: new Date() },
    { id: '2', userId: '', message: 'New document uploaded: Import Permit', time: '1 day ago', read: true, createdAt: new Date() },
    { id: '3', userId: '', message: 'Quote request approved', time: '2 days ago', read: true, createdAt: new Date() },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && currentUser) {
      setUploadingFile(true);
      const file = e.target.files[0];
      
      // Create a URL for the file
      const fileUrl = URL.createObjectURL(file);
      
      // Simulate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          
          // Create document in Firestore
          const createDocumentInDb = async () => {
            try {
              // In a real app, you would upload to Firebase Storage and get a URL
              const documentData = {
                userId: currentUser.uid,
                name: file.name,
                status: 'Pending',
                date: new Date().toISOString().split('T')[0],
                size: (file.size / 1024).toFixed(2) + ' KB',
                url: fileUrl
              };
              
              const docId = await createDocument(documentData);
              
              // Create new document object
              const newDoc: DocumentType = {
                id: docId,
                ...documentData,
                createdAt: new Date()
              };
              
              // Add to both lists
              setNewDocuments(prev => [...prev, newDoc]);
              setDocuments(prev => [...prev, newDoc]);
              
              setUploadingFile(false);
              setUploadProgress(0);
            } catch (error) {
              console.error('Error creating document:', error);
              setUploadingFile(false);
              setUploadProgress(0);
            }
          };
          
          createDocumentInDb();
        }
      }, 300);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleViewDocument = (doc: DocumentType) => {
    setViewingDocument(doc);
    setShowDocumentModal(true);
  };
  
  const handleDownloadDocument = (doc: DocumentType) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReadNotification = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      // Update the local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent-green hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal-500 mb-1">Active Shipments</p>
                  <h3 className="text-2xl font-bold text-charcoal-900">2</h3>
                </div>
                <div className="p-3 bg-accent-green/10 rounded-lg">
                  <Ship className="h-6 w-6 text-accent-green" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-accent-green mr-1" />
                  <span className="text-accent-green font-medium">12% more</span>
                  <span className="text-charcoal-500 ml-1">than last month</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent-yellow hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal-500 mb-1">Pending Documents</p>
                  <h3 className="text-2xl font-bold text-charcoal-900">3</h3>
                </div>
                <div className="p-3 bg-accent-yellow/10 rounded-lg">
                  <FileText className="h-6 w-6 text-accent-yellow" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-accent-yellow mr-1" />
                  <span className="text-charcoal-500">Oldest deadline: 2 days</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal-500 mb-1">Cost Savings</p>
                  <h3 className="text-2xl font-bold text-charcoal-900">$2,450</h3>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <BarChart3 className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-blue-500 font-medium">$850</span>
                  <span className="text-charcoal-500 ml-1">in customs fees</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="md:col-span-2 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-charcoal-900">Recent Shipments</h3>
                <button className="text-sm text-accent-green font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Route</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Type</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">ETA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-charcoal-900">{shipment.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-charcoal-700">{shipment.origin} → {shipment.destination}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-charcoal-700">{shipment.type}</td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-charcoal-700">{shipment.eta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-charcoal-900">Documents</h3>
                <button 
                  onClick={() => setActiveTab('documents')}
                  className="text-sm text-accent-green font-medium hover:underline flex items-center"
                >
                  <Upload className="h-3.5 w-3.5 mr-1" />
                  Upload New
                </button>
              </div>
              <div className="space-y-3">
                {[...documents, ...newDocuments.slice(0, 2)].slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-gray-100 rounded mr-3">
                      <FileText className="h-5 w-5 text-charcoal-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal-900">{doc.name}</p>
                      <p className="text-xs text-charcoal-500">{doc.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      case 'shipments':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-charcoal-900 mb-4">Shipment Tracker</h2>
            <p className="mb-6 text-charcoal-600">Track and manage all your shipments in one place</p>
            
            <div className="space-y-6">
              {/* Search and filter bar */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Search shipments..."
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-1 focus:ring-accent-green focus:border-accent-green"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex space-x-2">
                  <select className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-accent-green focus:border-accent-green text-sm">
                    <option>All Statuses</option>
                    <option>In Transit</option>
                    <option>Customs Clearance</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>

              {/* Shipment tables */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Origin</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Destination</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Type</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">ETA</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-charcoal-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-charcoal-900">{shipment.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-charcoal-700">{shipment.origin}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-charcoal-700">{shipment.destination}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-charcoal-700">{shipment.type}</td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-charcoal-700">{shipment.eta}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            <button 
                              className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-accent-green transition-colors"
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Shipment tracking detail */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-charcoal-900 mb-4">Shipment Details: SHP-2023-001</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-xs font-medium text-charcoal-500">Shipment Type</span>
                    <p className="text-sm font-medium text-charcoal-900">Sea Freight</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-charcoal-500">Carrier</span>
                    <p className="text-sm font-medium text-charcoal-900">Ethio Express</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-charcoal-500">Current Status</span>
                    <p className="text-sm font-medium text-accent-green">Customs Clearance</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-charcoal-500">Estimated Delivery</span>
                    <p className="text-sm font-medium text-charcoal-900">May 20, 2023</p>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
                  <ul className="space-y-6">
                    <li className="relative">
                      <div className="flex items-start">
                        <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-charcoal-500 text-right pr-4">Today</div>
                        <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-accent-green border-4 border-white ring-4 ring-accent-green/20 z-10"></div>
                        <div className="flex-1 pt-0.5">
                          <div className="bg-accent-green/5 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-charcoal-900">In Customs Clearance</h4>
                            <p className="text-xs text-charcoal-600">Your shipment has arrived at Bole International Airport and is undergoing customs clearance procedures.</p>
                            <p className="text-xs text-charcoal-500 mt-1">May 15, 2023 • 08:45 AM</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="relative">
                      <div className="flex items-start">
                        <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-charcoal-500 text-right pr-4">May 12</div>
                        <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-gray-300 border-4 border-white z-10"></div>
                        <div className="flex-1 pt-0.5">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-charcoal-900">In Transit</h4>
                            <p className="text-xs text-charcoal-600">Your shipment has departed from Shanghai International Airport and is en route to Ethiopia.</p>
                            <p className="text-xs text-charcoal-500 mt-1">May 12, 2023 • 22:30 PM</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="relative">
                      <div className="flex items-start">
                        <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-charcoal-500 text-right pr-4">May 10</div>
                        <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-gray-300 border-4 border-white z-10"></div>
                        <div className="flex-1 pt-0.5">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-charcoal-900">Processing at Origin</h4>
                            <p className="text-xs text-charcoal-600">Your shipment has been processed and is waiting for departure at Shanghai International Airport.</p>
                            <p className="text-xs text-charcoal-500 mt-1">May 10, 2023 • 15:20 PM</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="relative">
                      <div className="flex items-start">
                        <div className="absolute left-0 mt-1.5 w-14 text-xs font-medium text-charcoal-500 text-right pr-4">May 08</div>
                        <div className="flex-shrink-0 ml-14 mr-3 h-4 w-4 rounded-full bg-gray-300 border-4 border-white z-10"></div>
                        <div className="flex-1 pt-0.5">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-charcoal-900">Shipment Created</h4>
                            <p className="text-xs text-charcoal-600">Your shipment has been registered in our system and is waiting for pickup.</p>
                            <p className="text-xs text-charcoal-500 mt-1">May 08, 2023 • 09:15 AM</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Related documents */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-charcoal-900 mb-4">Related Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 bg-gray-100 rounded mr-3">
                        <FileText className="h-5 w-5 text-charcoal-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal-900">Bill of Lading.pdf</p>
                        <p className="text-xs text-charcoal-500">Added on May 12, 2023</p>
                      </div>
                      <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 bg-gray-100 rounded mr-3">
                        <FileText className="h-5 w-5 text-charcoal-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal-900">Commercial Invoice.pdf</p>
                        <p className="text-xs text-charcoal-500">Added on May 10, 2023</p>
                      </div>
                      <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <h2 className="text-xl font-bold text-charcoal-900 mb-2">Document Management</h2>
              <p className="mb-6 text-charcoal-600">Upload, view and manage all your trade documents</p>
              
              <div className="mb-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={triggerFileInput}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-charcoal-900 mb-1">Drop files here or click to upload</h3>
                  <p className="text-sm text-charcoal-600">
                    Support for PDF, Word documents, and images
                  </p>
                </div>
                
                {uploadingFile && (
                  <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-accent-green mr-2" />
                      <span className="text-sm font-medium">Uploading document...</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-accent-green h-2.5 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-3">Your Documents</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center bg-accent-green/10 p-4">
                      <FileText className="h-6 w-6 text-accent-green" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-charcoal-900">Trade Documents</h4>
                          <p className="text-xs text-charcoal-500 mt-1">Invoices, bills of lading, permits</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">5 files</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center bg-yellow-100 p-4">
                      <FileText className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-charcoal-900">Shipping Documents</h4>
                          <p className="text-xs text-charcoal-500 mt-1">Packing lists, declarations</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">3 files</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h4 className="font-medium text-charcoal-900">All Documents</h4>
                    <div>
                      <select 
                        className="text-sm border border-gray-300 rounded-lg px-2 py-1"
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
                    {getFilteredDocuments().map((doc) => (
                      <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 bg-gray-100 rounded-lg mr-3">
                              <FileText className="h-5 w-5 text-charcoal-700" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-charcoal-900">{doc.name}</p>
                              <p className="text-xs text-charcoal-500">Added on {doc.date} {doc.size && `• ${doc.size}`}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <span className={`mr-4 px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(doc.status)}`}>
                              {doc.status}
                            </span>
                            
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleViewDocument(doc)}
                                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-accent-green transition-colors"
                                title="View document"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDownloadDocument(doc)}
                                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors"
                                title="Download document"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {getFilteredDocuments().length === 0 && (
                      <div className="p-8 text-center">
                        <p className="text-charcoal-500">No documents with the selected status.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-charcoal-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-l-4 ${notification.read ? 'border-gray-300 bg-gray-50' : 'border-accent-green bg-accent-green/5'} rounded-r-lg`}
                >
                  <div className="flex items-start">
                    <Bell className={`h-5 w-5 mr-3 ${notification.read ? 'text-gray-400' : 'text-accent-green'}`} />
                    <div>
                      <p className={`text-sm ${notification.read ? 'text-charcoal-600' : 'text-charcoal-900 font-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-charcoal-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              <h2 className="text-xl font-bold text-charcoal-900 mb-2">Account Settings</h2>
              <p className="mb-6 text-charcoal-600">Manage your account preferences and profile information</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-accent-green/10 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-accent-green">
                          {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <h3 className="font-medium text-charcoal-900 mb-1">
                        {currentUser?.email?.split('@')[0] || 'User'}
                      </h3>
                      <p className="text-sm text-charcoal-500 mb-4">{currentUser?.email || 'user@example.com'}</p>
                      <button className="text-sm text-accent-green font-medium hover:underline">
                        Change Avatar
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-charcoal-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-accent-green focus:border-accent-green"
                            placeholder="Your full name"
                            defaultValue={currentUser?.email?.split('@')[0] || ''}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                            value={currentUser?.email || ''}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-charcoal-900 mb-4">Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-charcoal-900">Email Notifications</h4>
                            <p className="text-sm text-charcoal-500">Receive updates about your shipments</p>
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
                              className="block w-12 h-6 rounded-full bg-accent-green cursor-pointer transition-colors"
                            >
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-charcoal-900">SMS Alerts</h4>
                            <p className="text-sm text-charcoal-500">Get text messages for urgent updates</p>
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
                        
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-charcoal-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-charcoal-500">Enhanced security for your account</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                            <input 
                              type="checkbox" 
                              id="two-factor"
                              className="absolute opacity-0 w-0 h-0"
                            />
                            <label 
                              htmlFor="two-factor"
                              className="block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors"
                            >
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 flex justify-end">
                      <button className="px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-accent-green/90 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-2">
                <h3 className="text-lg font-medium text-charcoal-900 mb-4">Security</h3>
                <div className="space-y-4">
                  <button className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div>
                      <h4 className="font-medium text-charcoal-900">Change Password</h4>
                      <p className="text-sm text-charcoal-500">Update your account password</p>
                    </div>
                    <svg className="w-5 h-5 text-charcoal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div>
                      <h4 className="font-medium text-charcoal-900">Manage Connected Accounts</h4>
                      <p className="text-sm text-charcoal-500">Control which services have access</p>
                    </div>
                    <svg className="w-5 h-5 text-charcoal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex justify-between items-center p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left">
                    <div>
                      <h4 className="font-medium text-red-600">Delete Account</h4>
                      <p className="text-sm text-red-500">Permanently remove your account and data</p>
                    </div>
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <motion.h1 
            className="text-2xl font-bold text-charcoal-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome back, {currentUser?.email?.split('@')[0] || 'User'}
          </motion.h1>
          <motion.p 
            className="text-charcoal-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Here's an overview of your logistics operations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'overview' 
                          ? 'bg-accent-green text-white' 
                          : 'text-charcoal-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('overview')}
                    >
                      <LayoutDashboard className="h-5 w-5 mr-3" />
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'shipments' 
                          ? 'bg-accent-green text-white' 
                          : 'text-charcoal-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('shipments')}
                    >
                      <Ship className="h-5 w-5 mr-3" />
                      Shipments
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'documents' 
                          ? 'bg-accent-green text-white' 
                          : 'text-charcoal-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('documents')}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      Documents
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'notifications' 
                          ? 'bg-accent-green text-white' 
                          : 'text-charcoal-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      Notifications
                      <span className="ml-auto bg-accent-yellow text-xs text-white font-bold px-2 py-1 rounded-full">
                        3
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'settings' 
                          ? 'bg-accent-green text-white' 
                          : 'text-charcoal-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
            </motion.div>

            <motion.div 
              className="mt-6 bg-gradient-to-r from-accent-green to-accent-green/80 rounded-xl shadow-md p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm opacity-90 mb-4">Our support team is ready to assist with your logistics needs</p>
              <button className="w-full py-2 bg-white text-accent-green rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
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