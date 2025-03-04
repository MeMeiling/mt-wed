"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function FlowerGarden() {
  const [wishes, setWishes] = useState([]);
  const [flowerData, setFlowerData] = useState([]);
  const [flowerSize, setFlowerSize] = useState(100);
  const [selectedWish, setSelectedWish] = useState(null);
  const usedWishIds = useRef(new Set());

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
      availableWishes = [...wishes];
    }

    const shuffledWishes = availableWishes.sort(() => Math.random() - 0.5).slice(0, flowerCount);

    const newFlowerData = shuffledWishes.map(wish => {
      usedWishIds.current.add(wish.id);
      return {
        ...wish,
        position: generateFlowerPosition(),
        image: `/flowers/flower-${Math.floor(Math.random() * 10) + 1}.svg`,
        visible: true,
      };
    });

    setFlowerData(newFlowerData);

    const interval = setInterval(() => {
      setFlowerData(prevFlowers => {
        const disappearingIndex = Math.floor(Math.random() * prevFlowers.length);
        return prevFlowers.map((flower, index) =>
          index === disappearingIndex ? { ...flower, visible: false } : flower
        );
      });

      setTimeout(() => {
        let availableWishesForRespawn = wishes.filter(wish => !usedWishIds.current.has(wish.id));
        if (availableWishesForRespawn.length === 0) {
          usedWishIds.current.clear();
          availableWishesForRespawn = [...wishes];
        }

        const shuffledRespawnWishes = availableWishesForRespawn.sort(() => Math.random() - 0.5);

        setFlowerData(prevFlowers =>
          prevFlowers.map(flower =>
            !flower.visible
              ? {
                  ...shuffledRespawnWishes.pop(),
                  position: generateFlowerPosition(),
                  visible: true,
                  image: `/flowers/flower-${Math.floor(Math.random() * 10) + 1}.svg`,
                }
              : flower
          )
        );
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [wishes]);

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
            className={`absolute cursor-pointer transition-opacity duration-10000 ease-in-out ${flower.visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ ...flower.position, width: `${flowerSize}px`, height: `${flowerSize}px` }}
            onClick={() => setSelectedWish(flower)}
          >
            <div className="relative w-full h-full">
              <img src={flower.image} alt="Flower" className="w-full h-full" />
              {flower.imageUrl && (
                <img src={flower.imageUrl} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-14 md:h-14 w-12 h-12 rounded-full border-2 border-white" alt="Wish Image" />
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
                  <img src={selectedWish.imageUrl} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white shadow-lg" alt="Wish Image" />
                )}
                <img src={selectedWish.image} className="w-32 h-32 mx-auto my-2" />
              </div>
              <p className="font-sriracha text-2xl text-seccolor text-center">" {selectedWish.message} "</p>
              <button onClick={() => setSelectedWish(null)} className="w-full mt-6 bg-maincolor text-xl text-white py-2 rounded-lg">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
