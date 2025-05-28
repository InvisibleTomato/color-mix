"use client";
import { auth } from "@/app/lib/firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import styles from "./password-reset.module.scss";
import { useRouter } from "next/navigation";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //メールアドレスが取得できているか確認
    // console.log("入力されたメールアドレス:", email);
    const actionCodeSettings = {
      // パスワード再設定後のリダイレクト URL
      //↓デプロイ時は本番環境のURLに変更する
      url: "https://color-mix-rho.vercel.app/",
      handleCodeInApp: true,
    };
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setEmail("");
      alert("再設定用URLをメールにて送信しました");
      router.push("https://color-mix-rho.vercel.app/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.passwordResetContainer}>
        <h2 className={styles.passwordResetTitle}>パスワードリセット</h2>
        <form onSubmit={handleSubmit} className={styles.passwordResetForm}>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.passwordResetInput}
            />
          </div>
          <button type="submit" className={styles.passwordResetButton}>
            リセットリンクを送信
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
