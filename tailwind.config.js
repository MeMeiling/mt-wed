import type { Config } from "tailwindcss";

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
        buttoncolormain: "#F8E0A0", // ปุ่มเมน
        buttoncolorsub: "#D7B250", // ปุ่มรอง
      },
      fontFamily: {
        caveat: ["Caveat", "sans-serif"], // ฟอนต์ Caveat
        sriracha: ["Sriracha", "sans-serif"], // ฟอนต์ Sriracha
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
