"use client";
import { Outfit } from "next/font/google";
import React, { useState } from "react";
import styles from "./AuthForm.module.scss";
import AuthButton from "../Button/AuthButton";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

type AuthFormProps = {
  title: string;
  onClick?: () => void;
  buttonLabel: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonLabel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    console.log("入力されたメールアドレス:", email);
    console.log("入力されたパスワード:", password);
    // 後でログイン処理を追加予定
  };

  return (
    <div className={styles.signinContainer}>
      <h2 className={`${outfit.className} ${styles.title}`}>{title}</h2>
      <div className={styles.signinChildrenWrapper}>
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
