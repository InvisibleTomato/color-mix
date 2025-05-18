import React from "react";
import styles from "@/app/components/Header/header.module.scss";
import Link from "next/link";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <h1 className={`${outfit.className} ${styles.logo}`}>Color Mix</h1>
      </Link>
    </div>
  );
};
