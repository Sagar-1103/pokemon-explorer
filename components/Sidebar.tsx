"use client";
import {
  Box,
  Button,
} from "@chakra-ui/react";
import { FaHome, FaExchangeAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const navigation = useRouter();
  return (
    <Box className="fixed left-0 top-0 h-full w-20 bg-gray-900 bg-opacity-80 backdrop-blur-lg text-yellow-300  flex-col items-center py-6 shadow-xl border-r-2 border-yellow-400 hidden md:flex">
      <div className="flex flex-col gap-6 my-auto">
        <Button onClick={() => navigation.push("/")} className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex justify-center items-center border-2 shadow-md transition-transform duration-200 hover:scale-110">
          <FaHome size={24} />
        </Button>
        <Button onClick={() => navigation.push("/compare")} className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex justify-center items-center border-2 shadow-md transition-transform duration-200 hover:scale-110">
          <FaExchangeAlt size={24} />
        </Button>
      </div>
    </Box>
  );
};

export default Sidebar;
