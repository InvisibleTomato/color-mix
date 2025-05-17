import React from "react";
import styles from "./signin.module.css";
import Link from "next/link";

const SignIn = () => {
  return (
    <div>
      <h2>Color Mix</h2>
      <div className={styles.signin}>
        <p>メールアドレス</p>
        <input type="text" placeholder="example@email.com" />
        <p>パスワード</p>
        <input type="text" placeholder="123abc" />
        <button>サインイン</button>
      </div>
      <p>アカウントをお持ちでない方</p>
      <button>Googleでログイン</button>
      <p>または</p>
      <Link href={"/home"}>ゲストモードで使う</Link>
    </div>
  );
};

export default SignIn;
