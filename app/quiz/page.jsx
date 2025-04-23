"use client";
import Link from "next/link";

export default function FormPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 flex flex-col items-center"
      style={{ backgroundImage: "url('/bg4.jpg')" }}
    >
      <div className="w-full max-w-xl md:p-6 box-background relative">
        <div className="w-full px-2 py-4">
        <h1 className="text-4xl font-bold md:text-5xl font-bold text-maincolor mb-4 text-center">
        Do You Know Us Well?
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-[#796F5C] text-center max-w-xl">
        Remember, guessing is half the fun!
        </p>
        </div>

        <div className="w-full max-w-3xl overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd3j5KvwECv4QX8z5FY77tgyvG5_fPN1Mb3ETPHeY67oVK_qQ/viewform?embedded=true"
            width="100%"
            height="550"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Google Form"
            className="w-full"
          >
            กำลังโหลด…
          </iframe>
        </div>
      </div>

      {/* Mobile Back to Home Link */}
      <div className="block mt-6">
        <Link href="/" className="text-white text-3xl font-bold hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
