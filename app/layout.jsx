import { Caveat, Mali } from "next/font/google"; // นำเข้า Caveat และ Mali
import "./globals.css";

// กำหนดฟอนต์ Caveat (ฟอนต์หลัก)
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

// กำหนดฟอนต์ Mali (ฟอนต์เฉพาะบางส่วน)
const maliFont = Mali({ subsets: ["latin", "thai"], weight: ["400", "700"] });

export { maliFont }; // Export maliFont สำหรับการใช้งานในส่วนอื่น ๆ

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={caveatFont.className}>{children}</body>
    </html>
  );
}
