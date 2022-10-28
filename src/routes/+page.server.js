import { collection, addDoc } from "firebase/firestore";
import { db } from '$lib/firebase'

const increment = (ref, allowed) => {
  addDoc(ref, {date: new Date(), allowed})
}

export const actions = {
  manAllowed: async (event) => {
    increment(collection(db, 'adorade', 'man', 'data'), true)

    return {
      success: true,
      gender: 'man',
      allowed: true,
    };
  },
  manDisallowed: async (event) => {
    increment(collection(db, 'adorade', 'man', 'data'), false)

    return {
      success: true,
      gender: 'man',
      allowed: false,
    };
  },
  womenAllowed: async (event) => {
    increment(collection(db, 'adorade', 'women', 'data'), true)

    return {
      success: true,
      gender: 'women',
      allowed: true,
    };
  },
  womenDisallowed: async (event) => {
    increment(collection(db, 'adorade', 'women', 'data'), false)

    return {
      success: true,
      gender: 'women',
      allowed: false,
    };
  },
};
