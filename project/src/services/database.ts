import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { app } from '../config/firebase';

// Initialize Firestore
const db = getFirestore(app);

// User data interfaces
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Timestamp | Date;
  lastLogin: Timestamp | Date;
  photoURL?: string;
  phoneNumber?: string;
  preferences?: {
    emailNotifications: boolean;
    smsAlerts: boolean;
    twoFactorAuth: boolean;
  };
}

export interface Shipment {
  id: string;
  userId: string;
  origin: string;
  destination: string;
  status: string;
  eta: string; 
  type: string;
  carrier?: string;
  trackingEvents?: Array<TrackingEvent>;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface TrackingEvent {
  status: string;
  description: string;
  location?: string;
  timestamp: Timestamp | Date;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  status: string;
  date: string;
  size?: string;
  url: string;
  shipmentId?: string;
  createdAt: Timestamp | Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  time: string;
  read: boolean;
  createdAt: Timestamp | Date;
}

// Collection references
const usersCollection = collection(db, 'users');
const shipmentsCollection = collection(db, 'shipments');
const documentsCollection = collection(db, 'documents');
const notificationsCollection = collection(db, 'notifications');

// User profile functions
export const createUserProfile = async (uid: string, email: string): Promise<void> => {
  const userRef = doc(usersCollection, uid);
  const now = new Date();
  
  const userData: UserProfile = {
    uid,
    email,
    createdAt: now,
    lastLogin: now,
    preferences: {
      emailNotifications: true,
      smsAlerts: false,
      twoFactorAuth: false
    }
  };
  
  await setDoc(userRef, userData);
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(usersCollection, uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  const userRef = doc(usersCollection, uid);
  await updateDoc(userRef, { ...data, updatedAt: new Date() });
};

export const updateUserLastLogin = async (uid: string): Promise<void> => {
  const userRef = doc(usersCollection, uid);
  await updateDoc(userRef, { lastLogin: new Date() });
};

// Shipment functions
export const getUserShipments = async (userId: string): Promise<Shipment[]> => {
  const q = query(shipmentsCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  const shipments: Shipment[] = [];
  querySnapshot.forEach((doc) => {
    shipments.push({ id: doc.id, ...doc.data() } as Shipment);
  });
  
  return shipments;
};

export const createShipment = async (shipmentData: Omit<Shipment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const shipmentRef = doc(shipmentsCollection);
  const now = new Date();
  
  const newShipment = {
    ...shipmentData,
    id: shipmentRef.id,
    createdAt: now,
    updatedAt: now,
  };
  
  await setDoc(shipmentRef, newShipment);
  return shipmentRef.id;
};

export const updateShipmentStatus = async (shipmentId: string, status: string, description: string): Promise<void> => {
  const shipmentRef = doc(shipmentsCollection, shipmentId);
  const shipmentSnap = await getDoc(shipmentRef);
  
  if (shipmentSnap.exists()) {
    const shipmentData = shipmentSnap.data() as Shipment;
    const now = new Date();
    
    // Create new tracking event
    const newEvent: TrackingEvent = {
      status,
      description,
      timestamp: now
    };
    
    // Update shipment with new event and status
    const events = shipmentData.trackingEvents || [];
    await updateDoc(shipmentRef, {
      status,
      updatedAt: now,
      trackingEvents: [...events, newEvent]
    });
  }
};

// Document functions
export const getUserDocuments = async (userId: string): Promise<Document[]> => {
  const q = query(documentsCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  const documents: Document[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() } as Document);
  });
  
  return documents;
};

export const createDocument = async (documentData: Omit<Document, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = doc(documentsCollection);
  const now = new Date();
  
  const newDocument = {
    ...documentData,
    id: docRef.id,
    createdAt: now
  };
  
  await setDoc(docRef, newDocument);
  return docRef.id;
};

export const updateDocumentStatus = async (documentId: string, status: string): Promise<void> => {
  const docRef = doc(documentsCollection, documentId);
  await updateDoc(docRef, { status, updatedAt: new Date() });
};

// Notification functions
export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  const q = query(notificationsCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  const notifications: Notification[] = [];
  querySnapshot.forEach((doc) => {
    notifications.push({ id: doc.id, ...doc.data() } as Notification);
  });
  
  return notifications;
};

export const createNotification = async (userId: string, message: string): Promise<string> => {
  const notificationRef = doc(notificationsCollection);
  const now = new Date();
  
  const newNotification = {
    id: notificationRef.id,
    userId,
    message,
    time: '1 min ago', // This would be calculated based on the timestamp in a real app
    read: false,
    createdAt: now
  };
  
  await setDoc(notificationRef, newNotification);
  return notificationRef.id;
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const notificationRef = doc(notificationsCollection, notificationId);
  await updateDoc(notificationRef, { read: true });
}; 