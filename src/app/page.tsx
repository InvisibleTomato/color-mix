import styles from "@/app/page.module.scss";
import SignIn from "@/app/signin/page";

export default function Home() {
  return (
    <div>
      <div className={styles.main}>
        <SignIn />
      </div>
    </div>
  );
}
