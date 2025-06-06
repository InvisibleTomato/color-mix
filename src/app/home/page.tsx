// src/app/home/page.tsx
import styles from "./home.module.scss";
import Profile from "@/app/components/Profile/Profile";
import Calc from "../components/Calc/Calc";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Profile />
      <div className={styles.calcContainer}>
        <Calc />
      </div>
    </div>
  );
};

export default Home;
