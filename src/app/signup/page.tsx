import styles from "./signup.module.scss";
import Link from "next/link";
import AuthForm from "../components/AuthForm/AuthForm";

const SignIn = () => {
  return (
    <div>
      <AuthForm
        title="アカウント新規作成"
        buttonLabel="サインアップ"
        mode="signup"
      />
      {/* <button>Googleでログイン</button> */}
      <p className={styles.signinSpaceText}>または</p>
      <Link href={"/home"} className={styles.homeLink}>
        ゲストモードで使う
      </Link>
    </div>
  );
};

export default SignIn;
