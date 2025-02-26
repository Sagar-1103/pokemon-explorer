"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Pokeball from "../public/pokeball.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center  pb-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-2 transition-transform duration-200 hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <FaArrowLeft />
        <span className="md:block hidden">Previous</span>
      </button>

      <div className="flex items-center mx-6 text-yellow-300 font-bold">
        <Image src={Pokeball} alt="Pokéball" className="w-6 h-6 mx-2 hidden sm:block animate-spin-slow" />
        <p>Page {currentPage} of {totalPages}</p>
        <Image src={Pokeball} alt="Pokéball" className="w-6 h-6 mx-2 hidden sm:block animate-spin-slow" />
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 transition-transform duration-200 hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span className="md:block hidden" >Next</span>
        <FaArrowRight />
      </button>
    </div>
  );
}
