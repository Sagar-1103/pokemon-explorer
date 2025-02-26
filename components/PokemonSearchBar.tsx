"use client";
import { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Pokeball from "../public/pokeball.svg";
import { useRouter } from "next/navigation";
import MobileNavbarToggle from "./MobileNavbarToggle";

interface PokemonSearchBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PokemonSearchBar = (props: PokemonSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(""); 
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const searchPokemon = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.trim().toLowerCase()}`);
      
      if (!res.ok) {
        throw new Error("Pokémon not found! Try again.");
      }

      const response = await res.json();
      router.push(`/pokemon/${response?.id}`);
    } catch (err: any) {
      setError(err.message);
      setShowError(true);
      setQuery("")
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(""); 
    setShowError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPokemon();
    }
  };

  return (
    <div>
      <MobileNavbarToggle {...props} />
      <div className="flex justify-end md:justify-center py-5 bg-gray-900">
        <div className="flex relative w-[80%] pr-2 md:pr-0">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image src={Pokeball} alt="Pokéball" className="w-6 h-6 animate-spin-slow" />
          </div>

          <input
            type="text"
            placeholder="Search Pokémon..."
            value={query}
            autoCapitalize="words"
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-800 text-yellow-300 border-2 border-yellow-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 pl-12 pr-10 py-2 rounded-full shadow-md placeholder-yellow-500 outline-none transition-all"
          />

          <FaSearch 
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-yellow-300 hidden md:block" 
            size={18} 
          />

          <button 
            onClick={searchPokemon} 
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-gray-900 p-2 rounded-full md:hidden"
          >
            <FaSearch size={16} />
          </button>
        </div>
      </div>

      {showError && (
        <div className="fixed z-20 bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 animate-fade">
          {error}
        </div>
      )}

      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade {
          animation: fade 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PokemonSearchBar;
