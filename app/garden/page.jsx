"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function FlowerGarden() {
  const [wishes, setWishes] = useState([]);
  const [visibleFlowers, setVisibleFlowers] = useState([]);
  const [selectedWish, setSelectedWish] = useState(null);
  const [flowerSize, setFlowerSize] = useState(120);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [flowerImages] = useState(() => {
    return Array.from({ length: 60 }, (_, index) =>
      `/flowers/flower-${(index % 10) + 1}.svg`
    );
  });

  const getFlowerCount = () => {
    if (typeof window === "undefined") return 50;
    if (window.innerWidth <= 768) return 30;
    if (window.innerWidth <= 1024) return 40;
    return 60;
  };

  const generateFlowerPosition = () => {
    const padding = 10;
    const flowerSize = 100; // ปรับขนาดตามจริง
  
    const minHeight = -window.innerHeight * 0.08; // -8% ของหน้าจอ
    const maxHeight = (window.innerHeight * 0.9) - flowerSize - padding; // สูงสุด 90%
  
    const minWidth = -window.innerWidth * 0.1; // -10% ของความกว้างหน้าจอ
  const maxWidth = window.innerWidth - flowerSize - padding; // สูงสุด 100%
  
    return {
      top: `${minHeight + Math.random() * (maxHeight - minHeight)}px`,
      left: `${minWidth + Math.random() * (maxWidth - minWidth)}px`,
    };
  };
  

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload(); // รีเฟรชหน้าเว็บ
    }, 5 * 60 * 1000); // 5 นาที
  
    return () => clearInterval(refreshInterval); // เคลียร์ interval เมื่อออกจากหน้า
  }, []);
  

  useEffect(() => {
    const fetchWishes = async () => {
      const wishesCollection = collection(db, "wishes");
      const wishSnapshot = await getDocs(wishesCollection);
      const wishesList = wishSnapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        image: flowerImages[index % flowerImages.length],
      }));

      setWishes(wishesList);
      setVisibleFlowers(
        wishesList.slice(0, getFlowerCount()).map(wish => ({ ...wish, ...generateFlowerPosition(), fading: false }))
      );
    };

    fetchWishes();
  }, [flowerImages]);

  useEffect(() => {
    const updateFlowerSize = () => {
      setFlowerSize(window.innerWidth <= 768 ? 100 : 120);
    };
    updateFlowerSize();
    window.addEventListener("resize", updateFlowerSize);
    return () => window.removeEventListener("resize", updateFlowerSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleFlowers(prevFlowers => {
        if (wishes.length === 0) return prevFlowers;

        const nextIndex = (currentIndex + 1) % wishes.length;
        setCurrentIndex(nextIndex);

        return prevFlowers.map((flower, i) =>
          i === 0 ? { ...flower, fading: true } : flower
        );
      });

      setTimeout(() => {
        setVisibleFlowers(prevFlowers => [
          ...prevFlowers.slice(1),
          { ...wishes[currentIndex], ...generateFlowerPosition(), fading: false },
        ]);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [wishes, currentIndex]);

  return (
    <div className="h-screen bg-cover bg-center relative p-6 overflow-hidden" style={{ backgroundImage: "url('/bg3.jpg')" }}>
      <div className="absolute bottom-4 left-4 z-50">
        <Link href="/" className="text-white text-3xl font-bold hover:underline">← Back to home</Link>
      </div>
      <h1 className="text-4xl font-bold text-center text-maincolor mb-8">Flower Garden</h1>
      <div className="relative w-full h-screen">
        {visibleFlowers.map((wish) => (
          <div
            key={wish.id}
            className={`absolute transition-opacity duration-1000 ease-in-out transform scale-95 opacity-0 
              ${wish.fading ? 'opacity-0' : 'opacity-100 scale-100'}`}
            style={{
              width: flowerSize,
              height: flowerSize,
              left: wish.left,
              top: wish.top,
            }}
            onClick={() => setSelectedWish(wish)}
          >
            <img
              src={wish.image}
              alt="Flower"
              className="w-full h-full"
              style={{ filter: "drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.6))" }}
            />

            {wish.imageUrl && (
              <img src={wish.imageUrl} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white shadow-lg" alt="Wish Image" />
            )}
          </div>
        ))}
      </div>
      {selectedWish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative box-background">
            <h2 className="text-3xl font-sriracha font-bold text-seccolor text-center mb-4">{selectedWish.name}</h2>
            <div className="relative">
              {selectedWish.imageUrl && (
                <img 
                src={selectedWish.imageUrl} 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white shadow-lg z-50"
                alt="Wish Image" 
              />
              )}
              <img src={selectedWish.image} className="z-1 w-32 h-32 mx-auto my-2 drop-shadow-xl" alt="Flower" />
            </div>
            <p className="font-sriracha text-2xl text-seccolor text-center">" {selectedWish.message} "</p>
            <button onClick={() => setSelectedWish(null)} className="w-full mt-6 bg-maincolor text-xl text-white py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}