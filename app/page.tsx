"use client";

import OrbitalSlider from "@/components/OrbitalSlider";
import AboutSection from "./home/AboutSection";
import Hero from "./home/Hero";
import SkinShuffle from "@/components/SkinShuffle";
import Categories from "./home/Categories";
import ResultSlider from "@/components/ResultSlider";
import Appointment from "@/components/Appointment";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Doctors from "@/components/Doctors";



export default function Home() {
  return (
    <>
      <Hero />
      <Categories/>
      <AboutSection />
      <OrbitalSlider />
      <SkinShuffle />
      <ResultSlider />
       <Appointment />
       <WhyChooseUs />
       <Testimonials />
       <Doctors />
    </>
  );
}