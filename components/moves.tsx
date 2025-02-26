import React from "react";

export default function Moves({ typeGradient, moves }: any) {
  return (
    <div className="bg-gradient-to-r w-[90%] md:w-full from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">Moves</span>
        <div
          className={`w-2 h-2 rounded-full bg-gradient-to-r ${typeGradient}`}
        ></div>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {moves?.slice(0, 16)?.map((move: { move: { name: string } }) => (
          <div
            key={move.move.name}
            className="p-3 bg-white rounded-lg text-gray-700 text-sm md:text-base font-semibold capitalize shadow-sm text-center transition duration-200"
          >
            {move.move.name.replace(/-/g, " ")}
          </div>
        ))}
      </div>
      {moves.length > 16 && (
        <div className="col-span-2 text-center mt-2">
          <span className="text-gray-500 text-sm">
            +{moves.length - 16} more Moves
          </span>
        </div>
      )}
    </div>
  );
}
