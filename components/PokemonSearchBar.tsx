"use client";
import { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Pokeball from "../public/pokeball.svg";
import { FiFilter } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface PokemonSearchBarProps {
  onSearch: (query: string) => void;
}

const PokemonSearchBar = ({ onSearch }: PokemonSearchBarProps) => {
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
    <div className="flex justify-center py-4 bg-gray-900">
      <div className="flex relative w-[80%]">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Image src={Pokeball} alt="Pokéball" className="w-6 h-6 animate-spin-slow" />
        </div>

        <input
          type="text"
          placeholder="Search Pokémon..."
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown} 
          className="w-full bg-gray-800 text-yellow-300 border-2 border-yellow-400 focus:border-red-500 focus:ring-2 focus:ring-red-500 pl-12 pr-10 py-2 rounded-full shadow-md placeholder-yellow-500 outline-none transition-all"
        />

        <FaSearch className=" absolute right-16 top-1/2 transform -translate-y-1/2 text-yellow-300" size={18} />
        <FiFilter className="top-1/2 font-bold right-3 absolute transform -translate-y-1/2 mx-2 text-yellow-300" size={20} />
      </div>
      
    </div>
  );
};

export default PokemonSearchBar;
