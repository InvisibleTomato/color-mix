"use client";
import LoginProfile from "@/app/components/LoginProfile/LoginProfile";
import { useRef } from "react";
import History from "@/app/components/History/History";
import styles from "./home-uid.module.scss";
import UsersCalc from "@/app/components/UsersCalc/UsersCalc";
import type { HistoryRef } from "@/app/components/History/History";

export default function HomePage() {
  const historyRef = useRef<HistoryRef>(null);

  const handleSaved = () => {
    historyRef.current?.reload();
  };
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeIconContainer}>
          <History ref={historyRef} />
          <LoginProfile />
        </div>
        <div className={styles.calcContainer}>
          <UsersCalc onSaved={handleSaved} />
        </div>
      </div>
    </div>
  );
}
