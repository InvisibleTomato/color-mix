// firebase/auth.ts
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// パスワードのバリデーション
export const validatePasswordWithRules = async (
  password: string
): Promise<string | null> => {
  const status = await validatePassword(getAuth(), password);

  const errors: string[] = [];

  if (status.containsLowercaseLetter === false) {
    errors.push("小文字アルファベットを1文字以上含めてください。");
  }
  if (status.containsNumericCharacter === false) {
    errors.push("数字を1文字以上含めてください。");
  }
  if (status.meetsMinPasswordLength === false) {
    errors.push("8文字以上で入力してください。");
  }
  if (password.length > 64) {
    errors.push("64文字以内で入力してください。");
  }

  return errors.length > 0 ? errors.join(" ") : null;
};
