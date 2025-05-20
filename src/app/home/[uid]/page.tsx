"use client";
import { useParams } from "next/navigation";

export default function HomePage() {
  const params = useParams();
  const uid = params.uid as string;
  return (
    <div>
      <h1>ようこそ、ユーザー {uid} さん</h1>
      {/* ユーザーごとのデータをFirestoreから読み込むなど */}
    </div>
  );
}
