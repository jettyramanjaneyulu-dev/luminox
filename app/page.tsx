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
import OrbitalSlider2 from "@/components/OrbitalSlider2";
import Clinicpipeline from "@/components/Clinicpipeline";
import Bookappointmentbutton from "@/components/Bookappointmentbutton";
import Whatsappbutton from "@/components/Whatsappbutton";



export default function Home() {
  return (
    <>
    <Whatsappbutton/>
    <Bookappointmentbutton/>
      <Hero /> 
      <Categories/>
      <AboutSection />
      <OrbitalSlider />
       <Doctors />
      {/* <OrbitalSlider2 /> */}
      <SkinShuffle />
      {/* <Clinicpipeline /> */}
      <ResultSlider />
       <Appointment />
       <WhyChooseUs />
       <Testimonials />
      
    </>
  );
}