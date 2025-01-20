"use client";

import { useState, useEffect } from "react";
import Button from "/components/Button"; // Corrected import path
import Link from "next/link"; // ใช้ Link ของ Next.js

export default function FlowerGarden() {
  const wishes = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
    message: `ข้อความจาก ${index + 1}`,
  }));

  const [selectedWish, setSelectedWish] = useState(null);
  const [flowerData, setFlowerData] = useState([]);
  const [showFlowers, setShowFlowers] = useState(true);

  // ขนาดของดอกไม้ (คงที่)
  const flowerSize = 90;
  const spacingMultiplier = 50; // เพิ่มระยะห่าง
  const refreshInterval = 30000; // 30 วินาที (30,000 มิลลิวินาที)
  const delayBetweenFlowers = 3000; // ระยะเวลาในการสุ่มแต่ละดอก (3 วินาที)

  // ฟังก์ชันตรวจสอบการชนกัน (ห้ามทับพื้นที่ 90x90 px)
  const isOverlapping = (newPos, existingPositions, minDistance) => {
    return existingPositions.some((pos) => {
      const dx = Math.abs(parseFloat(newPos.left) - parseFloat(pos.left));
      const dy = Math.abs(parseFloat(newPos.top) - parseFloat(pos.top));
      return dx < minDistance && dy < minDistance; // ทดสอบการชนกันในระยะ +-90 px
    });
  };

  // ฟังก์ชันสุ่มตำแหน่งใหม่
  const generateFlowerPosition = () => {
    let newPos;
    let attempts = 0;
    let positions = flowerData.map(flower => flower.position);

    do {
      newPos = {
        top: `${Math.random() * (100 - (flowerSize * 2) / window.innerHeight * 100)}%`,
        left: `${Math.random() * (100 - (flowerSize * 2) / window.innerWidth * 100)}%`,
      };
      attempts++;
    } while (isOverlapping(newPos, positions, flowerSize * 3) && attempts < 100); // ปรับระยะห่างเป็น +-90px

    return newPos;
  };

  useEffect(() => {
    const newFlowerData = wishes.map((wish, index) => ({
      ...wish,
      position: generateFlowerPosition(), // สุ่มตำแหน่ง
      image: `/flowers/flower-${Math.floor(Math.random() * 7) + 1}.svg`,
    }));
    setFlowerData(newFlowerData);

    // ฟังก์ชันสุ่มตำแหน่งแต่ละดอก
    const randomizeFlowers = () => {
      wishes.forEach((wish, index) => {
        setTimeout(() => {
          setFlowerData((prevFlowerData) => {
            const updatedFlowers = [...prevFlowerData];
            updatedFlowers[index] = {
              ...updatedFlowers[index],
              position: generateFlowerPosition(),
              image: `/flowers/flower-${Math.floor(Math.random() * 7) + 1}.svg`,
            };
            return updatedFlowers;
          });
        }, index * delayBetweenFlowers);
      });
    };

    // เรียกใช้การสุ่มตำแหน่งดอกไม้ทุกๆ 30 วินาที
    const interval = setInterval(() => {
      randomizeFlowers(); // สุ่มตำแหน่งทุกๆ 30 วินาที
    }, refreshInterval);

    randomizeFlowers(); // เรียกใช้สุ่มตำแหน่งดอกไม้ครั้งแรก

    return () => clearInterval(interval); // ล้าง interval เมื่อออกจากหน้า
  }, []);

  const handleOpenModal = (flower) => {
    setSelectedWish(flower);
  };

  const handleCloseModal = () => {
    setSelectedWish(null);
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg3.jpg')" }}
    >
      {/* Back to Home */}
      <div className="absolute bottom-4 left-4 z-50">
        <Link href="/" className="text-white text-3xl font-bold hover:underline">
          ← Back to home
        </Link>
      </div>

      <div className="min-h-screen p-4 relative z-60">
        <h1 className="text-4xl md:text-4xl font-bold text-center text-maincolor mb-8">
          Flower Garden
        </h1>

        {/* แสดงดอกไม้ทั้งหมด */}
        {showFlowers && flowerData.map((flower) => (
          <div
            key={flower.id}
            className="absolute cursor-pointer transition-opacity duration-150 ease-out"
            style={{
              ...flower.position,
              width: `${flowerSize}px`,
              height: `${flowerSize}px`,
            }}
            onClick={() => handleOpenModal(flower)}
          >
            <img src={flower.image} alt="Flower" className="w-full h-full" />
          </div>
        ))}

        {/* Modal */}
        {selectedWish && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative box-background">
              <h2 className="text-3xl font-bold text-seccolor text-center mb-4">
                {selectedWish.name}
              </h2>
              <img
                src={selectedWish.image}
                className="w-32 h-32 mx-auto my-2"
              />
              <p className="font-sriracha text-2xl text-seccolor text-center">
                " {selectedWish.message} "
              </p>
              <Button variant="main" onClick={handleCloseModal} className="w-full mt-6">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
