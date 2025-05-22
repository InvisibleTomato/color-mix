"use client";
import LoginProfile from "@/app/components/LoginProfile/LoginProfile";
import History from "@/app/components/History/History";
import styles from "./home-uid.module.scss";

export default function HomePage() {
  return (
    <div>
      <div className={styles.homeContainer}>
        <History />
        <LoginProfile />
      </div>
    </div>
  );
}
