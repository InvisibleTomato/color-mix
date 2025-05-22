"use client";
import React from "react";
import Image from "next/image";
import styles from "./History.module.scss";
import { useState } from "react";

const History = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleHistoryClick = () => {
    setIsHistoryOpen((prev) => !prev);
  };
  return (
    <div>
      <div className={styles.HistoryIconContainer}>
        <span onClick={handleHistoryClick}>
          <Image
            src="/history-icon.svg"
            width={40}
            height={40}
            alt="Picture of the author"
          />
        </span>
      </div>
      {/* ポップアップとしてのプロフィール表示 */}
      {isHistoryOpen && (
        <div className={styles.historyPopup}>
          <div className={styles.historyPopupContent}>
            <h3 className={styles.historyPopupTitle}>計算履歴</h3>
            <div className={styles.historyPopupList}>
              <ul>
                <li>計算履歴1</li>
                <li>計算履歴2</li>
                <li>計算履歴3</li>
                <li>計算履歴4</li>
                <li>計算履歴5</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
