/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // เพิ่ม autoprefixer เพื่อให้สามารถใช้งานได้กับทุกเบราว์เซอร์
  },
};

export default config;
