import styles from "@/app/page.module.css";
import { SignIn } from "@/app/signin/page";

export default function Home() {
  return (
    <div>
      <h2 className={styles.main}>
        <SignIn />
      </h2>
    </div>
  );
}
