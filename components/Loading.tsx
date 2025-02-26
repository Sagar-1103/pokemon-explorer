"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Pokeball from "../public/pokeball.svg";
import Cover from "../public/cover.jpg";

interface LoadingProps {
  hidden?:boolean;
  transparent?:boolean;
}

export default function Loading({hidden,transparent}:LoadingProps) {
  return (
    <div className={`flex items-center justify-center h-screen ${!transparent && "bg-red-500" }`}>
      {!hidden && <div style={{ backgroundImage: `url(${Cover.src})` }} className="absolute inset-0 bg-cover bg-center opacity-20" />}
      <motion.div
        className="rounded-full relative overflow-hidden shadow-lg"
        animate={{
          rotate: [0, -10, 10, -8, 8, -5, 5, 0],
          y: [0, -5, 0, 5, -3, 3, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <Image height={250} width={250} src={Pokeball} alt="pokeball" />
      </motion.div>
    </div>
  );
}
