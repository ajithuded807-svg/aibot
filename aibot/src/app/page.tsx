"use client";

<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const handleStartShopping = () => {
    router.push("/products");
  };

  const toSlug = (str = "") =>
    str
      .toLowerCase()
      .trim()
      .replace(/['’`]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const categories = [
    { name: "Men's Wearing", image: "/mens.jpeg" },
    { name: "Women's Wearing", image: "/womens.jpg" },
    { name: "Electronics", image: "/electronics.webp" },
    { name: "Home Appliances", image: "/homeappl.webp" },
    { name: "Books & Stationery", image: "/books.webp" },
    { name: "Sports & Outdoors", image: "/sports.webp" },
    { name: "Toys & Games", image: "/toys.webp" },
    { name: "Beauty & Personal Care", image: "/makeup.webp" },
    { name: "Groceries", image: "/groceries.webp" },
    { name: "Gadgets & Gizmos", image: "/gadgets.webp" },
    { name: "Home & Decor", image: "/home-decor.jpg" },
    { name: "Footwear", image: "/footwear.webp" },
    { name: "Jewellery", image: "/jwellary.webp" },
    { name: "Kitchen Essentials", image: "/kitchen.jpg" },
    { name: "Travel & Luggage", image: "/travel.webp" },
    { name: "Pet Supplies", image: "/pets.webp" },
    { name: "Automotive", image: "/automotive.webp" },
    { name: "Others", image: null },
  ];

  // Intersection Observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.15 }
    );

    refs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/neomarthomepagebg1.avif')",
          minHeight: "40vh",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <Link
          href="/about"
          className="absolute top-2 left-2 flex items-center space-x-1 bg-white p-1 sm:p-1.5 rounded-full hover:scale-105 transition shadow-md"
        >
          <img
            src="/ajit.jpg"
            alt="Developer"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white"
          />
          <span className="font-bold text-xs sm:text-sm">
            <span className="text-blue-600">About</span>{" "}
            <span className="text-green-600">Developer</span>
          </span>
        </Link>

        <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center px-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold px-3 py-2 rounded-xl shadow-md bg-black/50 text-white">
            Welcome to <span className="text-blue-400">Neo</span>
            <span className="text-green-400">Mart</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-gray-100 max-w-sm">
            Smart shopping starts here.
          </p>

          <button
            onClick={handleStartShopping}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-md hover:scale-105 transition text-xs sm:text-sm"
          >
            Start Shopping
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 px-4 sm:px-6 bg-gray-100 flex justify-center">
        <div className="bg-white shadow-xl border border-gray-200 rounded-3xl p-4 sm:p-6 w-full max-w-6xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center border-b pb-2 sm:pb-3">
            Shop by Category
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
            {categories.map((cat, idx) => {
              const isVisible = visibleItems.includes(idx);

              if (cat.name === "Others") {
                return (
                  <Link
                    href="/products"
                    key={idx}
                    ref={(el) => (refs.current[idx] = el)}
                    data-index={idx}
                    className={`flex flex-col items-center rounded-lg border border-gray-300 overflow-hidden bg-white transform transition-all duration-300 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-6 scale-90"
                    } hover:shadow-lg hover:-translate-y-1`}
                    style={{ transitionDelay: ${idx * 20}ms }}
                  >
                    <div className="w-full aspect-square flex items-center justify-center bg-gray-100">
                      <span className="font-bold text-sm sm:text-base text-gray-800">
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  href={/category/${toSlug(cat.name)}}
                  key={idx}
                  ref={(el) => (refs.current[idx] = el)}
                  data-index={idx}
                  className={`flex flex-col items-center rounded-lg border border-gray-300 overflow-hidden bg-white transform transition-all duration-300 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-90"
                  } hover:shadow-lg hover:-translate-y-1`}
                  style={{ transitionDelay: ${idx * 20}ms }}
                >
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={cat.image || ""}
                      alt={Shop ${cat.name}}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>

                  <div className="py-2 w-full text-center">
                    <span className="font-bold text-gray-900 text-sm sm:text-base truncate block">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
=======
import React from "react";
import AiBot from "./components/AiBot"; // <-- your original page.tsx renamed as AiBot.tsx

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center bg-gray-800 text-white py-20 px-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-blue-400">Neo</span>
          <span className="text-green-400">Mart</span>
        </h1>
        <p className="text-sm sm:text-base mb-6 text-center">
          Smart shopping starts here.
        </p>
      </div>

      {/* AI Model Section */}
      <AiBot />
    </div>
>>>>>>> 9b09cd6 (Merge NeoMart hero page with AI bot component)
  );
}
