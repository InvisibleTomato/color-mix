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
  try {
    const status = await validatePassword(auth, password);
    if (status.isValid) return null;

    const errors: string[] = [];

    if (status.containsLowercaseLetter === false) {
      errors.push("小文字（a〜z）を含めてください");
    }

    if (status.containsNumericCharacter === false) {
      errors.push("数字を含めてください");
    }

    const meetsMinLength = (status as any).meetsMinLength;
    const minLength = (status as any).minLength ?? 8;

    if (meetsMinLength === false) {
      errors.push(`${minLength}文字以上で入力してください`);
    }

    return errors.join("、");
  } catch (e) {
    console.error("パスワード検証エラー:", e);
    return "パスワードの検証中にエラーが発生しました";
  }
};
