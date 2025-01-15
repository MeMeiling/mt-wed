"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage, db } from "../firebase"; // Firebase Storage และ Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Button from "/components/Button"; // Corrected import path

export default function Guestbook() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // ภาพที่เลือก
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // เก็บข้อมูลภาพ
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true); // ตั้งสถานะการอัปโหลด

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      message: formData.get("message"),
      image: imageSrc, // ใช้ภาพที่เลือก (ไม่ต้องครอป)
    };

    try {
      // 1. ถ้ามีการอัปโหลดภาพ อัปโหลดภาพไปยัง Firebase Storage
      let imageUrl = "";
      if (imageSrc) {
        const imageRef = ref(storage, `images/${formData.get("name")}-${Date.now()}`);
        const snapshot = await uploadBytes(imageRef, imageSrc);
        imageUrl = await getDownloadURL(snapshot.ref); // ดึง URL ของภาพที่อัปโหลด
      }

      // 2. บันทึกข้อมูล (รวม URL ของภาพที่อัปโหลด) ไปยัง Firestore
      const dataWithImageUrl = { ...data, imageUrl };
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
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <h1 className="text-4xl md:text-4xl font-bold text-maincolor mb-6">
        Leave Your Wishes
      </h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 box-background">
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              className="w-full input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Your Message</label>
            <textarea
              name="message"
              className="w-full input-field"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full input-field"
              onChange={handleFileChange}
            />
          </div>
          {imageSrc && (
            <div className="relative w-full h-64 bg-gray-100 mb-4">
              <img
                src={imageSrc}
                alt="Selected"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <Button
            variant="main"
            className="w-full my-4"
            disabled={isUploading}
          >
            {isUploading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      ) : (
        <div className="p-6 text-center box-background">
          <h2 className="text-3xl font-bold text-seccolor mb-4">Thank You Name!</h2>
          {/* แทรกรูปภาพตรงนี้ */}
          <img
            src="/flowermock.png" 
            className="w-32 h-32 mx-auto my-2" // ปรับขนาดรูป
          />
          <p className="text-2xl text-seccolor mb-6">Your wishes have been successfully submitted.</p>
          <Button
            variant="main" // ใช้ปุ่มแบบ main
            onClick={handleGoToGarden}
            className=""
          >
            Go to Garden
          </Button>
        </div>
      )}
    </div>
  );
}
