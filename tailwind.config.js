import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maincolor: "#634E15", // สีหลัก
        seccolor: "#54524E", // สีรอง
        terticolor: "#826633", // สีน้ำตาลเข้ม2
        subcolor: "#6D685F", // สีเทา
        buttoncolormain: "#F8E0A0", // ปุ่มเมน
        buttoncolorsub: "#D7B250", // ปุ่มรอง
        buttoncolorsub2: "#9EB064", // ปุ่มรอง2
      },
      fontFamily: {
        caveat: ['var(--caveat-font)', "sans-serif"],
        sriracha: ['var(--sriracha-font)', "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide], // รวม plugin ไว้ในนี้เลย
};

export default config;
