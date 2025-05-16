import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import styles from "./layout.module.css";
import { Header } from "@/app/components/Header/Header";
import { Footer } from "@/app/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Color Mix",
  description: "美容師向けのカラー剤比率計算アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={styles.body}>
        <Header />

        <main className={styles.main}>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
