import React from "react";

export default function GameVersions({ typeGradient, game_indices }: any) {
  return (
    <div className="bg-gradient-to-r w-[90%] md:w-full from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">Game Versions</span>
        <div
          className={`w-2 h-2 rounded-full bg-gradient-to-r ${typeGradient}`}
        ></div>
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {game_indices
          ?.slice(0, 8)
          .map((game: { version: { name: string } }) => (
            <div
              key={game.version.name}
              className="bg-white font-semibold p-2 rounded-lg text-gray-700 text-sm capitalize shadow-sm text-center"
            >
              {game.version.name.replace("-", " ")}
            </div>
          ))}
        {game_indices?.length > 8 && (
          <div className="col-span-2 text-center ">
            <span className="text-gray-500 text-sm">
              +{game_indices?.length - 8} more versions
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
