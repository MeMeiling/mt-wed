"use client";

import { useState } from "react";
import Button from "../components/Button";
import QRModal from "../components/QRModal";


export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg1.jpg')" }} // ใช้ bg1.jpg เป็นพื้นหลัง
    >
      <div className="flex flex-col justify-start md:pt-[5%] pt-[10%] xl:pt-[4%] px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-maincolor mb-4 text-center drop-shadow-lg">
          Meiling & Tul
        </h1>
        <h3 className="text-3xl md:text-4xl font-medium text-[#ACB593] mb-4 md:mb-10 text-center drop-shadow-lg">
          - Wedding Wishes Garden -
        </h3>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 justify-center items-center">
          <Button
            variant="main" // ใช้ปุ่มแบบ main
            href="/guestbook"
            className=""
          >
            Join the Event !!
          </Button>
          <Button
            variant="sub" // ใช้ปุ่มแบบ secondary
            href="/garden"
            className=""
          >
            Visit the Garden
          </Button>
        </div>
      </div>

      <div className="fixed bottom-5 md:px-14 px-0 md:mb-4 mb-2 left-0 right-0 mx-6 flex justify-between items-center">
        {/* ปุ่ม "อยากใส่ซอง" */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white text-lg hover:underline"
        >
          <span className="text-shadow-lg font-sriracha flex items-center whitespace-nowrap">
            ส่งใจ ใส่ซอง
            <img src="/songicon.svg" alt="Song Icon" className="ml-2 w-8 h-8 mb-2" />
          </span>
        </button>

        {/* Text Link ไป Instagram Hashtag */}
        <a
          href="https://www.instagram.com/explore/tags/meitulwedding/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl font-bold hover:underline"
        >
          Lurk in #meitulwedding
        </a>
      </div>

      {/* Popup QR Modal */}
      <QRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}
