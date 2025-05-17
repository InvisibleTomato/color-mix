import "./reset.css";
import "./globals.css";
import styles from "./layout.module.css";
import { Header } from "@/app/components/Header/Header";
import { Footer } from "@/app/components/Footer/Footer";
import { Noto_Sans_JP, Roboto } from "next/font/google";

export const metadata = {
  title: "Color Mix",
  description: "美容師向けのカラー剤調合計算アプリ",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-roboto",
});
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-jp",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${roboto.variable} ${notoSansJP.variable}`}>
      <body className={styles.body}>
        <Header />

        <main className={styles.main}>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
