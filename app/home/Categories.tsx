"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const CATEGORIES = [
  {
    title: "Skin",
    subtitle: "Skin Care Treatments",
    icon: "/home/skin.png",
  },
  {
    title: "Hair",
    subtitle: "Hair Care Treatment",
    icon: "/home/hair.png",
  },
  {
    title: "You",
    subtitle: "Transforming You",
    icon: "/home/you.png",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function TreatmentSection() {
  return (
    <section className="w-full py-5 bg-[#5B326A]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 text-center"
        >
          {CATEGORIES.map((item, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-white"
            >
              <div className="mb-2 w-8 h-8 sm:w-10 sm:h-10 relative">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>

              <h3 className="text-sm sm:text-base font-semibold font-serif tracking-wide">
                {item.title}
              </h3>

              <p className="text-[10px] sm:text-[11px] mt-0.5 opacity-70 tracking-wide">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}