import { getFirestore } from "firebase/firestore";
import app from "./firebase";
import { auth } from "./auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const db = getFirestore(app);

type Drug = {
  id: number;
  name: string;
  ratio: string;
  percent: string;
  amount: string;
};

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
