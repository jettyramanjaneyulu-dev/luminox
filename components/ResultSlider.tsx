"use client";

import { useState } from "react";

const CLIENT_RESULTS = [
  {
    id: 1,
    name: "Sarah J.",
    treatment: "Acne Scar Revision",
    duration: "3 Months",
    before: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-before.jpg",
    after: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-after.jpg",
  },
  {
    id: 2,
    name: "Michael R.",
    treatment: "Hyper-Pigmentation",
    duration: "6 Weeks",
    before: "https://images.unsplash.com/photo-1596755389378-c31d21fd52b3?q=80&w=1000", // Placeholder
    after: "https://images.unsplash.com/photo-1596755389378-c31d21fd52b3?q=80&w=1000", // Placeholder
  },
  {
    id: 3,
    name: "Elena V.",
    treatment: "Anti-Aging Therapy",
    duration: "5 Months",
    before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000", // Placeholder
    after: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000", // Placeholder
  }
];

export default function ResultSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeClient, setActiveClient] = useState(0);

  const current = CLIENT_RESULTS[activeClient];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-900">Real Results</h2>
          <p className="text-gray-500 mt-2">Slide to see the transformation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* LEFT: Client Info & Navigation */}
          <div className="space-y-6 order-2 lg:order-1">
            {CLIENT_RESULTS.map((client, idx) => (
              <button
                key={client.id}
                onClick={() => { setActiveClient(idx); setSliderPos(50); }}
                className={`w-full text-left p-6 transition-all border-l-4 ${
                  activeClient === idx 
                    ? "border-[#FFB800] bg-gray-50 shadow-sm" 
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <h4 className="font-bold text-lg text-gray-900">{client.name}</h4>
                <p className="text-[#FFB800] text-sm font-semibold uppercase tracking-wider">{client.treatment}</p>
                <p className="text-gray-400 text-xs mt-1">Usage: {client.duration}</p>
              </button>
            ))}
          </div>

          {/* RIGHT: The Slider Implementation */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl bg-gray-200">
              
              {/* "Before" Image (Background) */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${current.before})` }}
              >
                <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">BEFORE</span>
              </div>

              {/* "After" Image (Foreground/Divisor) */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-none"
                style={{ 
                  backgroundImage: `url(${current.after})`,
                  width: `${sliderPos}%`,
                  borderRight: '2px solid white'
                }}
              >
                <span className="absolute bottom-4 right-4 bg-[#FFB800] text-black text-xs px-3 py-1 rounded-full font-bold">AFTER</span>
              </div>

              {/* Slider Input Handle */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />

              {/* Visual Handle UI */}
              <div 
                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#FFB800]">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-gray-300 rounded-full" />
                    <div className="w-1 h-3 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}