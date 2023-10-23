import { useState } from 'react'
import PokemonAPI from './api'
import { v4 as uuidv4 } from 'uuid';


export default function GamePlay() {
  const [pokemonData, setPokemonData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  function shuffleCards(pokemonData) {
    const shuffledArray = [...pokemonData];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    }
    return shuffledArray;
  }
  
  const handleShuffle = () => {
    const shuffledArray = shuffleCards(pokemonData);
    setPokemonData(shuffledArray);
  };


  function checkCard(e) {
    const targetCard = e.target.closest('.card').getAttribute('data-key');

    console.log(`clicked: ${ targetCard}`)
    console.log(pokemonData)
    console.log(e.target)
    console.log(clickedCards)
  
    if (clickedCards.includes( targetCard)) {
      console.log('You Lose');
      setCounter(0);
      handleShuffle();
      setClickedCards([]);
    } else {
      setCounter(count => count + 1)
      setClickedCards([...clickedCards,targetCard])
      console.log(`WinStreak: ${counter}`);
      handleShuffle();
    }
  }

  return (
    <div>
      <PokemonAPI pokemonData={pokemonData} setPokemonData={setPokemonData}></PokemonAPI>
      <div className='cardctn'>
        {Object.values(pokemonData).map((pokemon) => (
          <div key={uuidv4()} data-key={pokemon.name} className='card'  onClick={checkCard}>
            <img className='pokemonimg' src={pokemon.image} alt={pokemon.name} />
            <div className='name'>{pokemon.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}