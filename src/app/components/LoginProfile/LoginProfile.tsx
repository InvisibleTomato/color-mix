"use client";
import React from "react";
import styles from "./LoginProfile.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";

const LoginProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);
  return (
    <div>
      <div className={styles.LoginProfileContainer}>
        <div>
          <span onClick={handleProfileClick}>
            <Image
              src="/account.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </span>
        </div>

        {/* ポップアップとしてのプロフィール表示 */}
        {isProfileOpen && (
          <div className={styles.LoginProfilePopup}>
            <div className={styles.LoginProfilePopupContent}>
              <h3 className={styles.LoginProfilePopupTitle}>メールアドレス</h3>
              <p className={styles.LoginProfileEmail}>
                {email ? email : "未ログイン"}
              </p>
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
