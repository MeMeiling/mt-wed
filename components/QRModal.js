import { X } from "lucide-react";

export default function QRModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="box-background-qr p-6 rounded-lg shadow-lg text-center relative">
                <button onClick={onClose} className="absolute top-2 right-2">
                    <X size={24} />
                </button>
                <img src="/QR.png" alt="QR Code" className="w-[200px] mx-auto my-4" />
                <span className="font-sriracha text-xl font-bold my-4">
                    พิชชา รงคะศิริพันธ์
                    <br />
                    xxx-x-x1596-x
                </span>
                <h2 className="font-sriracha text-2xl font-bold my-4">ขอบคุณนะ 🥹</h2>
            </div>
        </div>
    );
}
