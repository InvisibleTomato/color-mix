"use client";
import { Outfit } from "next/font/google";
import React, { useState } from "react";
import styles from "./AuthForm.module.scss";
import AuthButton from "../Button/AuthButton";
import { signUp, signIn } from "../../lib/firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { validatePasswordWithRules } from "@/app/lib/firebase/auth";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

type AuthFormProps = {
  title: string;
  onClick?: () => void;
  buttonLabel: string;
  mode: "signin" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonLabel, mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // エラーメッセージの状態を管理
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  // サインアップまたはサインインの処理
  const handleSubmit = async () => {
    setErrorMessage(null); // 毎回初期化

    // パスワードのバリデーション
    const validationError = await validatePasswordWithRules(password);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    console.log("入力されたメールアドレス:", email);
    console.log("入力されたパスワード:", password);

    try {
      const userCredential =
        mode === "signup"
          ? await signUp(email, password)
          : await signIn(email, password);

      const uid = userCredential.user.uid;
      console.log(
        `${mode === "signup" ? "サインアップ" : "サインイン"}成功`,
        userCredential.user
      );
      router.push(`/home/${uid}`); // ユーザーのホームページに遷移
    } catch (error) {
      const err = error as FirebaseError;
      console.error("Firebaseエラー:", err.code, err.message);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setErrorMessage("パスワードまたはメールアドレスが間違っています");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("無効なメールアドレスです");
      } else {
        setErrorMessage("ログインに失敗しました");
      }

      console.error("Firebaseエラー:", err.code, err.message);
    }

    return (
      <AuthButton
        label={buttonLabel}
        onClick={handleSubmit}
        className={styles.signinButton}
      />
    );
  };

  return (
    <div className={styles.signinContainer}>
      <h2 className={`${outfit.className} ${styles.title}`}>{title}</h2>
      <div className={styles.signinChildrenWrapper}>
        {/* エラーメッセージを表示 */}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.emailWrapper}>
          <label htmlFor="email" className={styles.emailText}>
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@email.com"
            className={styles.emailInput}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <label htmlFor="password" className={styles.passwordText}>
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="8文字以上半角英数字"
            className={styles.passwordInput}
          />
        </div>
        <AuthButton
          label={buttonLabel}
          className={styles.signinButton}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AuthForm;
