"use client";
import Link from "next/link";

export default function FormPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 flex flex-col items-center"
      style={{ backgroundImage: "url('/bg4.JPG')" }}
    >
      <div className="w-full max-w-xl md:p-6 box-background relative">
        <div className="w-full px-2 pt-6 md:py-3 pb-2">
          <h1 className="text-4xl font-bold md:text-6xl font-bold text-maincolor mb-3 text-center">
            NO.1 Friend Arena!
          </h1>
          <p className="text-2xl/7 md:text-3xl font-medium text-[#796F5C] font-bold text-center max-w-xl">
            You've been invited to the battle.<br />Step up and give it your best!
          </p>
        </div>

        <div className="w-full max-w-3xl overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd3j5KvwECv4QX8z5FY77tgyvG5_fPN1Mb3ETPHeY67oVK_qQ/viewform?embedded=true"
            width="100%"
            height="640"
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
          href="https://docs.google.com/forms/d/e/1FAIpQLSd3j5KvwECv4QX8z5FY77tgyvG5_fPN1Mb3ETPHeY67oVK_qQ/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 mb-6 md:mb-2 text-[#796F5C] text-center text-2xl underline"
        >
          go to original quiz
        </a>



      </div>

      {/* Mobile Back to Home Link */}
      <div className="block mt-6">
        <Link href="/" className="text-white text-3xl font-bold text-shadow-lg hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
