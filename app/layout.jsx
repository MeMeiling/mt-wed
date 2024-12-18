import { Caveat } from "next/font/google"; // เปลี่ยนเป็น Caveat
import "./globals.css";

// กำหนดฟอนต์ Caveat พร้อมน้ำหนัก
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={caveatFont.className}>{children}</body>
    </html>
  );
}
