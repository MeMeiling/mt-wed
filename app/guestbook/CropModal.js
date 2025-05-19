"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // ฟังก์ชันครอปภาพ

export default function CropModal({ isOpen, onClose, imageSrc, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null); // เก็บภาพที่ครอปแล้ว
  const [croppedArea, setCroppedArea] = useState(null); // เก็บตำแหน่งที่ครอป

  const onCropChange = (newCrop) => setCrop(newCrop);
  const onCropCompleteInternal = (_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels);

  const handleCropImage = async () => {
    if (!croppedArea) return;

    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedArea);
      setCroppedImage(croppedImg); // เก็บภาพที่ครอปแล้ว
    } catch (err) {
      console.error("Error cropping image:", err);
    }
  };

  const handleSubmit = () => {
    if (croppedImage) {
      onCropComplete(croppedImage); // ส่งภาพที่ครอปแล้วกลับไปยังหน้า Guestbook
      onClose(); // ปิด modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Crop Image</h2>
        <div className="relative w-full h-64 bg-gray-100 mb-4">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={setZoom}
          />
        </div>
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#81b29a] text-white rounded-lg" disabled={!croppedImage}>Submit</button>
        </div>
      </div>
    </div>
  );
}
