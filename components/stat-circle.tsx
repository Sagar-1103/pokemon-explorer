"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface StatCircleProps {
  value: number;
  maxValue: number;
  label: string;
}

export default function StatCircle({ value, maxValue, label }: StatCircleProps) {
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
          stroke="rgba(147, 51, 234, 0.8)"
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
          className="text-2xl font-bold text-gray-600"
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
        <span className="text-xs text-gray-600 capitalize">{label}</span>
      </motion.div>
    </div>
  );
}
