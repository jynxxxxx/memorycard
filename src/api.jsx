import { useState } from 'react';
import GamePlay from './gameplay'


export default function PokemonAPI() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  async function getPokemon(dex) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dex}`);
      if (response.ok) {
        const data = await response.json();
        const { name, sprites } = data;
        const image = sprites.front_default;
        
        return { name, image };
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function getRandomDexes(min, max, count) {
    const uniqueDexes = new Set();

    while (uniqueDexes.size < count) {
      const dex = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueDexes.add(dex);
    }
    
    return Array.from(uniqueDexes);
  }

  const min = 1;
  const max = 386;
  const numberOfPokemon = 10;

  const randomDexes = getRandomDexes(min, max, numberOfPokemon);

  const handleFetchPokemon = async () => {
    setLoading(true); // Set loading to true when fetching data

    try {
      const allPokemon = randomDexes.map((dex) => getPokemon(dex));
      const initialPokemonData = await Promise.all(allPokemon);

      const capitalizedPokemonData = initialPokemonData.map((pokemon) => ({
        ...pokemon,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      }));

      setPokemonData(capitalizedPokemonData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setDataLoaded(true)
    }
  };

  return (
    <>
      <div className='buttonctn'>
        {!loading && !dataLoaded && ( // Render the button only when not loading
          <button className="startbtn" type="button" onClick={handleFetchPokemon}>
            Start Game
          </button>
        )}
      </div>
      <GamePlay pokemonData={pokemonData} setPokemonData={setPokemonData} handleFetchPokemon={handleFetchPokemon} loading={loading}></GamePlay>
    </>
  )
}