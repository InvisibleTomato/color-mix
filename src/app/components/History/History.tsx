"use client";
import React from "react";
import Image from "next/image";
import styles from "./History.module.scss";
import { useEffect, useState } from "react";
import { fetchCalculationHistory } from "@/app/lib/firebase/firestore";
import type { Calculation } from "@/app/lib/firebase/firestore";

const History = () => {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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
                <p>履歴が存在しません。</p>
              ) : (
                <ul className={styles.historyList}>
                  {history.map((item) => (
                    <li key={item.id} className={styles.historyItem}>
                      <p>総量: {item.totalAmount}g</p>
                      <ul>
                        {item.drugs.map((drug, i) => (
                          <li key={i}>
                            {drug.name} - {drug.amount}g（比率:{" "}
                            {drug.ratio || "N/A"}, %: {drug.percent || "N/A"}）
                          </li>
                        ))}
                      </ul>
                      <p className={styles.timestamp}>
                        保存日時:{" "}
                        {item.createdAt?.toDate?.().toLocaleString() ?? "不明"}
                      </p>
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
};

export default History;
