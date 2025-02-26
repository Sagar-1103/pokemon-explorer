"use client";
import { FiMenu, FiX } from "react-icons/fi";

interface MobileNavbarToggleProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileNavbarToggle = ({isOpen, setIsOpen}:MobileNavbarToggleProps) => {

  return (
    <div className="absolute md:hidden left-2 top-10 transform -translate-y-1/2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-yellow-300 bg-gray-800 p-2 rounded-md focus:outline-none"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
    </div>
  );
};

export default MobileNavbarToggle;
