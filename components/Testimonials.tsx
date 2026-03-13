"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Aditi Sharma",
    role: "Regular Client",
    text: "The skin rejuvenation treatment completely transformed my confidence. My skin feels brighter, smoother, and healthier than ever.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
  },
  {
    id: 2,
    name: "Vikram Mehta",
    role: "Hair Care Patient",
    text: "Professional doctors, modern technology, and amazing results. The laser treatment exceeded my expectations.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
  },
  {
    id: 3,
    name: "Sana Khan",
    role: "Bride-to-be",
    text: "Their bridal skin package was incredible. My skin glow was the highlight of my wedding photos!",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#DFAA5E] uppercase tracking-[0.3em] text-xs font-semibold">
            Client Stories
          </p>

          <h2 className="text-3xl md:text-5xl font-serif text-[#292E4B] mt-4">
            Real Transformations
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE PORTAL */}
          <div className="relative flex justify-center">

            <div className="relative w-72 h-72 md:w-[420px] md:h-[420px]">

              {/* rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#DFAA5E]/40"
              />

              {/* gradient ring */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#DFAA5E] to-[#D95CB9] opacity-20 blur-xl" />

              {/* image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full rounded-full overflow-hidden border-[10px] border-white shadow-2xl"
                >
                  <img
                    src={REVIEWS[index].image}
                    alt={REVIEWS[index].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* quote bubble */}
              <div className="absolute -top-4 right-8 bg-[#DFAA5E] p-4 rounded-full shadow-xl">
                <Quote className="text-white w-6 h-6" />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-100 shadow-xl rounded-2xl p-10"
              >
                <p className="text-lg text-[#414042] leading-relaxed italic mb-8">
                  "{REVIEWS[index].text}"
                </p>

                <div>
                  <h4 className="text-xl font-semibold text-[#292E4B]">
                    {REVIEWS[index].name}
                  </h4>

                  <p className="text-[#D95CB9] text-sm font-medium">
                    {REVIEWS[index].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* slider dots */}
            <div className="flex items-center gap-4 mt-10">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    i === index
                      ? "w-10 bg-[#DFAA5E]"
                      : "w-4 bg-gray-300"
                  }`}
                />
              ))}

              <span className="text-sm text-gray-400 ml-4">
                0{index + 1} / 0{REVIEWS.length}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}