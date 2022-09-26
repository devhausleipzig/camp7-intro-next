import { useEffect, useState } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((res) => setPokemon(res.results));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {pokemon.map((poke) => (
        <div key={poke.name}>{poke.name}</div>
      ))}
    </div>
  );
}
