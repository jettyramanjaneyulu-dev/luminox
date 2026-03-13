"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// images (replace with your real images)
const IMAGES = [
  "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=900&q=80",
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=80",
];

export default function WhyChooseUsSimple() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3500);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: "#DFAA5E" }}
          >
            The Luminox Difference
          </p>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            style={{ color: "#292E4B", fontFamily: "Georgia, serif" }}
          >
            Why{" "}
            <span className="italic" style={{ color: "#DFAA5E" }}>
              Choose
            </span>{" "}
            Luminox?
          </h2>

          <p className="text-base leading-relaxed mb-6" style={{ color: "#414042" }}>
            At Luminox Skin Clinic, we combine advanced dermatology technology
            with personalised care to deliver visible, long-lasting skin
            transformations. Every treatment is tailored to your unique skin
            goals.
          </p>

          <ul className="space-y-3 text-sm" style={{ color: "#414042" }}>
            <li>✔ Expert Dermatologists</li>
            <li>✔ FDA Approved Technology</li>
            <li>✔ Clinically Proven Treatments</li>
            <li>✔ Personalised Skin Plans</li>
          </ul>

          
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl">

          {IMAGES.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="Clinic"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: index === i ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}

          {/* overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(41,46,75,0.35) 0%, transparent 60%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}