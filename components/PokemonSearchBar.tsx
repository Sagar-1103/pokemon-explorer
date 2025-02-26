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


const PokemonSearchBar = (props:PokemonSearchBarProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = async(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.trim().toLowerCase()}`);
      const response = await res.json();
      router.push(`/pokemon/${response?.id}`);
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
          className="w-full bg-gray-800 text-yellow-300 border-2 border-yellow-400 focus:border-red-500 focus:ring-2 focus:ring-red-500 pl-12 pr-10 py-2 rounded-full shadow-md placeholder-yellow-500 outline-none transition-all"
        />

        <FaSearch className=" absolute right-5 top-1/2 transform -translate-y-1/2 text-yellow-300" size={18} />
      </div>
      
    </div>
    </div>
  );
};

export default PokemonSearchBar;
