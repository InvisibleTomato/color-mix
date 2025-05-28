"use client";
import React from "react";
import styles from "./LoginProfile.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from "@/app/lib/firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

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

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail(null);
      router.push("/");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("ユーザー情報が見つかりません");
      return;
    }

    const confirm = window.confirm("本当にアカウントを削除しますか？");
    if (!confirm) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      const calculationsRef = collection(userDocRef, "calculations");

      //calculations サブコレクションの削除
      const snapshot = await getDocs(calculationsRef);
      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(docSnap.ref)
      );
      await Promise.all(deletePromises);

      //親ドキュメントを削除
      await deleteDoc(userDocRef);

      //Firebase 認証ユーザー削除
      await user.delete();

      setEmail(null);
      router.push("/");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
      ) {
        if ((error as { code: string }).code === "auth/requires-recent-login") {
          // ...
        }
      } else {
        console.error("不明なエラー:", error);
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
