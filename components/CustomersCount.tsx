"use client";

import { motion, Variants } from "framer-motion";

const STATS = [
  {
    count: "1500+",
    label: "Happy Patients",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="20" cy="18" r="8" stroke="white" strokeWidth="2" fill="none" />
        <path d="M6 50 C6 38 12 33 20 33 C28 33 34 38 34 50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="38" cy="18" r="8" stroke="white" strokeWidth="2" fill="none" />
        <path d="M24 50 C24 38 30 33 38 33 C46 33 52 38 52 50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="10" r="9" fill="#5B326A" stroke="#F5C518" strokeWidth="2" />
        <path d="M45 10 L48.5 13.5 L55 7" stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    count: "30+",
    label: "Procedures",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="12" y="10" width="40" height="50" rx="4" stroke="white" strokeWidth="2" fill="none" />
        <rect x="24" y="6" width="16" height="10" rx="3" stroke="white" strokeWidth="2" fill="none" />
        <path
          d="M18 36 L24 36 L27 28 L30 44 L33 32 L36 38 L39 38 L42 38"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="18" y1="48" x2="46" y2="48" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="18" y1="54" x2="36" y2="54" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    count: "3+",
    label: "Expert Doctors",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="30" cy="18" r="10" stroke="white" strokeWidth="2" fill="none" />
        <path
          d="M14 58 C14 44 20 38 30 38 C40 38 46 44 46 58"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M38 42 C44 42 48 46 48 52 C48 56 46 58 44 58"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="44" cy="58" r="2.5" stroke="white" strokeWidth="1.8" fill="none" />
        <circle cx="50" cy="14" r="10" fill="#5B326A" stroke="white" strokeWidth="1.5" />
        <line x1="50" y1="9" x2="50" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="45" y1="14" x2="55" y2="14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    count: "10+",
    label: "Years Experience",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="22" width="48" height="38" rx="2" stroke="white" strokeWidth="2" fill="none" />
        <path d="M4 24 L32 6 L60 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="25" y="44" width="14" height="16" rx="2" stroke="white" strokeWidth="1.8" fill="none" />
        <rect x="13" y="30" width="10" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
        <rect x="41" y="30" width="10" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
        <rect x="13" y="44" width="8" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
        <rect x="43" y="44" width="8" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="32" y1="10" x2="32" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="15" x2="37" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CustomersCount() {
  return (
    <section className="w-full py-10 bg-[#5B326A]">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 text-center"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center text-white gap-3"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">{stat.icon}</div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight leading-none">
                {stat.count}
              </p>
              <p className="text-xs sm:text-sm opacity-75 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}