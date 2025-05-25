"use client";
import React from "react";
import styles from "./Calc.module.scss";
import { useState } from "react";
import Image from "next/image";

type Drug = {
  name: string;
  ratio: string;
  percent: string;
  amount: string;
};

const Calc = () => {
  const [drugs, setDrugs] = useState<Drug[]>([
    { name: "薬剤1", ratio: "", percent: "", amount: "" },
  ]);

  // +ボタンを押した時に配列を増やす
  const handleAddRow = () => {
    const newDrug: Drug = {
      name: `薬剤${drugs.length + 1}`,
      ratio: "",
      percent: "",
      amount: "",
    };
    setDrugs((prev) => [...prev, newDrug]);
  };

  //-ボタンを押した時に配列を減らす
  const handleRemoveRow = () => {
    if (drugs.length > 1) {
      setDrugs((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div>
      <div className={styles.calcInputContainer}>
        <table className={styles.inputTable}>
          <thead>
            <tr>
              <th>薬剤</th>
              <th>比率</th>
              <th>%</th>
              <th>量(g)</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((drug, index) => (
              <tr key={index}>
                <td>{drug.name}</td>
                <td>
                  <input
                    type="number"
                    className={styles.inputCell}
                    value={drug.ratio}
                    onChange={(e) => {
                      const newDrugs = [...drugs];
                      newDrugs[index].ratio = e.target.value;
                      setDrugs(newDrugs);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className={styles.inputCell}
                    value={drug.percent}
                    onChange={(e) => {
                      const newDrugs = [...drugs];
                      newDrugs[index].percent = e.target.value;
                      setDrugs(newDrugs);
                    }}
                  />
                </td>
                <td className={styles.amountCell}>{drug.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div className={styles.buttonContainer}>
            <button onClick={handleRemoveRow} className={styles.Button}>
              <Image
                src="/remove.svg"
                width={20}
                height={20}
                alt="Remove Row"
              />
            </button>
            <button onClick={handleAddRow} className={styles.Button}>
              <Image src="/add.svg" width={20} height={20} alt="Add Row" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;
