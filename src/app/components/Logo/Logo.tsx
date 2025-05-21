"use client";
import React from "react";
import styles from "@/app/components/Logo/Logo.module.scss";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase/auth";
import { Outfit } from "next/font/google";
import { User } from "firebase/auth";

//ロゴのフォント
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

// ロゴコンポーネント
const Logo = () => {
  const router = useRouter();
  // ロゴをクリックしたときの処理
  const handleClick = async () => {
    const currentUser: User | null = auth.currentUser;
    console.log("ユーザーのID" + currentUser);

    if (currentUser) {
      const uid = currentUser.uid;
      router.push(`/home/${uid}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <div onClick={handleClick}>
        <h1 className={`${outfit.className} ${styles.logo}`}>Color Mix</h1>
      </div>
    </div>
  );
};

export default Logo;
