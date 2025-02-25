"use client";
import { useState } from "react";
import PokemonSearchBar from "../components/PokemonSearchBar";
import PokemonList from "../components/PokemonList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <PokemonSearchBar onSearch={setSearchQuery} />
      <PokemonList searchQuery={searchQuery} />
    </>
  );
}
