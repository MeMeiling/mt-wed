"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Button from "/components/Button";
import Link from "next/link";

export default function FlowerGarden() {
  const [wishes, setWishes] = useState([]);
  const [flowerData, setFlowerData] = useState([]);
  const [flowerSize, setFlowerSize] = useState(100);
  const [selectedWish, setSelectedWish] = useState(null);
  const usedWishIds = useRef(new Set()); // เก็บ ID ของ wish ที่ใช้ไปแล้ว

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
    if (typeof window === "undefined") return 40;
    if (window.innerWidth <= 768) return 20;
    if (window.innerWidth <= 1024) return 40;
    return 60;
  };

  useEffect(() => {
    const updateFlowerSize = () => {
      setFlowerSize(window.innerWidth <= 768 ? 100 : 120);
    };
    updateFlowerSize();
    window.addEventListener("resize", updateFlowerSize);
    return () => window.removeEventListener("resize", updateFlowerSize);
  }, []);

  const generateFlowerPosition = () => {
    const maxPercentage = window.innerWidth < 640 ? 80 : 85;
    return {
      top: `${Math.random() * maxPercentage}%`,
      left: `${Math.random() * maxPercentage}%`,
    };
  };

  useEffect(() => {
    if (wishes.length === 0) return;

    const flowerCount = getFlowerCount();
    let availableWishes = wishes.filter(wish => !usedWishIds.current.has(wish.id));
    if (availableWishes.length < flowerCount) {
      usedWishIds.current.clear(); // รีเซ็ตเมื่อ wish ไม่พอ
      availableWishes = wishes;
    }

    const newFlowerData = Array.from({ length: flowerCount }).map(() => {
      const randomWish = availableWishes[Math.floor(Math.random() * availableWishes.length)];
      usedWishIds.current.add(randomWish.id);
      return {
        ...randomWish,
        position: generateFlowerPosition(),
        image: `/flowers/flower-${Math.floor(Math.random() * 10) + 1}.svg`,
        visible: true,
      };
    });

    setFlowerData(newFlowerData);
  }, [wishes]);

  // ทำให้ดอกไม้หายไปแล้วสุ่ม wish ใหม่มาแทน
  useEffect(() => {
    if (flowerData.length === 0) return;

    const interval = setInterval(() => {
      setFlowerData(prevFlowers => {
        const newFlowers = [...prevFlowers];

        // เลือกดอกไม้ที่จะหายแบบสุ่ม
        const randomIndex = Math.floor(Math.random() * newFlowers.length);
        newFlowers[randomIndex] = { ...newFlowers[randomIndex], visible: false };

        setTimeout(() => {
          let availableWishes = wishes.filter(wish => !usedWishIds.current.has(wish.id));

          // ถ้า wish หมดแล้วให้รีเซ็ต
          if (availableWishes.length === 0) {
            usedWishIds.current.clear();
            availableWishes = wishes;
          }

          const newWish = availableWishes[Math.floor(Math.random() * availableWishes.length)];
          usedWishIds.current.add(newWish.id);

          newFlowers[randomIndex] = {
            ...newWish,
            position: generateFlowerPosition(),
            image: `/flowers/flower-${Math.floor(Math.random() * 10) + 1}.svg`,
            visible: true,
          };

          setFlowerData([...newFlowers]);
        }, 500);
        return newFlowers;
      });
    }, 3000); // ทุก 3 วินาทีเปลี่ยนดอกไม้ใหม่

    return () => clearInterval(interval);
  }, [flowerData, wishes]);

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
                <img src={flower.imageUrl} className="absolute top-[calc(50%-4px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-14 md:h-14 w-12 h-12 rounded-full border-2 border-white shadow-lg" alt="Wish Image" />
              )}
            </div>
          </div>
        ))}
        {selectedWish && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative box-background">
              <h2 className="text-3xl font-sriracha font-bold text-seccolor text-center mb-4">{selectedWish.name}</h2>
              <div className="relative">
                {selectedWish.imageUrl && (
                  <img
                    src={selectedWish.imageUrl}
                    className="absolute top-[calc(50%-4px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white shadow-lg"
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
