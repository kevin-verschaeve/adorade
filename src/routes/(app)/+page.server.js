import { collection, addDoc } from "firebase/firestore";
import { db } from '$lib/firebase'

const increment = (ref, allowed) => {
  addDoc(ref, {date: new Date(), allowed})
}

export const actions = {
  manAllowed: async (event) => {
    increment(collection(db, 'adorade', 'man', 'data'), true)

    return {
      allowed: true,
      message: "Wow il a été adorade ce monsieur !"
    };
  },
  manDisallowed: async (event) => {
    increment(collection(db, 'adorade', 'man', 'data'), false)

    return {
      allowed: false,
      message: "Tfacon les hommes, c'est tous les mêmes !",
    };
  },
  womenAllowed: async (event) => {
    increment(collection(db, 'adorade', 'women', 'data'), true)

    return {
      allowed: true,
      message: "Wow elle a été adorade cette madame !"
    };
  },
  womenDisallowed: async (event) => {
    increment(collection(db, 'adorade', 'women', 'data'), false)

    return {
      allowed: false,
      message: "Toutes des putes, sauf maman !",
    };
  },
};
