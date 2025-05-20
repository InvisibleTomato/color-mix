import React from "react";
import styles from "./Profile.module.scss";
import Link from "next/link";

const Profile = () => {
  return (
    <div>
      <div>
        <p className={styles.profileEmail}>メールアドレス</p>
        <Link href={"/"}>サインアウト</Link>
        <Link href={"/"}>アカウントを削除する</Link>
      </div>
    </div>
  );
};

export default Profile;
