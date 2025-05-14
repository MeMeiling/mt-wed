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

  const animalImages = Array.from({ length: 19 }, (_, i) => `/animals/${i + 1}.jpg`);


  const getFlowerCount = () => {
    if (typeof window === "undefined") return 60;
    if (window.innerWidth <= 500) return 24;
    if (window.innerWidth <= 800) return 46;
    if (window.innerWidth <= 1600) return 56;
    return 80;
  };

  const generateFlowerPosition = () => {
    const padding = 10;
    const minHeight = -window.innerHeight * 0.1;
    const maxHeight = window.innerHeight * 0.9 - flowerSize - padding;

    let minWidth, maxWidth;
    if (window.innerWidth <= 768) {
      minWidth = -window.innerWidth * 0.1;
      maxWidth = window.innerWidth - flowerSize - padding;
    } else {
      minWidth = -window.innerWidth * 0.03;
      maxWidth = window.innerWidth - flowerSize - padding;
    }

    return {
      top: `${minHeight + Math.random() * (maxHeight - minHeight)}px`,
      left: `${minWidth + Math.random() * (maxWidth - minWidth)}px`,
    };
  };

  useEffect(() => {
    const fetchWishes = async () => {
      const wishesCollection = collection(db, "wishes");
      const wishSnapshot = await getDocs(wishesCollection);

      const shuffleArray = (array) => {
        return array
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      };

      const wishesList = shuffleArray(
        wishSnapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
          image: flowerImages[index % flowerImages.length],
          imageUrl: animalImages[index % animalImages.length], // ใส่รูปหมาแมวแทน
        }))
      );

      setWishes(wishesList);

      const initialFlowers = wishesList.slice(0, getFlowerCount()).map((wish) => ({
        ...wish,
        ...generateFlowerPosition(),
        fading: true,
      }));

      setVisibleFlowers(initialFlowers);

      setTimeout(() => {
        setVisibleFlowers((prev) =>
          prev.map((wish) => ({ ...wish, fading: false }))
        );
      }, 50);

      setCurrentIndex(getFlowerCount());
    };

    fetchWishes();
  }, [flowerImages]);

  useEffect(() => {
    const updateFlowerSize = () => {
      setFlowerSize(window.innerWidth <= 800 ? 100 : 120);
    };
    updateFlowerSize();
    window.addEventListener("resize", updateFlowerSize);
    return () => window.removeEventListener("resize", updateFlowerSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleFlowers((prevFlowers) => {
        if (wishes.length === 0) return prevFlowers;

        const nextIndex = currentIndex >= wishes.length ? 0 : currentIndex;
        setCurrentIndex(nextIndex + 1);

        const newFlower = {
          ...wishes[nextIndex],
          ...generateFlowerPosition(),
          fading: true,
        };

        const updated = [...prevFlowers.slice(1), newFlower];

        setTimeout(() => {
          setVisibleFlowers((current) =>
            current.map((f, i) =>
              i === updated.length - 1 ? { ...f, fading: false } : f
            )
          );
        }, 50);
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [wishes, currentIndex]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 15 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div
      className="h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/bg3.jpg')" }}
    >
       <div className="absolute w-full bottom-4 px-4 md:px-6 flex justify-between items-center z-50">
        {/* ปุ่ม "Back to home" */}
        <Link href="/" className="text-white text-[22px] md:text-2xl font-bold text-shadow-lg hover:underline">
          ← Home
        </Link>
        <Link href="/export" className="text-white text-[22px] md:text-2xl font-bold text-shadow-lg hover:underline">
          View all
        </Link>
        {/* Text Link ไป Instagram */}
        <div className="flex items-center justify-center gap-1 text-white text-[22px] md:text-2xl font-bold text-shadow-lg hover:underline">
          <a
            href="https://www.instagram.com/meitul.bloomingspace/"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            Gallery
          </a>
          <img
            src="/Instagram.png"
            alt="Instagram"
            className="w-8 h-8 mt-2"
          />
        </div>
      </div>
      <h1 className="text-5xl font-bold text-center text-maincolor mt-6">
        Flower Garden
      </h1>
      <div className="relative w-full h-screen">
        {visibleFlowers.map((wish) => (
          <div
            key={wish.id}
            className={`absolute transition-all transition-opacity duration-800 ease-in-out transform scale-95 opacity-0
              ${wish.fading ? "opacity-0" : "opacity-100 scale-100"} 
              transition-transform duration-300 hover:scale-105 hover:drop-shadow-[8px_8px_10px_rgba(0,0,0,0.2)]`}
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
              style={{
                filter: "drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.6))",
              }}
            />
            {wish.imageUrl && (
              <img
                src={wish.imageUrl}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white shadow-lg"
                alt="Wish Image"
              />
            )}
          </div>
        ))}
      </div>
      {selectedWish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative box-background">
            <h2 className="text-3xl font-sriracha font-bold text-seccolor text-center max-h-[70px] overflow-y-auto overflow-x-hidden scrollbar-hide">
              {selectedWish.name}
            </h2>
            <div className="relative">
              {selectedWish.imageUrl && (
                <img
                  src={selectedWish.imageUrl}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white shadow-lg z-50"
                  alt="Wish Image"
                />
              )}
              <img
                src={selectedWish.image}
                className="z-1 w-40 h-40 mx-auto my-2 drop-shadow-xl"
                alt="Flower"
              />
            </div>
            <p className="font-sriracha text-2xl text-seccolor text-center max-h-[260px] overflow-y-auto overflow-x-hidden scrollbar-hide">
              " {selectedWish.message} "
            </p>
            <button
              onClick={() => setSelectedWish(null)}
              className="w-full mt-6 bg-maincolor text-xl text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
