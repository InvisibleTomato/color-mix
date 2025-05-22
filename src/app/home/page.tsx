import React from "react";
import styles from "./home.module.scss";
import Profile from "@/app/components/Profile/Profile";
import History from "@/app/components/History/History";

const Home = () => {
  return (
    <div>
      <div className={styles.homeContainer}>
        <History />
        <Profile />
      </div>
    </div>
  );
};

export default Home;
