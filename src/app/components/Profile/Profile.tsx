"use client";
import React from "react";
import styles from "./Profile.module.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Profile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
  };
  return (
    <div>
      <div className={styles.ProfileContainer}>
        <div className={styles.ProfileIconContainer}>
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
          <div className={styles.profilePopup}>
            <div className={styles.profilePopupContent}>
              <h3 className={styles.profilePopupTitle}>ログインしていません</h3>

              <Link href={"/signup"} className={styles.profileSignup}>
                アカウント登録へ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
