"use client";
import React, { useState, useEffect } from "react";
import styles from "./UsersCalc.module.scss";
import Image from "next/image";

type Drug = {
  id: number;
  name: string;
  ratio: string;
  percent: string;
  amount: string;
};

const UsersCalc = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [drugs, setDrugs] = useState<Drug[]>([
    { id: 1, name: "薬剤1", ratio: "", percent: "", amount: "" },
  ]);

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
    const percentAmounts = drugs.map((d) =>
      d.percent !== "" ? (Number(d.percent) / 100) * totalAmount : 0
    );

    const usedAmount = percentAmounts.reduce((acc, val) => acc + val, 0);
    const remainingAmount = totalAmount - usedAmount;

    const ratioValues = drugs.map((d) =>
      d.percent === "" ? Number(d.ratio) || 0 : 0
    );
    const ratioSum = ratioValues.reduce((acc, val) => acc + val, 0);

    const updatedDrugs = drugs.map((drug, i) => {
      const fromPercent = percentAmounts[i];
      const fromRatio =
        ratioSum > 0 ? (ratioValues[i] / ratioSum) * remainingAmount : 0;
      const amount = (fromPercent + fromRatio).toFixed(2);
      return { ...drug, amount };
    });

    const isChanged = updatedDrugs.some((d, i) => d.amount !== drugs[i].amount);
    if (isChanged) {
      setDrugs(updatedDrugs);
    }
  }, [totalAmount, drugs]);

  return (
    <div>
      <div className={styles.calcInputContainer}>
        <div className={styles.totalAmountContainer}>
          <h2 className={styles.totalAmountTitle}>1剤の総量</h2>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            className={styles.totalAmountInput}
          />
          <p className={styles.totalAmountText}>g</p>
        </div>
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
            {drugs.map((drug) => (
              <tr key={drug.id}>
                <td>{drug.name}</td>
                <td>
                  <input
                    type="number"
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
      </div>
    </div>
  );
};

export default UsersCalc;
