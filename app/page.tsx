"use client";
import { useState } from "react";
import PokemonSearchBar from "../components/PokemonSearchBar";
import PokemonList from "../components/PokemonList";
import MobileNavbar from "../components/MobileNavbar";

export default function Home() {
  const searchQuery = "";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PokemonSearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <PokemonList searchQuery={searchQuery} />
    </>
  );
}
