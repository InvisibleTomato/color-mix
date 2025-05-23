"use client";
import React from "react";
import styles from "./LoginProfile.module.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const LoginProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
  };
  return (
    <div>
      <div className={styles.LoginProfileContainer}>
        <div>
          <span onClick={handleProfileClick}>
            <Image
              src="/account-icon.svg"
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </span>
        </div>

        {/* ポップアップとしてのプロフィール表示 */}
        {isProfileOpen && (
          <div className={styles.LoginProfilePopup}>
            <div className={styles.LoginProfilePopupContent}>
              <h3 className={styles.LoginProfilePopupTitle}>メールアドレス</h3>
              <p className={styles.LoginProfileEmail}>example@example.com</p>
              <Link href={"#"} className={styles.LoginProfileLogout}>
                ログアウト
              </Link>
              <Link href={"#"} className={styles.profileDelete}>
                アカウント削除
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginProfile;
