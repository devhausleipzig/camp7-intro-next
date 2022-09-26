import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";

type Pokemon = {
  name: string;
  url: string;
};

interface Props {
  pokemon: Pokemon[];
  name: string;
}

export default function Pokemon({ pokemon, name }: Props) {
  return (
    <div className="p-8">
      {name}
      <div className="grid grid-cols-6 gap-8">
        {pokemon.map((poke, idx) => (
          <Link href={`/pokemon/${poke.name}`} key={poke.name}>
            <div className="cursor-pointer flex-col border aspect-square flex justify-center items-center font-4xl font-bold">
              <div className="relative w-1/2 aspect-square">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    idx + 1
                  }.png`}
                  alt={poke.name}
                  layout="fill"
                />
              </div>
              <p>{poke.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((res) => res.results);

  return {
    props: {
      pokemon: pokemon,
    },
  };
};
