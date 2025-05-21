import React from "react";
import styles from "@/app/components/Header/header.module.scss";
import Link from "next/link";

import Logo from "../Logo/Logo";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Logo />
      </Link>
    </div>
  );
};
