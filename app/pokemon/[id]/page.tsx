"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, PlayCircle } from "lucide-react";
import StatCircle from "../../../components/stat-circle";
import { use, useEffect, useState } from "react";

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

export default function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [pokemon, setPokemon] = useState<any>(null);
  const [sprites, setSprites] = useState<string[]>([]);
  const [displayedImage, setDisplayedImage] = useState<string | null>(null);
  const [moves, setMoves] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typeGradient, setTypeGradient] = useState<string>("from-gray-300 to-gray-500");
  const audio =
    typeof Audio !== "undefined"
      ? new Audio(
          `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`
        )
      : null;

  async function getPokemon(id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
      notFound();
    }
    const response = await res.json();
    setPokemon(response);

    const tempSprites = [
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      response?.sprites.front_default,
      response?.sprites.back_default,
      response?.sprites.front_shiny,
      response?.sprites.back_shiny,
    ].filter(Boolean);
    setSprites(tempSprites);
    setDisplayedImage(tempSprites[0]);

    setMoves(response?.moves);
    const primaryType = response.types?.[0]?.type?.name;
    setTypeGradient(typeColors[primaryType] || "from-gray-300 to-gray-500");
  }

  useEffect(() => {
    getPokemon(id);
  }, [id]);

  if (!pokemon) {
    return null;
  }

  const playCry = () => {
    if (audio) {
      if (!isPlaying) {
        audio.play();
        setIsPlaying(true);
        audio.onended = () => setIsPlaying(false);
      } else {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-900">
      <div className="p-6 bg-white shadow-lg rounded-2xl max-w-6xl mx-auto">
        <nav className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={22} />
            <span className="text-lg font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-red-500 transition">
              <Heart size={22} />
            </button>
            <button className="text-gray-600 hover:text-blue-500 transition">
              <Share2 size={22} />
            </button>
          </div>
        </nav>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md relative">
              <div className="flex justify-center space-x-10">
                <div className={`bg-gradient-to-r ${typeGradient} rounded-full`}>
                <Image
                  src={displayedImage || sprites[0]}
                  alt={pokemon?.name || "..."}
                  width={310}
                  height={310}
                  className=" drop-shadow-lg"
                />
                </div>
                <div>
                  <h1 className="text-5xl font-bold capitalize text-gray-800 mb-3 flex items-center gap-3">
                    {pokemon?.name}
                    <button
                      onClick={playCry}
                      className="text-gray-600 hover:text-gray-800 transition"
                    >
                      <PlayCircle size={32} />
                    </button>
                  </h1>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {pokemon?.types?.map((type: { type: { name: string } }) => {
                        const primaryType = type.type.name;
                        const col = typeColors[primaryType] || "from-gray-300 to-gray-500";
                        return (
                      <span
                        key={type.type.name}
                        className={`px-4 py-1 rounded-full text-sm font-medium capitalize bg-gradient-to-r text-white ${col}`}
                      >
                        {type.type.name}
                      </span>
                    )})}
                  </div>
                  <div className="text-gray-700 text-lg">
                    <p>Height: {pokemon?.height / 10}m</p>
                    <p>Weight: {pokemon?.weight / 10}kg</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 mt-6">
                {sprites?.map((sprite, index) => (
                  <div
                    key={index}
                    onClick={() => setDisplayedImage(sprite)}
                    className={`relative p-2 min-w-[100px] rounded-lg cursor-pointer transition duration-200 ${
                      sprite === displayedImage
                        ? "bg-gray-400 scale-105"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    <Image
                      src={sprite || "/placeholder.svg"}
                      alt={`${index + 1}`}
                      width={96}
                      height={96}
                    />
                    <button className="absolute bottom-2 right-2 text-white/80 hover:text-white">
                      <PlayCircle size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>


            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Moves
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {moves
                  ?.slice(0, 15)
                  ?.map((move: { move: { name: string } }) => (
                    <div
                      key={move.move.name}
                      className="bg-gray-100 p-2 rounded-lg text-gray-700 text-lg capitalize shadow-sm text-center"
                    >
                      {move.move.name.replace("-", " ")}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Key Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {pokemon?.stats?.map(
                  (stat: { base_stat: number; stat: { name: string } }) => (
                    <StatCircle
                      key={stat.stat.name}
                      value={stat.base_stat}
                      maxValue={255}
                      label={stat.stat.name}
                    />
                  )
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Abilities
              </h2>
              <div className="space-y-2">
                {pokemon?.abilities?.map(
                  (ability: { ability: { name: string } }) => (
                    <div
                      key={ability.ability.name}
                      className="bg-gray-100 p-3 rounded-lg text-gray-700 text-lg capitalize shadow-sm"
                    >
                      {ability.ability.name}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
