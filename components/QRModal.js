import { X } from "lucide-react";

export default function QRModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="box-background p-6 rounded-lg shadow-lg text-center relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X size={24} />
        </button>
        <h2 className="font-sriracha text-2xl font-bold my-4">ขอบคุณมากๆ ❤️</h2>
        <img src="/QR.png" alt="QR Code" className="w-40 mx-auto" />
      </div>
    </div>
  );
}
