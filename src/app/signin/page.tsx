import React from "react";
import styles from "./signin.module.scss";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className={styles.signinContainer}>
      <h2 className={styles.title}>Color Mix</h2>
      <div className={styles.signinChildrenWrapper}>
        <div className={styles.emailWrapper}>
          <label htmlFor="email" className={styles.emailText}>
            メールアドレス
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className={styles.emailInput}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <label htmlFor="password" className={styles.passwordText}>
            パスワード
          </label>
          <input
            type="password"
            placeholder="8文字以上半角英数字"
            className={styles.passwordInput}
          />
        </div>
        <button className={styles.signinButton}>サインイン</button>
      </div>
      <Link href={"/signup"} className={styles.signupLink}>
        アカウントをお持ちでない方
      </Link>
      {/* <button>Googleでログイン</button> */}
      <p className={styles.signinSpaceText}>または</p>
      <Link href={"/home"} className={styles.homeLink}>
        ゲストモードで使う
      </Link>
    </div>
  );
};

export default SignIn;
