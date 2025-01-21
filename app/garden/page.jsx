"use client";

import { useState, useEffect } from "react";
import Button from "/components/Button";
import Link from "next/link";

export default function FlowerGarden() {
  const wishes = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
    message: `ข้อความจาก ${index + 1}`,
  }));

  const [selectedWish, setSelectedWish] = useState(null);
  const [flowerData, setFlowerData] = useState([]);
  const [showFlowers, setShowFlowers] = useState(true);
  const [flowerSize, setFlowerSize] = useState(100);

  const refreshInterval = 25000;
  const delayBetweenFlowers = 3000;

  // ฟังก์ชันสุ่มจำนวนดอกไม้ตามขนาดหน้าจอ
  const getFlowerCount = () => {
    if (window.innerWidth <= 768) {
      return 22; // จอขนาดเล็ก
    } else if (window.innerWidth <= 1024) {
      return 42; // จอขนาดกลาง
    } else {
      return 62; // จอขนาดใหญ่
    }
  };

  // ฟังก์ชันปรับขนาดดอกไม้ตามขนาดหน้าจอ
  useEffect(() => {
    const updateFlowerSize = () => {
      setFlowerSize(window.innerWidth <= 768 ? 80 : 100);
    };

    updateFlowerSize();
    window.addEventListener("resize", updateFlowerSize);
    return () => window.removeEventListener("resize", updateFlowerSize);
  }, []);

  const generateFlowerPosition = () => {
    let newPos;
    let attempts = 0;
    let positions = flowerData.map(flower => flower.position);

    do {
      newPos = {
        top: `${Math.random() * (100 - (flowerSize / window.innerHeight) * 100)}%`,
        left: `${Math.random() * (100 - (flowerSize / window.innerWidth) * 100)}%`,
      };
      attempts++;
    } while (positions.some(pos => {
      const dx = Math.abs(parseFloat(newPos.left) - parseFloat(pos.left));
      const dy = Math.abs(parseFloat(newPos.top) - parseFloat(pos.top));
      return dx < flowerSize * 5 && dy < flowerSize * 5;
    }) && attempts < 100);

    return newPos;
  };

  useEffect(() => {
    const flowerCount = getFlowerCount();

    const newFlowerData = wishes.slice(0, flowerCount).map(wish => ({
      ...wish,
      position: generateFlowerPosition(),
      image: `/flowers/flower-${Math.floor(Math.random() * 10) + 1}.svg`,
    }));
    setFlowerData(newFlowerData);

    const interval = setInterval(() => {
      setFlowerData(prevFlowerData =>
        prevFlowerData.map(flower => ({
          ...flower,
          position: generateFlowerPosition(),
        }))
      );
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [flowerSize]);

  return (
    <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bg3.jpg')" }}>
      <div className="absolute bottom-4 left-4 z-50">
        <Link href="/" className="text-white text-3xl font-bold hover:underline">
          ← Back to home
        </Link>
      </div>

      <div className="min-h-screen p-4 relative z-60">
        <h1 className="text-4xl md:text-4xl font-bold text-center text-maincolor mb-8">
          Flower Garden
        </h1>

        {showFlowers && flowerData.map((flower) => (
          <div
            key={flower.id}
            className="absolute cursor-pointer transition-opacity duration-150 ease-out"
            style={{
              ...flower.position,
              width: `${flowerSize}px`,
              height: `${flowerSize}px`,
            }}
            onClick={() => setSelectedWish(flower)}
          >
            <img src={flower.image} alt="Flower" className="w-full h-full" />
          </div>
        ))}

        {selectedWish && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative box-background">
              <h2 className="text-3xl font-bold text-seccolor text-center mb-4">
                {selectedWish.name}
              </h2>
              <img src={selectedWish.image} className="w-32 h-32 mx-auto my-2" />
              <p className="font-sriracha text-2xl text-seccolor text-center">
                " {selectedWish.message} "
              </p>
              <Button variant="main" onClick={() => setSelectedWish(null)} className="w-full mt-6">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
