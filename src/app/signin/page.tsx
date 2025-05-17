import React from "react";
import styles from "./signin.module.css";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className={styles.signinContainer}>
      <h2 className={styles.title}>Color Mix</h2>
      <div className={styles.signinChildrenWrapper}>
        <div className={styles.emailWrapper}>
          <p className={styles.emailText}>メールアドレス</p>
          <input
            type="text"
            placeholder="example@email.com"
            className={styles.emailInput}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <p className={styles.passwordText}>パスワード</p>
          <input
            type="text"
            placeholder="123abc"
            className={styles.passwordInput}
          />
        </div>
        <button className={styles.signinButton}>サインイン</button>
      </div>
      <p>アカウントをお持ちでない方</p>
      {/* <button>Googleでログイン</button> */}
      <p>または</p>
      <Link href={"/home"}>ゲストモードで使う</Link>
    </div>
  );
};

export default SignIn;
