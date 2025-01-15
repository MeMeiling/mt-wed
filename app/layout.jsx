import { Caveat, Sriracha } from "next/font/google"; // นำเข้า Caveat และ Sriracha
import "./globals.css";

// กำหนดฟอนต์ Caveat (ฟอนต์หลัก)
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

// กำหนดฟอนต์ Sriracha (ฟอนต์เฉพาะบางส่วน)
const srirachaFont = Sriracha({ subsets: ["latin", "thai"], weight: ["400"] });

export { srirachaFont }; // Export srirachaFont สำหรับการใช้งานในส่วนอื่น ๆ

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={caveatFont.className}>  {/* ใช้ฟอนต์ Caveat เป็นหลัก */}
        {children}
      </body>
    </html>
  );
}
