import React from "react";
import styles from "@/app/components/Header/Header.module.scss";

import Logo from "../Logo/Logo";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
      </div>
    </div>
  );
};
