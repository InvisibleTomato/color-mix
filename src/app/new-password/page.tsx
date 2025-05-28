import NewPassword from "./NewPasswordClient";
import { Suspense } from "react";
// 動的レンダリング指定
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <NewPassword />
    </Suspense>
  );
}
