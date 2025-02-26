"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";
import StatCircle from "../../../components/stat-circle";
import { use, useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import EvolutionChain from "../../../components/evolution-chain";
import Moves from "../../../components/moves";
import Abilities from "../../../components/Abilities";
import GameVersions from "../../../components/game-versions";
import Pokeball from "../../../public/pokeball.svg";

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
  const [speciesData, setSpeciesData] = useState<any>(null);
  const [evolutionChain, setEvolutionChain] = useState<any[]>([]);
  const [sprites, setSprites] = useState<string[]>([]);
  const [displayedImage, setDisplayedImage] = useState<string | null>(null);
  const [moves, setMoves] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typeGradient, setTypeGradient] = useState<string>(
    "from-gray-300 to-gray-500"
  );
  const [isLoading, setIsLoading] = useState(true);
  const audio =
    typeof Audio !== "undefined"
      ? new Audio(
          `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`
        )
      : null;

  async function getPokemon(id: string) {
    setIsLoading(true);
    try {
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

      const speciesRes = await fetch(response.species.url);
      const speciesResponse = await speciesRes.json();
      setSpeciesData(speciesResponse);

      if (speciesResponse.evolution_chain?.url) {
        const evolutionRes = await fetch(speciesResponse.evolution_chain.url);
        const evolutionResponse = await evolutionRes.json();
        const processedEvolutions = processEvolutionChain(
          evolutionResponse.chain
        );
        setEvolutionChain(processedEvolutions);
      }
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  function processEvolutionChain(chain: any) {
    const evolutions = [];
    let current = chain;

    const basePokemonId = extractIdFromUrl(current.species.url);
    evolutions.push({
      id: basePokemonId,
      name: current.species.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${basePokemonId}.png`,
    });

    while (current.evolves_to?.length > 0) {
      current = current.evolves_to[0]; 
      const evolutionId = extractIdFromUrl(current.species.url);
      evolutions.push({
        id: evolutionId,
        name: current.species.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionId}.png`,
      });
    }

    return evolutions;
  }

  function extractIdFromUrl(url: string) {
    const matches = url.match(/\/pokemon-species\/(\d+)\//);
    return matches ? matches[1] : null;
  }

  useEffect(() => {
    getPokemon(id);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [id]);

  if (isLoading) {
    return <Loading hidden={true} />;
  }

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
    <div className="container p-4 mx-auto px-2 sm:px-4 min-h-screen bg-gray-900">
      <div className="p-3 sm:p-6 bg-white shadow-lg rounded-2xl max-w-6xl mx-auto">
        <nav className="flex items-center justify-between mb-4 sm:mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm sm:text-lg font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-red-500 transition">
              <Image
                className="hover:rotate-12"
                src={Pokeball}
                height={28}
                width={28}
                alt="..."
              />
            </button>
          </div>
        </nav>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-4 sm:gap-8">
          <div className="space-y-4  sm:space-y-6">
            <div
              className={`p-4 sm:p-8 rounded-2xl shadow-md w-[90%] md:w-full relative overflow-hidden bg-gradient-to-br ${typeGradient}`}
            >
              <div className="absolute top-0 right-0 opacity-10">
                {/* <div className="w-32 sm:w-64 h-32 sm:h-64 -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 rounded-full bg-white"></div> */}
              </div>
              <div className="flex flex-col w-full sm:flex-row justify-between items-center space-y-6 sm:space-y-0 sm:space-x-6 relative z-10">
                <div className="flex-shrink-0">
                  <div className="bg-white bg-opacity-30 rounded-full p-2 sm:p-4">
                    <Image
                      src={displayedImage || sprites[0]}
                      alt={pokemon?.name || "Pokemon"}
                      width={240}
                      height={240}
                      className="drop-shadow-lg  w-40 h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-contain"
                    />
                  </div>
                </div>

                <div className="text-center sm:text-left w-full">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize text-white mb-2 sm:mb-3 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 drop-shadow-md">
                      {pokemon?.name}
                      <button
                        onClick={playCry}
                        className="text-white hover:text-yellow-300 transition"
                        title="Play cry"
                      >
                        <PlayCircle size={24} className="sm:w-8 sm:h-8" />
                      </button>
                    </h1>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 justify-center sm:justify-start">
                      {pokemon?.types?.map(
                        (type: { type: { name: string } }) => (
                          <span
                            key={type.type.name}
                            className="px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium capitalize bg-white bg-opacity-30 text-white shadow-sm"
                          >
                            {type.type.name}
                          </span>
                        )
                      )}
                    </div>
                    <div className="text-white text-sm sm:text-lg grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2">
                      <p>
                        <span className="font-medium opacity-80">Height:</span>{" "}
                        {pokemon?.height / 10}m
                      </p>
                      <p>
                        <span className="font-medium opacity-80">Weight:</span>{" "}
                        {pokemon?.weight / 10}kg
                      </p>
                      <p>
                        <span className="font-medium opacity-80">
                          National #:
                        </span>{" "}
                        {id}
                      </p>
                      <p>
                        <span className="font-medium opacity-80">Base XP:</span>{" "}
                        {pokemon?.base_experience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 pt-4 sm:pt-6 mt-2 sm:mt-4 no-scrollbar">
                {sprites?.map((sprite, index) => (
                  <div
                    key={index}
                    onClick={() => setDisplayedImage(sprite)}
                    className={`relative p-1 sm:p-2 min-w-[60px] sm:min-w-[80px] rounded-lg cursor-pointer transition duration-200 ${
                      sprite === displayedImage
                        ? "bg-white bg-opacity-40 scale-105"
                        : "bg-white bg-opacity-20 hover:bg-opacity-30"
                    }`}
                  >
                    <Image
                      src={sprite || "/placeholder.svg"}
                      alt={`${pokemon?.name} sprite ${index + 1}`}
                      width={76}
                      height={76}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {evolutionChain.length > 1 && (
              <EvolutionChain
                evolutionChain={evolutionChain}
                typeGradient={typeGradient}
                speciesData={speciesData}
                id={id}
              />
            )}

            {moves.length > 1 && (
              <Moves typeGradient={typeGradient} moves={moves} />
            )}

            <div className="bg-gradient-to-r block lg:hidden w-[90%] md:w-full from-gray-100 to-gray-200 p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 flex items-center">
                <span className="mr-2">Base Stats</span>
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${typeGradient}`}
                ></div>
              </h2>
              <div className="grid grid-cols-2 justify-items-center gap-2 sm:gap-3">
                {pokemon?.stats?.map(
                  (stat: { base_stat: number; stat: { name: string } }) => (
                    <StatCircle
                      key={stat.stat.name}
                      value={stat.base_stat}
                      maxValue={255}
                      label={stat.stat.name.replace("-", " ")}
                      type={pokemon?.types?.[0]?.type?.name}
                      colorToPass="text-gray-600"
                    />
                  )
                )}
              </div>
              <div className="mt-4 sm:mt-6 p-2 sm:p-3 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total</span>
                  <span className="text-gray-800 font-bold">
                    {pokemon?.stats?.reduce(
                      (sum: number, stat: { base_stat: number }) =>
                        sum + stat.base_stat,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="block lg:hidden">
              <Abilities
                typeGradient={typeGradient}
                abilities={pokemon?.abilities}
              />
            </div>

            <div className="block lg:hidden">
              <GameVersions
                typeGradient={typeGradient}
                game_indices={pokemon?.game_indices}
              />
            </div>
          </div>

          <div className="space-y-6 hidden lg:block">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <span className="mr-2">Base Stats</span>
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${typeGradient}`}
                ></div>
              </h2>
              <div className="grid grid-cols-2 justify-items-center gap-6">
                {pokemon?.stats?.map(
                  (stat: { base_stat: number; stat: { name: string } }) => (
                    <StatCircle
                      key={stat.stat.name}
                      value={stat.base_stat}
                      maxValue={255}
                      label={stat.stat.name.replace("-", " ")}
                      type={pokemon?.types?.[0]?.type?.name}
                      colorToPass="text-gray-600"

                    />
                  )
                )}
              </div>
              <div className="mt-6 p-3 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total</span>
                  <span className="text-gray-800 font-bold">
                    {pokemon?.stats?.reduce(
                      (sum: number, stat: { base_stat: number }) =>
                        sum + stat.base_stat,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Abilities
              typeGradient={typeGradient}
              abilities={pokemon?.abilities}
            />

            <GameVersions
              typeGradient={typeGradient}
              game_indices={pokemon?.game_indices}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
