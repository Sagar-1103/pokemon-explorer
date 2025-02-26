"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmptySlot from "../../components/EmptySlot";
import PokemonCompareCard from "../../components/pokemon-compare-card";
import MobileNavbarToggle from "../../components/MobileNavbarToggle";
import MobileNavbar from "../../components/MobileNavbar";

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: { type: { name: string } }[];
}

const typeColors: Record<string, string> = {
  fire: "from-red-500 to-orange-500",
  water: "from-blue-500 to-cyan-500",
  grass: "from-green-500 to-lime-500",
  electric: "from-yellow-500 to-orange-400",
  ice: "from-blue-300 to-teal-400",
  fighting: "from-red-600 to-pink-600",
  poison: "from-purple-600 to-indigo-600",
  ground: "from-yellow-700 to-amber-600",
  flying: "from-blue-400 to-indigo-400",
  psychic: "from-pink-500 to-purple-500",
  bug: "from-green-600 to-lime-600",
  rock: "from-yellow-600 to-amber-500",
  ghost: "from-indigo-700 to-purple-700",
  dragon: "from-indigo-600 to-blue-600",
  dark: "from-gray-800 to-black",
  steel: "from-gray-500 to-gray-600",
  fairy: "from-pink-400 to-rose-400",
  normal: "from-gray-400 to-gray-500",
};

async function fetchPokemon(name: string) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

export default function Compare() {
  const [pokemonSlots, setPokemonSlots] = useState<(Pokemon | null)[]>([null, null]);
  const [inputValues, setInputValues] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState<boolean[]>([false, false]);
  const [error, setError] = useState<boolean[]>([false, false]);
  const [winner, setWinner] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState<"stats" | "abilities" | "physical">("stats");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  useEffect(() => {
    if (pokemonSlots[0] && pokemonSlots[1]) {
      const totalStats0 = pokemonSlots[0].stats.reduce((total, stat) => total + stat.base_stat, 0);
      const totalStats1 = pokemonSlots[1].stats.reduce((total, stat) => total + stat.base_stat, 0);
      
      if (totalStats0 > totalStats1) {
        setWinner(0);
      } else if (totalStats1 > totalStats0) {
        setWinner(1);
      } else {
        setWinner(null); 
      }
    } else {
      setWinner(null);
    }
  }, [pokemonSlots]);

  const handleAddPokemon = async (index: number) => {
    if (!inputValues[index].trim()) return;
    
    const newLoading = [...loading];
    newLoading[index] = true;
    setLoading(newLoading);
    
    const newError = [...error];
    newError[index] = false;
    setError(newError);
    
    const pokemon = await fetchPokemon(inputValues[index]);
    
    newLoading[index] = false;
    setLoading(newLoading);
    
    if (pokemon) {
      const newSlots = [...pokemonSlots];
      newSlots[index] = pokemon;
      setPokemonSlots(newSlots);
    } else {
      newError[index] = true;
      setError(newError);
    }
  };

  const handleRemovePokemon = (index: number) => {
    const newSlots = [...pokemonSlots];
    newSlots[index] = null;
    setPokemonSlots(newSlots);
    
    const newError = [...error];
    newError[index] = false;
    setError(newError);
  };

  const getStatColor = (statValue: number) => {
    if (statValue < 50) return "text-red-500";
    if (statValue < 80) return "text-yellow-500";
    if (statValue < 100) return "text-green-500";
    return "text-blue-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <MobileNavbarToggle isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      <MobileNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl pt-10 md:pt-0 font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-red-500 to-pink-500"
        >
          Pokémon Battle Stats
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-8"
        >
          Compare two Pokémon to see which one has better stats
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8 gap-4"
        >
          {["stats", "abilities", "physical"].map((mode) => (
            <button
              key={mode}
              onClick={() => setCompareMode(mode as "stats" | "abilities" | "physical")}
              className={`px-4 py-2 rounded-full transition-all ${
                compareMode === mode
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          <AnimatePresence mode="wait">
            {[0, 1].map((index) => (
              <motion.div
                key={`slot-${index}`}
                initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="w-full md:w-[45%] md:max-w-md"
              >
                {pokemonSlots[index] ? (
                  <PokemonCompareCard  pokemon={pokemonSlots[index]} index={index} winner={winner} typeColors={typeColors} handleRemovePokemon={handleRemovePokemon} compareMode={compareMode} getStatColor={getStatColor}  />
                ) : (
                  <EmptySlot index={index} inputValues={inputValues} setInputValues={setInputValues} handleAddPokemon={handleAddPokemon} loading={loading} error={error}/>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {pokemonSlots[0] && pokemonSlots[1] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={() => {
                setPokemonSlots([null,null])
                setInputValues(["",""])
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
            >
              Reset Comparison
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}