"use client"
import Navbar from "@/components/Navbar";
import ProductPage from "@/pages/ProductPage";

export default function Page({ params }) {
  const { id } = params || {};
  return (
    <div>
      <Navbar />
      <ProductPage id={id} />
    </div>
  );
}
