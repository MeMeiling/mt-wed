import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsFont = Poppins({ subsets: ["latin"], weight:["200", "300", "400", "600", "900"] });


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={poppinsFont.className}>{children}</body>
    </html>
  );
}
