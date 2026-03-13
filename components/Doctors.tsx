"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, GraduationCap } from "lucide-react";

const DOCTORS = [
  {
    name: "Dr. Aradhana Rao",
    spec: "Senior Dermatologist",
    exp: "12+ Years Exp",
    img: "/doc1.jpg",
    bio: "Specialist in advanced laser therapies and clinical dermatology."
  },
  {
    name: "Dr. Sanjay Gupta",
    spec: "Trichologist",
    exp: "8+ Years Exp",
    img: "/doc2.jpg",
    bio: "Expert in hair restoration and scalp health treatments."
  },
  {
    name: "Dr. Meera Iyer",
    spec: "Cosmetologist",
    exp: "10+ Years Exp",
    img: "/doc3.jpg",
    bio: "Focuses on holistic skin rejuvenation and aesthetic enhancements."
  }
];

export default function Doctors() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#FFB800] font-bold tracking-[0.3em] uppercase text-xs">
            The Experts Behind Your Glow
          </span>
          <h2 className="text-5xl font-serif text-gray-900 mt-4">Meet Our Specialists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {DOCTORS.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative"
            >
              {/* Image Container with Organic Shape */}
              <div className="relative h-[450px] w-full overflow-hidden transition-all duration-700 ease-in-out">
                {/* Background Decor Layer (Visible on Hover) */}
                <div className="absolute inset-0 bg-[#1A1A3A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10" />
                
                <img 
                  src={doc.img} 
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[50%] group-hover:grayscale-0" 
                />

                {/* Hover Content Layer */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <div className="flex gap-2 mb-4">
                    <GraduationCap className="text-[#FFB800] w-5 h-5" />
                    <span className="text-white/80 text-xs uppercase tracking-widest">{doc.exp}</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {doc.bio}
                  </p>
                  <div className="flex gap-4">
                    <button className="p-2 bg-white/10 hover:bg-[#FFB800] rounded-full transition-colors">
                      <Linkedin className="text-white w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-[#FFB800] rounded-full transition-colors">
                      <Instagram className="text-white w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Label (Always Visible) */}
              <div className="mt-6 text-center">
                <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#FFB800]">
                  {doc.name}
                </h4>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">
                  {doc.spec}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFB800] opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}