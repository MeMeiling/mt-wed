"use client";

import { useState } from "react";
import Button from "../components/Button";
import QRModal from "../components/QRModal";

export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="h-screen bg-cover flex flex-col bg-top md:bg-[center_70%]"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >

      <div className="flex flex-col justify-start pt-[5%] px-4 flex-grow items-center">
        <h1 className="text-6xl md:text-7xl font-bold text-maincolor mb-2 md:mb-4 text-center drop-shadow-lg">
          Meiling & Tul
        </h1>
        <h3 className="text-3xl md:text-4xl font-medium text-[#ACB593] mb-4 md:mb-10 text-center drop-shadow-lg">
          - Wedding Wishes Garden -
        </h3>

        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center items-center w-3/4 md:w-full">
          <Button
            variant="main" // ใช้ปุ่มแบบ main
            href="/guestbook"
            className="w-full md:w-auto"
          >
            Join the Event !!
          </Button>
          <Button
            variant="sub" // ใช้ปุ่มแบบ secondary
            href="/garden"
            className="w-full md:w-auto"
          >
            Visit the Garden
          </Button>
          <Button
            variant="sub2"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center py-2.5 md:py-3 gap-3 w-full md:w-auto justify-center items-center"
          >
            <span className="font-sriracha text-lg whitespace-nowrap">ส่งใจ ใส่ซอง</span>
            <img src="/songicon.svg" alt="Song Icon" className="w-6 h-6 mb-1" />
          </Button>
        </div>



      </div>

      {/* Footer อยู่ที่ด้านล่างสุด */}
      <div className="px-4 md:px-14 py-4 text-white flex justify-between items-center mt-auto">
        {/* ปุ่ม "อยากใส่ซอง" */}
        <a
          href="/schedule"
          className="text-white text-3xl font-bold text-shadow-lg hover:underline"
        >
          Schedule
        </a>

        {/* Text Link ไป Instagram Hashtag */}
        <a
          href="https://www.instagram.com/explore/tags/meitulwedding/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-3xl font-bold text-shadow-lg hover:underline"
        >
          Lurk in #MeiTul
        </a>
      </div>

      {/* Popup QR Modal */}
      <QRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
