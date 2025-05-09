import { Caveat, Sriracha } from "next/font/google"; // นำเข้า Caveat และ Sriracha
import "./globals.css";

// กำหนดฟอนต์ Caveat (ฟอนต์หลัก)
const caveatFont = Caveat({ variable: '--caveat-font', subsets: ["latin"], weight: ["400", "700"] });

// กำหนดฟอนต์ Sriracha (ฟอนต์เฉพาะบางส่วน)
const srirachaFont = Sriracha({ variable: '--sriracha-font', subsets: ["latin", "thai"], weight: ["400"], display: "swap", });

export { srirachaFont }; // Export srirachaFont สำหรับการใช้งานในส่วนอื่น ๆ

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${caveatFont.variable} ${srirachaFont.variable}`}>      {/* ฟอนต์หลักถูกกำหนดที่นี่ */}
        {children}
      </body>
    </html>
  );
}
