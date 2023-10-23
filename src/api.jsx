
export default function PokemonAPI( { setPokemonData }) {
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
    const allPokemon = randomDexes.map((dex) => getPokemon(dex));
    const initialPokemonData = await Promise.all(allPokemon);



    const capitalizedPokemonData = initialPokemonData.map((pokemon) => ({
      ...pokemon,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }));

    setPokemonData(capitalizedPokemonData);
  }

  return (
    <div>
      <button type="button" onClick={handleFetchPokemon}>
        Start Game
      </button>
    </div>
  )
}