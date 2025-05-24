import React from "react";
import styles from "./Calc.module.scss";

const Calc = () => {
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
            {[
              { name: "A剤", ratio: "", percent: "", amount: "30g" },
              { name: "B剤", ratio: "", percent: "", amount: "30g" },
              { name: "C剤", ratio: "", percent: "", amount: "60g" },
              { name: "D剤", ratio: "", percent: "", amount: "3.0g" },
            ].map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={row.ratio}
                    className={styles.inputCell}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={row.percent}
                    className={styles.inputCell}
                  />
                </td>
                <td className={styles.amountCell}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calc;
