"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage, db } from "../firebase"; // Firebase Storage และ Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import CropModal from "./CropModal"; // นำเข้า Modal สำหรับการครอปภาพ

export default function Guestbook() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะ Modal
  const [imageSrc, setImageSrc] = useState(null); // ภาพที่เลือก
  const [croppedImage, setCroppedImage] = useState(null); // ภาพที่ครอปแล้ว
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // เก็บข้อมูลภาพ
        setIsModalOpen(true); // เปิด Modal
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageData) => {
    setCroppedImage(croppedImageData); // เก็บภาพที่ครอปแล้ว
    setIsModalOpen(false); // ปิด Modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!croppedImage) {
      alert("Please crop the image before submitting.");
      return;
    }

    setIsUploading(true); // ตั้งสถานะการอัปโหลด

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      message: formData.get("message"),
      image: croppedImage, // ใช้ภาพที่ครอปแล้ว
    };

    try {
      const imageRef = ref(storage, `images/${formData.get("name")}-${Date.now()}`);
      const snapshot = await uploadBytes(imageRef, croppedImage);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const dataWithImageUrl = { ...data, imageUrl: downloadURL };
      await addDoc(collection(db, "wishes"), dataWithImageUrl);

      setIsSubmitted(true); // ตั้งค่าการส่งข้อมูลเสร็จ
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false); // ปิดสถานะการอัปโหลด
    }
  };

  const handleGoToGarden = () => {
    router.push("/garden");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefae0] px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-[#6b705c] mb-6">
        Leave Your Wishes
      </h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-[#6b705c] font-medium mb-2">Your Name</label>
            <input type="text" name="name" className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-[#6b705c] font-medium mb-2">Your Message</label>
            <textarea name="message" className="w-full border border-gray-300 rounded-lg p-2" rows="4" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-[#6b705c] font-medium mb-2">Upload Image</label>
            <input type="file" accept="image/*" className="w-full border border-gray-300 rounded-lg p-2" onChange={handleFileChange} />
          </div>
          {croppedImage && (
            <div className="relative w-full h-64 bg-gray-100 mb-4">
              <img src={croppedImage} alt="Cropped" className="object-cover w-full h-full" />
            </div>
          )}
          <button type="submit" className="w-full py-2 px-4 bg-[#81b29a] text-white font-bold rounded-lg hover:bg-[#6a9984] transition" disabled={isUploading}>
            {isUploading ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#6b705c] mb-4">Thank You for Your Wishes!</h2>
          <p className="text-[#6b705c] mb-6">Your wishes have been successfully submitted.</p>
          <button onClick={handleGoToGarden} className="py-2 px-6 bg-[#81b29a] text-white font-bold rounded-lg hover:bg-[#6a9984] transition">
            Go to Garden
          </button>
        </div>
      )}

      {/* Modal สำหรับการครอปภาพ */}
      <CropModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageSrc={imageSrc} onCropComplete={handleCropComplete} />
    </div>
  );
}
