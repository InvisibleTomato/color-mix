"use client";
import LoginProfile from "@/app/components/LoginProfile/LoginProfile";
import History from "@/app/components/History/History";
import styles from "./home-uid.module.scss";
import UsersCalc from "@/app/components/UsersCalc/UsersCalc";

export default function HomePage() {
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeIconContainer}>
          <History />
          <LoginProfile />
        </div>
        <div className={styles.calcContainer}>
          <UsersCalc />
        </div>
      </div>
    </div>
  );
}
