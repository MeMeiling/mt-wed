"use client";

import { useState } from "react";

export default function FlowerGarden() {
  const wishes = [
    {
      id: 1,
      name: "Alice",
      message: "Congratulations on your wedding!",
      image: "/path/to/image1.jpg",
    },
    {
      id: 2,
      name: "Bob",
      message: "Wishing you a lifetime of love and happiness!",
      image: "/path/to/image2.jpg",
    },
    {
      id: 3,
      name: "Charlie",
      message: "May your journey together be filled with joy!",
      image: "/path/to/image3.jpg",
    },
  ];

  const [selectedWish, setSelectedWish] = useState(null);

  const handleOpenModal = (wish) => {
    setSelectedWish(wish);
  };

  const handleCloseModal = () => {
    setSelectedWish(null);
  };

  return (
    <div className="min-h-screen bg-[#fefae0] p-4">
      <h1 className="text-3xl font-bold text-center text-[#6b705c] mb-8">
        Flower Garden
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl transition"
            onClick={() => handleOpenModal(wish)}
          >
            {/* 
              <img
              src={wish.image}
              alt={wish.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
            */}
            <h2 className="text-xl font-semibold text-[#6b705c]">{wish.name}</h2>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedWish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            {/* ปุ่มปิด */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            {/* เนื้อหา Modal */}
            {/*
            <img
              src={selectedWish.image}
              alt={selectedWish.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            */}
            <h2 className="text-2xl font-bold text-[#6b705c] text-center mb-4">
              {selectedWish.name}
            </h2>
            <p className="text-gray-600 text-center">{selectedWish.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
