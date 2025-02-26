"use client";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import PokemonCard from "./pokemon-card";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Pagination from "./pagination";
import Loading from "./Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface PokemonListProps {
  searchQuery: string;
}

export default function PokemonList({ searchQuery }: PokemonListProps) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, error } = useSWR(
    searchQuery
      ? `https://pokeapi.co/api/v2/pokemon/${searchQuery}`
      : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`,
    fetcher
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  
  if (error)
    return (
      <div className="text-red-500  bg-gray-900 text-xl min-h-screen">
        ⚠️ Pokémon not found!
      </div>
    );
  if (!data) return <Loading hidden={true} transparent={true} />;

  const handlePokemonClick = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <>
      <div className="bg-gray-900 pt-12 pb-4 min-h-screen">
        <Flex wrap="wrap" gapY="20" gapX={"6"} justify="center">
          {searchQuery ? (
            <PokemonCard key={data.name} name={data.name} />
          ) : (
            data.results.map(
              (pokemon: { name: string; url: string }, index: number) => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  onClick={() =>
                    handlePokemonClick((page - 1) * 20 + index + 1)
                  }
                />
              )
            )
          )}
        </Flex>
      </div>
      {!searchQuery && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(data.count / 20)}
          onPageChange={setPage}
        />
      )}
    </>
  );
}
