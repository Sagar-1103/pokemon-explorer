"use client";
import Link from "next/link";
import { FiX } from "react-icons/fi";

interface MobileNavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavbar = ({ isOpen, setIsOpen }: MobileNavbarProps) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg z-50 flex justify-center items-center transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative bg-gray-900 text-yellow-300 rounded-lg shadow-xl w-[80%] max-w-sm p-6 transform transition-transform duration-300 ease-in-out">
        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-yellow-300 hover:text-red-400 transition-colors"
        >
          <FiX size={28} />
        </button>

        <nav className="flex flex-col items-center space-y-6 mt-6">
          <Link href="/" className="text-xl font-semibold hover:text-red-400 transition duration-200" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/compare" className="text-xl font-semibold hover:text-red-400 transition duration-200" onClick={() => setIsOpen(false)}>
            Compare
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
