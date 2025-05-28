"use client";
import React from "react";
import styles from "./LoginProfile.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
  };

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

  //サインアウトボタン
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail(null); // 状態をリセット
      router.push("/");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };

  //アカウント削除
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("ユーザー情報が見つかりません");
      return;
    }

    const confirm = window.confirm("本当にアカウントを削除しますか？");
    if (!confirm) return;

    try {
      await user.delete();
      setEmail(null);
      router.push("/");
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        alert("再ログインが必要です。ログアウト後に再度ログインしてください。");
        await signOut(auth);
        router.push("/");
      } else {
        console.error("アカウント削除エラー:", error);
        alert("アカウント削除に失敗しました");
      }
    }
  };
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
              <button
                onClick={handleLogout}
                className={styles.LoginProfileLogout}
              >
                ログアウト
              </button>
              <button
                onClick={handleDeleteAccount}
                className={styles.profileDelete}
              >
                アカウント削除
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginProfile;
