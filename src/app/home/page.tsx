// src/app/home/page.tsx
import styles from "./home.module.scss";
import Profile from "@/app/components/Profile/Profile";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Profile />
    </div>
  );
};

export default Home;
