"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} className="w-full bg-white overflow-hidden">
      <div className="relative flex flex-col md:flex-row min-h-[500px] lg:min-h-[620px]">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end px-6 py-16 md:pr-20 lg:pr-32 xl:pr-40">
          <div className="max-w-md w-full text-center md:text-left">

            {/* Title */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: "#292E4B" }}
            >
              Skin Has Memory
            </h2>

            {/* Highlight Line */}
            <p
              className="italic text-lg md:text-xl mb-6"
              style={{ color: "#DFAA5E" }}
            >
              We Help It Remember.
            </p>

            {/* Paragraphs */}
            <p
              className="text-sm md:text-base leading-relaxed mb-5"
              style={{ color: "#414042" }}
            >
              Every skin story carries marks of time — stress, sun, lifestyle,
              and genetics.
            </p>

            <p
              className="text-sm md:text-base leading-relaxed mb-5"
              style={{ color: "#414042" }}
            >
              At <strong>Luminox – Skin | Hair | Laser</strong>, our role is not
              to change who you are, but to help your skin and hair return to
              their healthiest state.
            </p>

            <p
              className="text-sm md:text-base leading-relaxed mb-8"
              style={{ color: "#414042" }}
            >
              Through modern dermatology, advanced laser systems, and
              evidence-based treatments, we bring back the clarity, strength,
              and confidence your skin deserves.
            </p>

            {/* Tagline */}
            <p
              className="font-semibold mb-8"
              style={{ color: "#292E4B" }}
            >
              Because beauty isn't created. It's revealed.
            </p>

            {/* Button */}
            <button
              className="px-8 py-3 text-sm font-semibold border transition-all hover:bg-[#292E4B] hover:text-white"
              style={{
                borderColor: "#292E4B",
                color: "#292E4B",
              }}
            >
              Discover Our Approach
            </button>

          </div>
        </div>

        {/* CENTER ROTATING CIRCLE */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            style={{ rotate }}
            className="w-32 h-32 lg:w-44 lg:h-44 rounded-full flex items-center justify-center shadow-xl"
            style={{
              rotate,
              background: "linear-gradient(135deg, #DFAA5E 50%, #FFFFFF 50%)",
              border: "4px solid #DFAA5E",
              borderRadius: "9999px",
              boxShadow: "0 8px 32px rgba(223,170,94,0.35)",
            }}
          >
            {/* Counter-rotate the logo so it stays upright while circle spins */}
            <motion.div
              style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -360]) }}
              className="w-[65%] h-[65%] flex items-center justify-center"
            >
              <img
                src="/header/Luminox.png"
                alt="Luminox Logo"
                className="w-full h-full object-contain"
                style={{ filter: "drop-shadow(0 2px 6px rgba(41,46,75,0.18))" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 h-[320px] sm:h-[420px] md:h-auto relative">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=900"
            alt="Skin clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5 md:hidden"></div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;