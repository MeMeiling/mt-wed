"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Button from "/components/Button";
import Link from "next/link";
import Compressor from "compressorjs";
import Cropper from "react-easy-crop"; // ใช้สำหรับ crop รูป
import getCroppedImg from "../utils/cropImage"; // ฟังก์ชันช่วยตัดรูป

export default function Guestbook() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          const objectUrl = URL.createObjectURL(result);
          setImageSrc(objectUrl);
          setImageFile(result);
        },
        error(err) {
          console.error("🚨 Compression Error:", err);
        },
      });
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const message = formData.get("message");
    setSubmittedName(name);
    setSubmittedMessage(message);

    let imageUrl = null;
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
        const croppedFile = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });

        setPreviewImage(URL.createObjectURL(croppedBlob));

        // **หน่วงเวลาเล็กน้อยก่อนอัปโหลด**
        await new Promise((resolve) => setTimeout(resolve, 500));

        const imageRef = ref(storage, `images/${name}-${Date.now()}`);
        const uploadTask = uploadBytesResumable(imageRef, croppedFile);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            reject,
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            }
          );
        });
      }

      await addDoc(collection(db, "wishes"), { name, message, imageUrl });
      setIsSubmitted(true);
    } catch (error) {
      console.error("🚨 Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <h1 className="text-4xl md:text-4xl font-bold text-maincolor mb-6">Leave Your Wishes</h1>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 box-background relative">
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Your Name</label>
            <input type="text" name="name" className="font-sriracha w-full input-field" required />
          </div>
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Your Message</label>
            <textarea name="message" className="font-sriracha w-full input-field" rows="4" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-seccolor text-xl mb-2">Your Image (Please zoom in to your face!) </label>
            <input type="file" accept="image/*" className="w-full input-field" onChange={handleFileChange} />
          </div>

          {imageSrc && (
            <div className="relative w-full h-64 bg-gray-200">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} // สี่เหลี่ยมจัตุรัส
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}

          <Button type="submit" variant="main" className="w-full my-4" disabled={isUploading}>
            {isUploading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      ) : (
        <div className="p-6 text-center box-background relative">
          <h2 className="text-3xl font-sriracha font-bold text-maincolor mb-4">Thank You, {submittedName}!</h2>
          <div className="relative w-40 h-40 mx-auto my-2">
            <img src={`/flowers/flower-${Math.floor(Math.random() * 10) + 1}.svg`} className="w-full h-full" alt="Flower" />
            {previewImage && (
              <img src={previewImage} className="absolute top-[calc(50%-6px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white shadow-lg" alt="Uploaded" />
            )}
          </div>
          <p className="text-lg font-sriracha text-seccolor mb-4">"{submittedMessage}"</p>
          <p className="text-2xl text-maincolor mb-6">Your wishes have been successfully submitted.</p>
          <Button variant="main" onClick={() => router.push("/garden")}>
            Go to Garden
          </Button>
        </div>
      )}
    </div>
  );
}
