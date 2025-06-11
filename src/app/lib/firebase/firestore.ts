import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import app from "./firebase";
import { auth } from "./auth";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import type { Drug } from "@/app/lib/types/drug";

export const db = getFirestore(app);

export const saveCalculation = async (totalAmount: number, drugs: Drug[]) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("ログインしていません");
  }

  const ref = collection(db, "users", user.uid, "calculations");

  await addDoc(ref, {
    totalAmount,
    drugs,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export type Calculation = {
  id: string;
  totalAmount: number;
  drugs: Drug[];
  createdAt: Timestamp;
};

export const waitForAuthUser = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error("ログインしていません"));
      }
    });
  });
};

export const fetchCalculationHistory = async (): Promise<Calculation[]> => {
  const user = await waitForAuthUser();

  const ref = collection(db, "users", user.uid, "calculations");
  const q = query(ref, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Calculation[];
};

export const deleteCalculation = async (id: string) => {
  const user = await waitForAuthUser();
  const ref = doc(db, "users", user.uid, "calculations", id);
  await deleteDoc(ref);
};
