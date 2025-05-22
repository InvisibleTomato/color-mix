"use client";
import Profile from "@/app/components/Profile/Profile";
import History from "@/app/components/History/History";
import styles from "./home-uid.module.scss";

export default function HomePage() {
  return (
    <div>
      <div className={styles.homeContainer}>
        <History />
        <Profile />
      </div>
    </div>
  );
}
