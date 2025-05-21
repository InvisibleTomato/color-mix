import styles from "./signin.module.scss";
import Link from "next/link";
import AuthForm from "@/app/components/AuthForm/AuthForm";

const SignIn = () => {
  return (
    <div>
      <AuthForm title="Color Mix" buttonLabel="サインイン" mode="signin" />

      <Link href={"/password-reset"} className={styles.signupLink}>
        パスワードをお忘れの方
      </Link>
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
