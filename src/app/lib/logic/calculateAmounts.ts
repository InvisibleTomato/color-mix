import type { Drug } from "@/app/lib/types/drug";

export const calculateAmounts = (
  drugs: Drug[],
  totalAmount: number
): Drug[] => {
  const percentAmounts = drugs.map((d) =>
    d.percent !== "" ? (Number(d.percent) / 100) * totalAmount : 0
  );

  const usedAmount = percentAmounts.reduce((acc, val) => acc + val, 0);
  const remainingAmount = totalAmount - usedAmount;

  const ratioValues = drugs.map((d) =>
    d.percent === "" ? Number(d.ratio) || 0 : 0
  );
  const ratioSum = ratioValues.reduce((acc, val) => acc + val, 0);

  return drugs.map((drug, i) => {
    const fromPercent = percentAmounts[i];
    const fromRatio =
      ratioSum > 0 ? (ratioValues[i] / ratioSum) * remainingAmount : 0;

    const finalAmount = fromPercent + fromRatio;

    return {
      ...drug,
      amount: finalAmount > 0 ? finalAmount.toFixed(2) : "",
    };
  });
};
