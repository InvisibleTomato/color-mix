import React from "react";
import styles from "@/app/components/Header/header.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Color Mix</h1>
      </Link>
    </div>
  );
};
