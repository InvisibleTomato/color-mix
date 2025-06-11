"use client";
import React, { useState, useEffect } from "react";
import styles from "./Calc.module.scss";
import Image from "next/image";
import { calculateAmounts } from "@/app/lib/logic/calculateAmounts";
import type { Drug } from "@/app/lib/types/drug";

// 配列の初期状態
const initialDrugs: Drug[] = [
  { id: 1, name: "薬剤1", ratio: "", percent: "", amount: "" },
];

const Calc = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [drugs, setDrugs] = useState<Drug[]>(initialDrugs);
  const [calculatedDrugs, setCalculatedDrugs] = useState<Drug[]>(initialDrugs);

  //リセット処理
  const handleReset = () => {
    setTotalAmount(0);
    setDrugs(initialDrugs);
  };

  const handleAddRow = () => {
    const newDrug: Drug = {
      id: drugs.length + 1,
      name: `薬剤${drugs.length + 1}`,
      ratio: "",
      percent: "",
      amount: "",
    };
    setDrugs((prev) => [...prev, newDrug]);
  };

  const handleRemoveRow = () => {
    if (drugs.length > 1) {
      setDrugs((prev) => prev.slice(0, -1));
    }
  };

  const handleInputChange = (
    id: number,
    field: "ratio" | "percent",
    value: string
  ) => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) => {
        if (drug.id !== id) return drug;
        return field === "ratio"
          ? { ...drug, ratio: value, percent: value ? "" : drug.percent }
          : { ...drug, percent: value, ratio: value ? "" : drug.ratio };
      })
    );
  };

  useEffect(() => {
    const updated = calculateAmounts(drugs, totalAmount);
    setCalculatedDrugs(updated);
  }, [drugs, totalAmount]);

  return (
    <div>
      <div className={styles.calcInputContainer}>
        <div className={styles.totalAmountContainer}>
          <h2 className={styles.totalAmountTitle}>1剤の総量</h2>
          <input
            type="number"
            inputMode="numeric"
            pattern="\d*"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            className={styles.totalAmountInput}
          />
          <p className={styles.totalAmountText}>g</p>
        </div>
        <table className={styles.inputTable}>
          <thead>
            <tr className={styles.columnTitle}>
              <th>薬剤</th>
              <th>比率</th>
              <th>%</th>
              <th>量(g)</th>
            </tr>
          </thead>
          <tbody>
            {calculatedDrugs.map((drug) => (
              <tr key={drug.id} className={styles.cellContainer}>
                <td>{drug.name}</td>
                <td>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    className={styles.inputCell}
                    value={drug.ratio}
                    disabled={!!drug.percent}
                    onChange={(e) =>
                      handleInputChange(drug.id, "ratio", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    className={styles.inputCell}
                    value={drug.percent}
                    disabled={!!drug.ratio}
                    onChange={(e) =>
                      handleInputChange(drug.id, "percent", e.target.value)
                    }
                  />
                </td>
                <td className={styles.amountCell}>{drug.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.buttonContainer}>
          <button onClick={handleRemoveRow} className={styles.removeButton}>
            <Image src="/remove.svg" width={20} height={20} alt="Remove Row" />
          </button>
          <button onClick={handleAddRow} className={styles.addButton}>
            <Image src="/add.svg" width={20} height={20} alt="Add Row" />
          </button>
        </div>
        <button onClick={handleReset} className={styles.resetButton}>
          リセット
        </button>
      </div>
    </div>
  );
};

export default Calc;
