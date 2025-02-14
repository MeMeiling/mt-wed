"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase"; // นำเข้า Firestore config ของคุณ
import { collection, getDocs } from "firebase/firestore";
import Button from "/components/Button";
import Link from "next/link";

export default function FlowerGarden() {
  const [wishes, setWishes] = useState([]);
  const [flowerData, setFlowerData] = useState([]);
  const [flowerSize, setFlowerSize] = useState(100);
  const [selectedWish, setSelectedWish] = useState(null);

  useEffect(() => {
    const fetchWishes = async () => {
      const wishesCollection = collection(db, "wishes");
      const wishSnapshot = await getDocs(wishesCollection);
      const wishesList = wishSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishes(wishesList);
    };
    fetchWishes();
  }, []);

  const getFlowerCount = () => {
    if (window.innerWidth <= 768) return 22;
    else if (window.innerWidth <= 1024) return 42;
    return 60;
  };

  useEffect(() => {
    const updateFlowerSize = () => {
      setFlowerSize(window.innerWidth <= 768 ? 80 : 100);
    };
    updateFlowerSize();
    window.addEventListener("resize", updateFlowerSize);
    return () => window.removeEventListener("resize", updateFlowerSize);
  }, []);

  const generateFlowerPosition = () => {
    return {
      top: `${Math.random() * 85}%`,
      left: `${Math.random() * 85}%`,
    };
  };

  useEffect(() => {
    const flowerCount = getFlowerCount();
    let newFlowerData = wishes.slice(0, flowerCount).map(wish => ({
      ...wish,
      position: generateFlowerPosition(),
      image: `/flowers/flower-${Math.floor(Math.random() * 10) + 1}.svg`,
      visible: true,
    }));
    setFlowerData(newFlowerData);
  }, [wishes]);

  useEffect(() => {
    const flowerCount = getFlowerCount();
    let currentIndex = 0;
    const delayBetweenFlowers = 2000;

    const interval = setInterval(() => {
      setFlowerData(prevFlowers =>
        prevFlowers.map((flower, index) =>
          index === currentIndex
            ? { ...flower, visible: false }
            : flower
        )
      );
      setTimeout(() => {
        setFlowerData(prevFlowers =>
          prevFlowers.map((flower, index) =>
            index === currentIndex
              ? { ...flower, position: generateFlowerPosition(), visible: true }
              : flower
          )
        );
      }, 500);
      currentIndex = (currentIndex + 1) % flowerCount;
    }, delayBetweenFlowers);

    return () => clearInterval(interval);
  }, [flowerSize]);

  return (
    <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bg3.jpg')" }}>
      <div className="absolute bottom-4 left-4 z-50">
        <Link href="/" className="text-white text-3xl font-bold hover:underline">← Back to home</Link>
      </div>
      <div className="min-h-screen p-4 relative z-60">
        <h1 className="text-4xl md:text-4xl font-bold text-center text-maincolor mb-8">Flower Garden</h1>
        {flowerData.map(flower => (
          <div
            key={flower.id}
            className={`absolute cursor-pointer transition-opacity duration-500 ease-in-out ${flower.visible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              ...flower.position,
              width: `${flowerSize}px`,
              height: `${flowerSize}px`,
            }}
            onClick={() => setSelectedWish(flower)}
          >
            <div className="relative w-full h-full">
              <img src={flower.image} alt="Flower" className="w-full h-full" />
              {flower.imageUrl && (
                <img src={flower.imageUrl} className="absolute top-[calc(50%-4px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow-lg" alt="Wish Image" />
              )}
            </div>
          </div>
        ))}
        {selectedWish && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative box-background">
              <h2 className="text-3xl font-bold text-seccolor text-center mb-4">{selectedWish.name}</h2>

              <div className="relative"> {/* เพิ่ม relative ที่นี่ */}
                {/* รูปภาพของผู้ใช้งานในรูปแบบวงกลม */}
                {selectedWish.imageUrl && (
                  <img
                    src={selectedWish.imageUrl}
                    className="absolute top-[calc(50%-8px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white shadow-lg"
                    alt="Wish Image"
                  />
                )}
                <img src={selectedWish.image} className="w-32 h-32 mx-auto my-2" />
              </div>

              <p className="font-sriracha text-2xl text-seccolor text-center">" {selectedWish.message} "</p>
              <Button variant="main" onClick={() => setSelectedWish(null)} className="w-full mt-6">Close</Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
