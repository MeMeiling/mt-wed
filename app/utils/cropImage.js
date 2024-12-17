// utils/cropImage.js
export default function getCroppedImg(imageSrc, croppedAreaPixels) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    // ตรวจสอบว่าภาพสามารถโหลดได้หรือไม่
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // ตรวจสอบค่า croppedAreaPixels ที่ได้รับมาว่าถูกต้องหรือไม่
      if (!croppedAreaPixels || !croppedAreaPixels.width || !croppedAreaPixels.height) {
        reject("Invalid crop area");
        return;
      }

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      try {
        // ครอปภาพตามขนาดที่ตั้งไว้
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

        // ส่งคืน base64 ของภาพที่ครอปแล้ว
        resolve(canvas.toDataURL("image/jpeg"));
      } catch (error) {
        reject("Error while cropping the image");
      }
    };

    image.onerror = (error) => reject("Error loading image: " + error.message);
  });
}
