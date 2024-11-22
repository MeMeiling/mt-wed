"use client"; // บอกว่าไฟล์นี้เป็น Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // ใช้ next/navigation แทน next/router

export default function Guestbook() {
  const [isSubmitted, setIsSubmitted] = useState(false); // ควบคุมการแสดงผลของ Popup
  const router = useRouter(); // ใช้สำหรับนำทางไปยัง Garden Page

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      message: formData.get("message"),
      image: formData.get("image"),
    };
    console.log("Submitted Data:", data);

    // TODO: ส่งข้อมูลไปยัง Firebase ที่นี่

    setIsSubmitted(true); // แสดง Popup ขอบคุณ
  };

  const handleGoToGarden = () => {
    router.push("/garden"); // เปลี่ยนไปหน้า Garden Page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefae0] px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-[#6b705c] mb-6">
        Leave Your Wishes
      </h1>
      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
        >
          <div className="mb-4">
            <label className="block text-[#6b705c] font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#6b705c] font-medium mb-2">
              Your Message
            </label>
            <textarea
              name="message"
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-[#6b705c] font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#81b29a] text-white font-bold rounded-lg hover:bg-[#6a9984] transition"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#6b705c] mb-4">
            Thank You for Your Wishes!
          </h2>
          <p className="text-[#6b705c] mb-6">
            Your wishes have been successfully submitted.
          </p>
          <button
            onClick={handleGoToGarden}
            className="py-2 px-6 bg-[#81b29a] text-white font-bold rounded-lg hover:bg-[#6a9984] transition"
          >
            Go to Garden
          </button>
        </div>
      )}
    </div>
  );
}
