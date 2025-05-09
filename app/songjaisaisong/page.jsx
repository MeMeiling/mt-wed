"use client";
import Link from "next/link";

export default function FormPage() {
    return (
        <div
            className="min-h-screen bg-cover bg-center px-4 py-10 flex flex-col items-center"
            style={{ backgroundImage: "url('/bg5.jpg')" }}
        >
            <div className="w-full max-w-lg md:p-6 box-background-qr relative">
                <div className="w-full px-2 pt-6 md:py-3 pb-2">
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
                        <h1 className="text-6xl font-bold md:text-7xl text-[#3D3220] text-center">
                            Huge hugs
                        </h1>
                        <img
                            src="/heart.svg"
                            alt="heart"
                            className="w-auto h-12 mt-2 md:h-14 md:mb-0"
                        />
                    </div>
                    <div className="text-center">
                        <img src="/QR.png" alt="QR Code" className="w-[230px] mx-auto my-4" />
                        <div className="flex flex-col gap-y-2 font-sriracha font-bold text-[#3D3220] my-4">
                        <span className="text-3xl">
                            xxx-x-x1596-x
                        </span>
                        <span className="text-xl">
                            ( พิชชา รงคะศิริพันธ์ )
                        </span>
                        </div>
                        
                    </div>
                </div>
                <div className="w-full max-w-3xl overflow-hidden">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLScQQRbsOBuHk0GAgGyeLNjdGjTHUkmmqgi_EAsLxD467uFX1Q/viewform?embedded=true"
                        width="100%"
                        height="860"
                        frameborder="0"
                        marginheight="0"
                        marginwidth="0"
                        className="w-full"
                    >
                        กำลังโหลด…
                    </iframe>
                </div>
            </div>


            {/* Mobile Back to Home Link */}
            <div className="block mt-6">
                <Link href="/" className="text-white text-3xl font-bold text-shadow-lg hover:underline">
                    ← Back to home
                </Link>
            </div>
        </div>
    );
}
