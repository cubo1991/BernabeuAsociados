// src/services/empresaService.js
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';


const COLLECTION_NAME = 'empresas';

export const getEmpresas = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getEmpresaById = async (id) => {
  const ref = doc(db, COLLECTION_NAME, id.toString());
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const createEmpresa = async (empresa) => {
  const ref = doc(db, COLLECTION_NAME, empresa.id.toString());
  await setDoc(ref, empresa);
};

export const updateEmpresa = async (id, data) => {
  const ref = doc(db, COLLECTION_NAME, id.toString());
  await updateDoc(ref, data);
};

export const deleteEmpresa = async (id) => {
  const ref = doc(db, COLLECTION_NAME, id.toString());
  await deleteDoc(ref);
};
