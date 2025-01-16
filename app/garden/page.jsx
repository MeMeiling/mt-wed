"use client";

import { useState } from "react";
import Button from "/components/Button"; // Corrected import path

export default function FlowerGarden() {
  const wishes = [
    {
      id: 1,
      name: "Alice",
      message: "ขอให้สูงขึ้น 10 เซน!",
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
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg3.jpg')" }} // ใช้ bg3.jpg เป็นพื้นหลัง
    >
      <div className="min-h-screen p-4">
        <h1 className="text-4xl md:text-4xl font-bold text-center text-maincolor mb-8">
          Flower Garden
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="box-background p-4 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl transition"
              onClick={() => handleOpenModal(wish)}
            >
              {/*
              /* <img
                src={wish.image}
                alt={wish.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              */}
              
              <h2 className="text-seccolor text-xl font-semibold ">{wish.name}</h2>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedWish && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative box-background">
              {/* ปุ่มปิด */}
              {/*
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              */}

              
            {/* เนื้อหา Modal */}
              {/*
                <img
                  src={selectedWish.image}
                  alt={selectedWish.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
              */}
              <h2 className="text-3xl font-bold text-seccolor text-center mb-4">
                {selectedWish.name}
              </h2>
              {/* แทรกรูปภาพตรงนี้ */}
              <img
                src="/flowermock.png" 
                className="w-32 h-32 mx-auto my-2" // ปรับขนาดรูป
              />
              <p className="font-sriracha text-2xl text-seccolor text-center">" {selectedWish.message} "</p>
              <Button
                variant="main" // ใช้ปุ่มแบบ main
                onClick={handleCloseModal}
                className="w-full mt-6"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
