// utils/cropImage.js
export default function getCroppedImg(imageSrc, croppedAreaPixels) {
  // โค้ดในการครอปภาพ (โค้ดนี้เป็นตัวอย่าง)
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      // สร้าง Canvas และครอปภาพ
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // ครอปภาพตามขนาดที่ได้จาก croppedAreaPixels
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      // ส่งคืนผลลัพธ์เป็น base64 หรือ Blob
      resolve(canvas.toDataURL("image/jpeg"));
    };
    image.onerror = (error) => reject(error);
  });
}
