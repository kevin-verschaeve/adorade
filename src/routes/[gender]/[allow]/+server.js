import { redirect } from '@sveltejs/kit';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/firebase';

export async function GET({ params }) {
  const allowed = params.allow === 'allow'; 

  if (!['man', 'women'].includes(params.gender)) {
    throw new redirect(301, '/');  
  }
 
  await addDoc(collection(db, 'adorade', params.gender, 'data'), {date: new Date(), allowed});

  throw redirect(301, '/');
}
