"use client";

export default function FormPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 flex flex-col items-center"
      style={{ backgroundImage: "url('/bg3.jpg')" }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-maincolor font-sriracha mb-4 text-center">
        🌼 แบบฟอร์มลงทะเบียน 🌼
      </h1>
      <p className="text-xl text-seccolor font-sriracha mb-8 text-center max-w-xl">
        กรุณากรอกข้อมูลในฟอร์มด้านล่างเพื่อยืนยันการเข้าร่วมของคุณนะคะ 💖
      </p>

      <div className="w-full max-w-3xl overflow-hidden">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSd3j5KvwECv4QX8z5FY77tgyvG5_fPN1Mb3ETPHeY67oVK_qQ/viewform?embedded=true"
          width="100%"
          height="700"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Google Form"
          className="w-full"
        >
          กำลังโหลด…
        </iframe>
      </div>

      <a
        href="/"
        className="mt-8 text-white text-xl font-bold bg-maincolor px-6 py-2 rounded-full hover:brightness-110 transition font-sriracha"
      >
        ← กลับหน้าแรก
      </a>
    </div>
  );
}
