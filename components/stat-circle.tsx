"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface StatCircleProps {
  value: number;
  maxValue: number;
  label: string;
  type:string;
  colorToPass:string;
}

const typeColors: Record<string, string> = {
  fire: "rgba(239, 68, 68, 0.9)", 
  water: "rgba(59, 130, 246, 0.9)", 
  grass: "rgba(34, 197, 94, 0.9)", 
  electric: "rgba(234, 179, 8, 0.9)", 
  ice: "rgba(125, 211, 252, 0.9)",  
  fighting: "rgba(220, 38, 38, 0.9)",  
  poison: "rgba(147, 51, 234, 0.9)", 
  ground: "rgba(202, 138, 4, 0.9)", 
  flying: "rgba(96, 165, 250, 0.9)",  
  psychic: "rgba(236, 72, 153, 0.9)", 
  bug: "rgba(101, 163, 13, 0.9)",  
  rock: "rgba(168, 85, 247, 0.9)", 
  ghost: "rgba(76, 29, 149, 0.9)",  
  dragon: "rgba(67, 56, 202, 0.9)", 
  dark: "rgba(31, 41, 55, 0.9)",  
  steel: "rgba(107, 114, 128, 0.9)", 
  fairy: "rgba(244, 114, 182, 0.9)",  
  normal: "rgba(156, 163, 175, 0.9)",  
};

export default function StatCircle({ value, maxValue, label,type,colorToPass }: StatCircleProps) {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 44; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ strokeDashoffset, transition: { duration: 1.5, ease: "easeOut" } });
  }, [strokeDashoffset, controls]);

  return (
    <div className="stat-circle flex flex-col items-center justify-center relative">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="rgb(211,211,211)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          stroke={typeColors[type]}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={controls}
          strokeLinecap="round"
        />
      </svg>
      <motion.div
        className="absolute flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
        <motion.span
          className={`text-2xl font-bold ${colorToPass}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            {value}
          </motion.span>
        </motion.span>
        <span className={`text-xs ${colorToPass} capitalize`}>{label}</span>
      </motion.div>
    </div>
  );
}
