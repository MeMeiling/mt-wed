"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function ExportWishPage() {
  const [wishes, setWishes] = useState([]);
  const router = useRouter();
  const params = useParams();
  const currentPage = parseInt(params.page) || 1;
  const wishesPerPage = 9;

  useEffect(() => {
    const fetchWishes = async () => {
      const wishesCollection = collection(db, "wishes");
      const wishSnapshot = await getDocs(wishesCollection);
      const wishesList = wishSnapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        image: `/flowers/flower-${(index % 10) + 1}.svg`,
      }));
      setWishes(wishesList);
    };
    fetchWishes();
  }, []);

  const totalPages = Math.ceil(wishes.length / wishesPerPage);
  const indexOfLastWish = currentPage * wishesPerPage;
  const indexOfFirstWish = indexOfLastWish - wishesPerPage;
  const currentWishes = wishes.slice(indexOfFirstWish, indexOfLastWish);

  const paginate = (pageNumber) => {
    router.push(`/export/${pageNumber}`);
  };

  const renderPagination = () => {
    const pages = [];
    const range = 1; // จำนวนหน้าที่แสดงรอบ currentPage

    if (currentPage > 1) {
      pages.push(<button key="prev" onClick={() => paginate(currentPage - 1)} className="px-2 text-white font-bold text-xl text-shadow-lg">&lt; Previous</button>);
    }

    if (currentPage > range + 1) {
      pages.push(<button key="1" onClick={() => paginate(1)} className="px-2 text-white font-bold text-xl text-shadow-lg">1</button>);
      if (currentPage > range + 2) {
        pages.push(<span key="dots1" className="px-2 text-white font-bold text-xl text-shadow-lg">...</span>);
      }
    }

    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-buttoncolormain text-terticolor font-bold" : "text-white font-bold text-xl text-shadow-lg"}`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - range) {
      if (currentPage < totalPages - range - 1) {
        pages.push(<span key="dots2" className="px-2 text-white font-bold text-xl text-shadow-lg">...</span>);
      }
      pages.push(<button key={totalPages} onClick={() => paginate(totalPages)} className="px-2 text-white font-bold text-xl text-shadow-lg">{totalPages}</button>);
    }

    if (currentPage < totalPages) {
      pages.push(<button key="next" onClick={() => paginate(currentPage + 1)} className="px-2 text-white font-bold text-xl text-shadow-lg">Next &gt;</button>);
    }

    return pages;
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src="/bg3.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-maincolor">Export Wishes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {currentWishes.map((wish) => (
            <div
              key={wish.id}
              className="relative rounded-lg p-6 shadow-lg box-background-qr flex flex-col items-center gap-3 bg-white bg-opacity-80"
            >
              <div className="relative w-40 h-40">
                <img src={wish.image} alt="Flower" className="w-full h-full drop-shadow-xl" />
                {wish.imageUrl && (
                  <img
                    src={wish.imageUrl}
                    alt="User"
                    className="absolute top-1/2 left-1/2 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
                  />
                )}
              </div>
              <h2 className="text-2xl font-sriracha font-bold break-all text-seccolor text-center">{wish.name}</h2>
              <p className="text-lg text-seccolor font-sriracha break-all text-center">“{wish.message}”</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 flex-wrap">{renderPagination()}</div>

        <div className="flex justify-center mt-6">
        <Link href="/" className="text-white text-3xl font-bold text-shadow-lg hover:underline">
          ← Back to home
        </Link>
      </div>
      </div>
    </div>
  );
}
