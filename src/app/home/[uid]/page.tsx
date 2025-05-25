"use client";
import LoginProfile from "@/app/components/LoginProfile/LoginProfile";
import History from "@/app/components/History/History";
import styles from "./home-uid.module.scss";
import Calc from "@/app/components/Calc/Calc";

export default function HomePage() {
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeIconContainer}>
          <History />
          <LoginProfile />
        </div>
        <div className={styles.calcContainer}>
          <Calc />
        </div>
      </div>
    </div>
  );
}
