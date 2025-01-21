"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Button from "/components/Button";
import Link from "next/link"; // Don't forget to import Link

export default function Guestbook() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const message = formData.get("message");
    setSubmittedName(name);

    let imageUrl = null;
    try {
      if (imageFile) {
        console.log("🖼 Uploading Image:", imageFile.name);
        const imageRef = ref(storage, `images/${name}-${Date.now()}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(
                `Upload Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`
              );
            },
            (error) => {
              console.error("🚨 Upload Failed:", error);
              reject(error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("✅ Image Uploaded Successfully:", url);
              resolve(url);
            }
          );
        });
      }

      await addDoc(collection(db, "wishes"), { name, message, imageUrl });
      console.log("✅ Data Saved Successfully");
      setIsSubmitted(true);
    } catch (error) {
      console.error("🚨 Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGoToGarden = () => {
    router.push("/garden");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      {/* Back to Home Link */}
      <div className="hidden md:block fixed bottom-4 left-4 z-50">
        <Link href="/" className="text-white text-3xl font-bold hover:underline">
          ← Back to home
        </Link>
      </div>

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
            <label className="block text-seccolor text-xl mb-2">Upload Image</label>
            <input type="file" accept="image/*" className="w-full input-field" onChange={handleFileChange} />
          </div>
          {previewImage && (
            <div className="relative w-full h-64 bg-gray-100 mb-4">
              <img src={previewImage} alt="Selected" className="object-cover w-full h-full" />
            </div>
          )}
          <Button type="submit" variant="main" className="w-full my-4" disabled={isUploading}>
            {isUploading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      ) : (
        <div className="p-6 text-center box-background relative">
          <h2 className="text-3xl font-bold text-seccolor mb-4">Thank You, {submittedName}!</h2>
          <img src="/flowermock.png" className="w-32 h-32 mx-auto my-2" alt="Flower" />
          <p className="text-2xl text-seccolor mb-6">Your wishes have been successfully submitted.</p>
          <Button variant="main" onClick={handleGoToGarden}>Go to Garden</Button>
        </div>
      )}

      {/* Mobile Back to Home Link */}
      <div className="block md:hidden mt-6">
        <Link href="/" className="text-white text-2xl font-bold hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
