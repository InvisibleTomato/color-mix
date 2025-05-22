import styles from "@/app/components/Logo/Logo.module.scss";
import { Outfit } from "next/font/google";

//ロゴのフォント
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

// ロゴコンポーネント

const Logo = () => {
  return (
    <div>
      <div>
        <h1 className={`${outfit.className} ${styles.logo}`}>Color Mix</h1>
      </div>
    </div>
  );
};

export default Logo;
