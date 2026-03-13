"use client";

import { useState } from "react";

type ResultItem = {
  id: number;
  before: string;
  after: string;
};

const RESULTS: ResultItem[] = [
  {
    id: 1,
    before:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-before.jpg",
    after:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-after.jpg",
  },
  {
    id: 2,
    before:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd52b3?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd52b3?q=80&w=1000",
  },
  {
    id: 3,
    before:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
  },
];

type SliderProps = {
  before: string;
  after: string;
};

function Slider({ before, after }: SliderProps) {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl bg-gray-200">

      {/* BEFORE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${before})` }}
      >
        <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
          BEFORE
        </span>
      </div>

      {/* AFTER */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${after})`,
          width: `${sliderPos}%`,
          borderRight: "2px solid white",
        }}
      >
        <span className="absolute bottom-4 right-4 bg-[#FFB800] text-black text-xs px-3 py-1 rounded-full font-bold">
          AFTER
        </span>
      </div>

      {/* RANGE INPUT */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />

      {/* HANDLE */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-[#FFB800] flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-300 rounded-full" />
            <div className="w-1 h-3 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default function ResultSlider() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-900">
            Real Transformations
          </h2>
          <p className="text-gray-500 mt-2">
            Slide to compare before and after
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESULTS.map((item) => (
            <Slider key={item.id} before={item.before} after={item.after} />
          ))}
        </div>

      </div>
    </section>
  );
}