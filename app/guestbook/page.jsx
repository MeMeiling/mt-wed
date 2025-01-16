"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Button from "/components/Button";

export default function Guestbook() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // 📌 อัปเดตการเลือกไฟล์ภาพ
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // แสดงพรีวิว
    }
  };

  // 📌 ส่งข้อมูลไปยัง Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const message = formData.get("message");

    setSubmittedName(name);
    let imageUrl = "";

    try {
      console.log("📤 Start Uploading...");
      
      // ✅ ตรวจสอบก่อนอัปโหลด
      if (imageFile) {
        console.log("🖼 Uploading Image:", imageFile.name);

        // ✅ ใช้ File Blob แทน Data URL
        const imageRef = ref(storage, `images/${name}-${Date.now()}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log("✅ Image Uploaded Successfully:", imageUrl);
      }

      // ✅ บันทึกข้อมูลไปยัง Firestore
      await addDoc(collection(db, "wishes"), { name, message, imageUrl });

      console.log("✅ Data Saved Successfully");
      setIsSubmitted(true);
    } catch (error) {
      console.error("🚨 Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // 📌 ไปยังหน้า Flower Garden
  const handleGoToGarden = () => {
    router.push("/garden");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <h1 className="text-4xl md:text-4xl font-bold text-maincolor mb-6">
        Leave Your Wishes
      </h1>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 box-background">
          {/* 🎀 ชื่อ */}
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Your Name</label>
            <input type="text" name="name" className="font-sriracha w-full input-field" required />
          </div>

          {/* ✨ ข้อความ */}
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Your Message</label>
            <textarea name="message" className="font-sriracha w-full input-field" rows="4" required></textarea>
          </div>

          {/* 📷 อัปโหลดภาพ */}
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Upload Image</label>
            <input type="file" accept="image/*" className="w-full input-field" onChange={handleFileChange} />
          </div>

          {/* 🖼 แสดงพรีวิวรูป */}
          {previewImage && (
            <div className="relative w-full h-64 bg-gray-100 mb-4">
              <img src={previewImage} alt="Selected" className="object-cover w-full h-full" />
            </div>
          )}

          {/* 📝 ปุ่มส่งฟอร์ม */}
          <Button variant="main" className="w-full my-4" disabled={isUploading}>
            {isUploading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      ) : (
        <div className="p-6 text-center box-background">
          <h2 className="text-3xl font-bold text-seccolor mb-4">Thank You, {submittedName}!</h2>

          <img src="/flowermock.png" className="w-32 h-32 mx-auto my-2" alt="Flower" />

          <p className="text-2xl text-seccolor mb-6">
            Your wishes have been successfully submitted.
          </p>

          <Button variant="main" onClick={handleGoToGarden}>
            Go to Garden
          </Button>
        </div>
      )}
    </div>
  );
}
