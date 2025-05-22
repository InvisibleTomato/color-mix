// src/app/home/page.tsx
import styles from "./home.module.scss";
import Profile from "@/app/components/Profile/Profile";
import History from "@/app/components/History/History";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Profile />
      {/* 履歴コンポーネント */}
      <History />
    </div>
  );
};

export default Home;
