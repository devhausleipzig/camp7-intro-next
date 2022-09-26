import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Poke() {
  const router = useRouter();
  const { name } = router.query;
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((res) => setPokemon(res));
  }, [name]);

  if (!name) return;

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>{pokemon.id}</p>
    </div>
  );
}
