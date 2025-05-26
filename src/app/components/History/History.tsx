"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import styles from "./History.module.scss";
import {
  fetchCalculationHistory,
  deleteCalculation,
} from "@/app/lib/firebase/firestore";
import type { Calculation } from "@/app/lib/firebase/firestore";

export type HistoryRef = {
  reload: () => void;
};

const History = forwardRef<HistoryRef>((props, ref) => {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 外部から呼べる再読み込みメソッドを公開
  const loadHistory = async () => {
    const data = await fetchCalculationHistory();
    setHistory(data);
  };
  useImperativeHandle(ref, () => ({ reload: loadHistory }));

  // 初回ロード
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCalculationHistory();
        setHistory(data);
      } catch (error) {
        console.error("履歴の取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleHistoryClick = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("この履歴を削除しますか？")) return;
    try {
      await deleteCalculation(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("削除に失敗しました", error);
      alert("削除に失敗しました");
    }
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div>
      <div className={styles.HistoryContainer}>
        <div className={styles.HistoryIconContainer}>
          <span onClick={handleHistoryClick}>
            <Image
              src="/history-icon.svg"
              width={50}
              height={50}
              alt="履歴アイコン"
            />
          </span>
        </div>

        {isHistoryOpen && (
          <div className={styles.historyPopup}>
            <div className={styles.historyPopupContent}>
              <h3 className={styles.historyPopupTitle}>計算履歴</h3>

              {history.length === 0 ? (
                <p className={styles.text}>履歴が存在しません。</p>
              ) : (
                <ul className={styles.historyList}>
                  {history.map((item) => (
                    <li key={item.id} className={styles.historyItem}>
                      <div className={styles.historyListContainer}>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Image
                            src="/delete.svg"
                            alt="Delete アイコン"
                            width={24}
                            height={24}
                            className={styles.deleteIcon}
                          />
                        </button>
                        <p className={styles.Text}>総量: {item.totalAmount}g</p>
                        <ul>
                          {item.drugs.map((drug, idx) => (
                            <li key={idx} className={styles.Text}>
                              {drug.name} - {drug.amount}g（比率:{" "}
                              {drug.ratio || "-"}, %: {drug.percent || "-"}）
                            </li>
                          ))}
                        </ul>
                        <p className={`${styles.timeStamp} ${styles.Text}`}>
                          保存日時:{" "}
                          {item.createdAt?.toDate().toLocaleString() ?? "不明"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

History.displayName = "History";
export default History;
