import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  }
  
  const isRead = [OperationType.GET, OperationType.LIST].includes(operationType);
  const isOffline = errInfo.error.includes('offline') || errInfo.error.includes('Backend didn\'t respond');

  if (isRead) {
    console.warn(`Firestore Read suppressed (Offline/Error): ${operationType} on ${path}`, errInfo);
    return null; // Return null so the UI can use its own fallback
  }

  console.error('Firestore Write Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbService = {
  async getCollection(path: string, orderField?: string) {
    try {
      const colRef = collection(db, path);
      const q = orderField ? query(colRef, orderBy(orderField, "desc")) : colRef;
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return handleFirestoreError(error, OperationType.LIST, path) || [];
    }
  },

  async getDocument(path: string, id: string) {
    try {
      const docRef = doc(db, path, id);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
      return handleFirestoreError(error, OperationType.GET, `${path}/${id}`);
    }
  },

  async createDocument(path: string, data: any) {
    try {
      const colRef = collection(db, path);
      return await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateDocument(path: string, id: string, data: any) {
    try {
      const docRef = doc(db, path, id);
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${path}/${id}`);
    }
  },

  async deleteDocument(path: string, id: string) {
    try {
      const docRef = doc(db, path, id);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
    }
  },

  async setDocument(path: string, id: string, data: any) {
    try {
      const docRef = doc(db, path, id);
      return await setDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${path}/${id}`);
    }
  }
};
