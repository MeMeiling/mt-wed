import createImage from "./createImage";

const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob); // ✅ ส่งออกเป็น Blob เพื่อใช้กับ Firebase
      }, "image/jpeg");
    });
  } catch (error) {
    console.error("🚨 Cropping error:", error);
    return null;
  }
};

export default getCroppedImg;
