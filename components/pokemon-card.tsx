"use client";
import { Box, Badge, Image, Text, VStack } from "@chakra-ui/react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    grass: "green.400",
    fire: "red.400",
    water: "blue.400",
    electric: "yellow.400",
    bug: "green.600",
    poison: "purple.500",
    normal: "gray.300",
    flying: "blue.200",
    fairy: "pink.300",
    psychic: "pink.400",
    ghost: "purple.700",
    ground: "yellow.600",
    rock: "gray.600",
    dragon: "indigo.500",
    steel: "gray.400",
    dark: "gray.800",
    ice: "cyan.400",
    fighting: "orange.400",
  };
  return colors[type] || "gray.200";
};

interface PokemonCardProps {
  name:string,
  onClick?:()=>void
}

const PokemonCard = ({ name,onClick }: PokemonCardProps) => {
  const { data: pokemon, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!pokemon) return <div>Loading...</div>;

  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default || "";
  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const bgColor = getTypeColor(primaryType);
  console.log(bgColor);
  const paddedId = `#${pokemon.id.toString().padStart(3, "0")}`;

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="xl"
      p="4"
      width="200px"
      textAlign="center"
      position="relative"
      paddingTop={20}
      className="group"
      onClick={onClick}
    >
      <Box
        position="absolute"
        top="5%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Image src={imageUrl} className="group-hover:scale-[130%] transition-transform duration-200 ease-in-out" alt={pokemon.name} boxSize="100px" />
      </Box>

      <VStack>
        <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
          {pokemon.name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {paddedId}
        </Text>
      </VStack>

      <Box mt={2}>
        {pokemon.types.map((t: any) => (
          <Badge
            key={t.type.name}
            bg={getTypeColor(t.type.name)}
            color="white"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="sm"
            mx={1}
            className="capitalize"
          >
            {t.type.name}
          </Badge>
        ))}
      </Box>
    </Box>
  );
};

export default PokemonCard;
