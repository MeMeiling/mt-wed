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
      },
      fontFamily: {
        caveat: ['var(--caveat-font)', "sans-serif"],
        sriracha: ['var(--sriracha-font)', "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [scrollbarHide], // รวม plugin ไว้ในนี้เลย
};

export default config;
