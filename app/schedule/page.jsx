"use client";

import Link from "next/link";
import { useState } from "react";
import QRModal from "/components/QRModal";
import React from "react";

export default function SchedulePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const weddingSchedule = [
        { time: "06:00", text: "รับประทานอาหารเช้า และร่วมถ่ายรูปเก็บภาพความทรงจำก่อนเริ่มพิธี" },
        { time: "07:30", text: "เริ่มงานพิธีการ เจ้าบ่าวเดินขบวนเข้าสู่งาน" },
        { time: "07:45", text: "พิธีสู่ขอ รับมอบสินสอด และสวมแหวน" },
        { time: "08:15", text: "พิธียกน้ำชา ขอบคุณญาติผู้ใหญ่" },
        { time: "10:00", text: "สิ้นสุดงานพิธีมงคลสมรส" },
    ];

    const partySchedule = [
        { time: "10:00", text: "เริ่ม Check in และร่วมกิจกรรมเล็กๆ น้อยๆ ที่บริเวณหน้างาน" },
        { time: "10:30", text: "ร่วมถ่ายรูปกับบ่าวสาว เก็บภาพน่ารักๆ" },
        { time: "11:00", text: "เริ่มรับประทานอาหารเที่ยง" },
        { time: "11:30", custom: true },
        { time: "12:30", text: "ตามหาผู้โชคดีรับช่อดอกไม้จากเจ้าสาว และตัดเค้ก" },
        { time: "13:00", text: "สิ้นสุดงาน ขอบคุณทุกคนที่มาอยู่ด้วยกันในวันพิเศษ" },
    ];

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 relative"
            style={{ backgroundImage: "url('/bg2.jpg')" }}
        >
            <div className="flex-1 flex flex-col my-10 items-center justify-center w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-maincolor mb-6">Schedule</h1>

                <div className="font-sriracha w-full max-w-lg px-5 md:px-10 py-8 text-xl box-background">
                    <div className="mb-10">
                        <h2 className="text-xl text-seccolor items-center flex flex-col font-semibold">
                            ช่วงงานพิธีมงคลสมรส
                        </h2>

                        <div className="grid grid-cols-[46px_1fr] my-6 gap-x-3 md:gap-x-4 gap-y-4 text-subcolor text-base">
                            {weddingSchedule.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="font-semibold mt-0.5">{item.time}</div>
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <img src="/miniflower.svg" alt="flower icon" className="w-6 h-6" />
                                        <div
                                            className="leading-snug mt-0.5"
                                            dangerouslySetInnerHTML={{ __html: item.text }}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-xl text-seccolor items-center flex flex-col font-semibold">
                            ช่วงงานเลี้ยง และกิจกรรม
                        </h2>

                        <div className="grid grid-cols-[46px_1fr] my-6 gap-x-3 md:gap-x-4 gap-y-4 text-subcolor text-base">
                            {partySchedule.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="font-semibold mt-0.5">{item.time}</div>
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <img src="/miniflower.svg" alt="flower icon" className="w-6 h-6 mt-0.5" />
                                        {item.custom ? (
                                            <div className="leading-snug flex flex-col gap-y-1">
                                                <p>พูดคุยกับบ่าวสาว และเล่นเกม ลุ้นรับของรางวัล</p>
                                                <Link href="/quiz" className="underline text-seccolor hover:opacity-80">
                                                    ไปเล่นเกม →
                                                </Link>
                                            </div>
                                        ) : (
                                            <div
                                                className="leading-snug"
                                                dangerouslySetInnerHTML={{ __html: item.text }}
                                            />
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <p className="text-base text-seccolor text-center font-sriracha mb-2">
                        หากนำภาชนะมาใส่ดอกไม้ หลังจากการเคลียร์สถานที่แล้วสามารถแจ้งคุณเจ้าหน้าที่ได้เลย มาช่วยลดขยะกันนะ
                    </p>
                </div>
            </div>

            {/* ลิงก์ด้านล่าง */}
            <div className="w-full mb-4 bottom-5 left-0 right-0 md:px-14 px-0 flex justify-between items-center">
                <Link href="/" className="text-white text-3xl font-bold text-shadow-lg hover:underline">
                    ← Back to home
                </Link>

                {/* Text Link ไป Instagram */}
                <div className="flex items-center justify-center gap-1 text-white text-3xl font-bold text-shadow-lg hover:underline">
                    <a
                        href="https://www.instagram.com/meitulday/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                    >
                        Gallery
                    </a>
                    <img
                        src="/Instagram.png"
                        alt="Instagram"
                        className="w-10 h-10 mt-2"
                    />
                </div>
            </div>

            {/* Popup QR Modal */}
            <QRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
