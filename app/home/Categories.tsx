"use client";

import { motion, Variants } from "framer-motion";

const CATEGORIES = [
  {
    title: "Skin",
    subtitle: "Skin Care Treatments",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M24 6C15 6 10 13 10 20C10 26 13 30 18 33V40H30V33C35 30 38 26 38 20C38 13 33 6 24 6Z"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="18" cy="22" r="2" fill="white" />
        <circle cx="30" cy="22" r="2" fill="white" />
        <path d="M18 28C20 31 28 31 30 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Hair",
    subtitle: "Hair Care Treatment",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="2"/>
        <path d="M24 14V10M24 38V34M14 24H10M38 24H34" stroke="white" strokeWidth="2"/>
        <path d="M18 18C16 14 18 10 22 10" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: "You",
    subtitle: "Transforming You",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="16" r="6" stroke="white" strokeWidth="2"/>
        <path
          d="M12 38C12 30 18 26 24 26C30 26 36 30 36 38"
          stroke="white"
          strokeWidth="2"
        />
        <path d="M36 10L38 14L42 16L38 18L36 22L34 18L30 16L34 14Z" fill="white"/>
      </svg>
    ),
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function TreatmentSection() {
  return (
    <section className="w-full py-10 bg-[#4E4A7A]">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          {CATEGORIES.map((item, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-white"
            >
              <div className="mb-2">{item.icon}</div>

              <h3 className="text-xl font-semibold font-serif">
                {item.title}
              </h3>

              <p className="text-xs mt-1 opacity-80">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}