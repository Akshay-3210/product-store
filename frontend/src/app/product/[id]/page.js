"use client"
import Navbar from "@/components/Navbar";
import ProductPage from "@/pages/ProductPage";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <ProductPage id={id} />
    </div>
  );
}
