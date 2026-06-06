"use client"
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";

export default function Page() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />
      <HomePage />
    </div>
  );
}
