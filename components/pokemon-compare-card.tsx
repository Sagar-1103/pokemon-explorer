import React from 'react';
import { motion } from "framer-motion";
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import StatCircle from './stat-circle';

interface PokemonType {
  type: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  height?: number;
  weight?: number;
  stats: Stat[];
  abilities?: Ability[];
}

interface PokemonCompareCardProps {
  pokemon: Pokemon;
  index: number;
  winner: number | null;
  typeColors: Record<string, string>;
  handleRemovePokemon: (index: number) => void;
  compareMode: "physical" | "stats" | "abilities";
  getStatColor: (statValue: number) => string;
}


export default function PokemonCompareCard({ pokemon, index,winner,typeColors,handleRemovePokemon,compareMode,getStatColor }:PokemonCompareCardProps) {
    if (!pokemon) return null;
    
    const isWinner = winner === index;
    const typeClass = typeColors[pokemon.types?.[0]?.type?.name] || "from-gray-300 to-gray-500";
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`relative w-full rounded-2xl shadow-2xl text-center border-4 ${isWinner ? 'border-yellow-400' : 'border-gray-700'} bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center p-6`}
      >
        {isWinner && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-4 -right-4 bg-yellow-400 text-black font-bold py-1 px-3 rounded-full z-10"
          >
            Winner!
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
          onClick={() => handleRemovePokemon(index)}
        >
          <FaTimes />
        </motion.button>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`bg-gradient-to-r ${typeClass} p-4 rounded-full mb-4 shadow-lg`}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            width={180}
            height={180}
            className="drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
          />
        </motion.div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold capitalize mt-2 text-white"
        >
          {pokemon.name}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mt-2"
        >
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className={`inline-block px-3 py-1 rounded-full capitalize text-white bg-gradient-to-r ${typeColors[typeInfo.type.name]}`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </motion.div>

        {compareMode === "physical" && pokemon.height !== undefined && pokemon.weight !== undefined && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 grid grid-cols-2 gap-4 w-full"
          >
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Height</p>
              <p className="text-white text-xl font-bold">{pokemon.height / 10}m</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Weight</p>
              <p className="text-white text-xl font-bold">{pokemon.weight / 10}kg</p>
            </div>
          </motion.div>
        )}
        
        {compareMode === "stats" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 w-full"
          >
            <h3 className="text-xl font-semibold text-yellow-300 mb-3">Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {pokemon.stats.map((stat) => (
                <motion.div 
                  key={stat.stat.name}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * pokemon.stats.indexOf(stat) }}
                  className="flex flex-col items-center"
                >
                  <StatCircle
                    value={stat.base_stat}
                    maxValue={255}
                    label={stat.stat.name}
                    type={pokemon?.types?.[0]?.type?.name}
                    colorToPass={"text-gray-200"}
                  />
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "100%" }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-2"
            >
              <span className="text-gray-400">Total:</span>
              <span className={`ml-2 font-bold text-lg ${getStatColor(pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0))}`}>
                {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
              </span>
            </motion.div>
          </motion.div>
        )}
        
        {compareMode === "abilities" && pokemon.abilities !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 w-full"
          >
            <h3 className="text-xl font-semibold text-yellow-300 mb-3">Abilities</h3>
            <div className="flex flex-col gap-2">
              {pokemon.abilities.map((ability, idx) => (
                <motion.div
                  key={ability.ability.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-gray-800 p-2 rounded-lg flex items-center"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${typeClass} mr-2`}></div>
                  <span className="capitalize text-white">{ability.ability.name.replace("-", " ")}</span>
                  {ability.is_hidden && (
                    <span className="ml-2 text-xs bg-purple-700 text-white px-2 py-0.5 rounded-full">
                      Hidden
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };
