// scripts/uploadCompanies.js
import { collection, setDoc, doc } from 'firebase/firestore';
import companies from '@/app/constants/dummyCompanies';
import { db } from '../firebase';


export const uploadCompanies = async () => {
  try {
    const batch = companies.empresas;

    for (const empresa of batch) {
      const ref = doc(collection(db, 'empresas'), empresa.id.toString());
      await setDoc(ref, empresa);
    }

    console.log('Empresas cargadas correctamente');
  } catch (error) {
    console.error('Error al cargar empresas:', error);
  }
};
