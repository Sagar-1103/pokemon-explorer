import React from 'react';
import { motion } from "framer-motion";
import { FaPlus, FaSearch, FaSyncAlt } from 'react-icons/fa';

interface EmptySlotProps {
  index: number;
  inputValues: string[];
  setInputValues: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddPokemon: (index: number) => void;
  error: Record<number, boolean>; 
  loading: Record<number, boolean>; 
}


export default function EmptySlot({ index,inputValues,setInputValues,handleAddPokemon,error,loading }:EmptySlotProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full p-6 rounded-2xl shadow-lg border-2 border-dashed border-gray-700 bg-gray-800 flex flex-col items-center justify-center min-h-[300px]"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter Pokémon Name or ID"
          value={inputValues[index]}
          autoCapitalize="on"
          onChange={(e) => {
            const newInputValues = [...inputValues];
            newInputValues[index] = e.target.value;
            setInputValues(newInputValues);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddPokemon(index);
          }}
          className="mb-4 p-3 pl-10 border rounded-full text-center w-full bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FaSearch className="absolute left-3 top-3.5 text-gray-500" />
      </div>
      
      {error[index] && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mb-3"
        >
          Pokémon not found
        </motion.p>
      )}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleAddPokemon(index)}
        disabled={loading[index]}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-colors"
      >
        {loading[index] ? (
          <FaSyncAlt className="animate-spin" />
        ) : (
          <>
            <FaPlus /> Add Pokémon
          </>
        )}
      </motion.button>
    </motion.div>
  )
}
