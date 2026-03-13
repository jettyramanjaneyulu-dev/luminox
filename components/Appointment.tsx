"use client";

import { useState } from "react";

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Appointment Submitted Successfully!");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      
      {/* SECTION BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
          alt="Clinic Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to make form text pop */}
        <div className="absolute inset-0 bg-[#292E4B]/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT: TEXT */}
        <div className="text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            Premium Care <br /> 
            <span className="text-blue-300">Tailored to You.</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-md leading-relaxed">
            Experience world-class skin treatments in a relaxing environment. 
            Book your consultation today and meet our expert dermatologists.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md border border-white/20">
              <p className="text-2xl font-bold">15k+</p>
              <p className="text-xs uppercase tracking-widest text-blue-200">Happy Patients</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md border border-white/20">
              <p className="text-2xl font-bold">12+</p>
              <p className="text-xs uppercase tracking-widest text-blue-200">Expert Doctors</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: THE FORM */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-[#292E4B] mb-2">
              Book Appointment
            </h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full mb-4"></div>
            <p className="text-gray-500 text-sm">
              Please fill out the form below. We will call you within 24 hours to confirm.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#292E4B] uppercase mb-1 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#292E4B] uppercase mb-1 ml-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#292E4B] uppercase mb-1 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#292E4B] uppercase mb-1 ml-1">Select Treatment</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-gray-800 appearance-none"
                required
              >
                <option value="" disabled>Choose a service...</option>
                <option value="laser">Laser Hair Removal</option>
                <option value="facial">Hydra Facial</option>
                <option value="botox">Botox Treatment</option>
                <option value="peel">Chemical Peel</option>
                <option value="consultation">General Consultation</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20 mt-4"
            >
              Request Call Back
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-gray-400 uppercase tracking-widest">
            🔒 Secure & Private Booking
          </p>
        </div>

      </div>
    </section>
  );
}