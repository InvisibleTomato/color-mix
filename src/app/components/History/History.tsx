"use client";
import React from "react";
import Image from "next/image";
import styles from "./History.module.scss";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchCalculationHistory } from "@/app/lib/firebase/firestore";
import type { Calculation } from "@/app/lib/firebase/firestore";
import { deleteCalculation } from "@/app/lib/firebase/firestore";

export type HistoryRef = {
  reload: () => void;
};
const History = () => {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  //更新用の処理を後ほど追加

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCalculationHistory();
        setHistory(data);
      } catch (error) {
        console.error("履歴の取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  const handleHistoryClick = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  //履歴削除用の関数
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("この履歴を削除しますか？");
    if (!confirmDelete) return;

    try {
      await deleteCalculation(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("削除に失敗しました");
      console.error(error);
    }
  };
  return (
    <div>
      <div className={styles.HistoryContainer}>
        <div className={styles.HistoryIconContainer}>
          <span onClick={handleHistoryClick}>
            <Image
              src="/history-icon.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </span>
        </div>
        {/* ポップアップとして履歴表示 */}
        {isHistoryOpen && (
          <div className={styles.historyPopup}>
            <div className={styles.historyPopupContent}>
              <h3 className={styles.historyPopupTitle}>計算履歴</h3>
              {history.length === 0 ? (
                <p className={styles.text}>履歴が存在しません。</p>
              ) : (
                <div>
                  <div className={styles.historyListContainer}>
                    <ul className={styles.historyList}>
                      {history.map((item) => (
                        <li key={item.id} className={styles.historyItem}>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(item.id)}
                          >
                            <Image
                              src="/delete.svg"
                              alt="Delete Icon"
                              width={24}
                              height={24}
                              className={styles.deleteIcon}
                            />
                          </button>
                          <div className={styles.historyListContainer}>
                            <p className={styles.Text}>
                              総量: {item.totalAmount}g
                            </p>
                            <ul>
                              {item.drugs.map((drug, i) => (
                                <li key={i} className={styles.Text}>
                                  {drug.name} - {drug.amount}g（比率:{" "}
                                  {drug.ratio}, %: {drug.percent}）
                                </li>
                              ))}
                            </ul>
                            <p className={`${styles.timeStamp} ${styles.Text}`}>
                              保存日時:{" "}
                              {item.createdAt?.toDate?.().toLocaleString() ??
                                "不明"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
