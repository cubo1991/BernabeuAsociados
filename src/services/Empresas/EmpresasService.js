// src/services/empresaService.js
import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, query, orderBy, startAt, endAt } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const COLLECTION_NAME = 'empresas';

/**
 * Validar que una empresa tenga los campos obligatorios
 */
const validateEmpresa = (empresa) => {
  const requiredFields = ['companyName', 'ownerName', 'phone', 'contactLink'];
  const missingFields = requiredFields.filter(field => !empresa[field]?.toString().trim());
  
  if (missingFields.length > 0) {
    throw new Error(`Campos obligatorios faltantes: ${missingFields.join(', ')}`);
  }

  if (empresa.phone && !/^[\d\s+\-()]+$/.test(empresa.phone)) {
    throw new Error('El teléfono ingresado no es válido');
  }

  if (empresa.contactLink && !isValidUrl(empresa.contactLink)) {
    throw new Error('El link de contacto no es válido');
  }

  return true;
};

/**
 * Validar URL
 */
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Obtener todas las empresas
 */
export const getEmpresas = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    throw new Error('No se pudieron obtener las empresas');
  }
};

/**
 * Buscar empresa por nombre
 */
export const getEmpresaByName = async (name) => {
  try {
    if (!name || name.trim().length < 2) return [];

    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    const empresas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lowerName = name.trim().toLowerCase();

    return empresas.filter(empresa =>
      typeof empresa.companyName === 'string' &&
      empresa.companyName.toLowerCase().includes(lowerName)
    );
  } catch (error) {
    console.error('Error al buscar empresa:', error);
    throw new Error('Error en la búsqueda de empresas');
  }
};

/**
 * Obtener empresa por ID
 */
export const getEmpresaById = async (id) => {
  try {
    if (!id) throw new Error('ID requerido');
    
    const ref = doc(db, COLLECTION_NAME, id.toString());
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error('Error al obtener empresa:', error);
    throw new Error('No se pudo obtener la empresa');
  }
};

/**
 * Crear nueva empresa
 */
export const createEmpresa = async (empresa) => {
  try {
    validateEmpresa(empresa);
    const empresaData = {
      ...empresa,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await addDoc(collection(db, COLLECTION_NAME), empresaData);
  } catch (error) {
    console.error('Error al crear empresa:', error);
    throw error;
  }
};

/**
 * Actualizar empresa
 */
export const updateEmpresa = async (id, data) => {
  try {
    if (!id) throw new Error('ID requerido');
    
    validateEmpresa(data);
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    const ref = doc(db, COLLECTION_NAME, id.toString());
    await updateDoc(ref, updateData);
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    throw error;
  }
};

/**
 * Eliminar empresa
 */
export const deleteEmpresa = async (id) => {
  try {
    if (!id) throw new Error('ID requerido');
    
    const ref = doc(db, COLLECTION_NAME, id.toString());
    await deleteDoc(ref);
  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    throw new Error('No se pudo eliminar la empresa');
  }
};

/**
 * Obtener empresas ordenadas por nombre
 */
export const getEmpresasOrdered = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("companyName"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener empresas ordenadas:', error);
    throw new Error('No se pudieron obtener las empresas');
  }
};
