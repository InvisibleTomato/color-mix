"use client";
import styles from "./new-password.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { auth } from "@/app/lib/firebase/auth";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

const NewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode"); // トークンを検証を取得
  const continueUrl = searchParams.get("continueUrl"); // 処理後にリダイレクトするURL

  const [isCodeValid, setIsCodeValid] = useState(false); // コードが有効かどうか
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async function () {
      try {
        if (oobCode) {
          // トークンを検証
          await verifyPasswordResetCode(auth, oobCode);
          setIsCodeValid(true);
        }
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 新しいパスワードでパスワードリセットを確定
      await confirmPasswordReset(auth, oobCode!, password);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContinue = () => {
    if (continueUrl) {
      // 指定されたURLにリダイレクト
      router.push(continueUrl);
    }
  };

  return (
    <div>
      <div className={styles.newPasswordContainer}>
        {isSuccess ? (
          // パスワードが正常に変更できた場合のUI
          <div>
            <h2>パスワードを変更しました</h2>
            <p>新しいパスワードでログインできるようになりました</p>
            <button onClick={handleContinue}>続行</button>
          </div>
        ) : !isCodeValid ? (
          // リンクが無効または期限切れの場合のUI
          <>
            <h2>パスワードの再設定をもう一度お試しください</h2>
            <div>
              パスワードの再設定のリクエストの期限が切れたか、リンクがすでに使用されています
            </div>
          </>
        ) : (
          // パスワード入力画面のUI
          <>
            <h2>パスワードの再設定</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="new-password">新しいパスワード</label>
                <div>
                  <input
                    type="password"
                    id="email"
                    name="email"
                    placeholder="新しいパスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit">パスワードを変更</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
