import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


export default function GamePlay({ pokemonData, setPokemonData, handleFetchPokemon, loading }) {
  const [counter, setCounter] = useState(1);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameEnd, setGameEnd] = useState('');

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

  const gameReset = () => {
    setCounter(0);
    setClickedCards([]);
    handleFetchPokemon();
    setGameEnd('');
  }

  let losingCard = clickedCards.slice(-1)
  
  function checkCard(e) {
    const targetCard = e.target.closest('.card').getAttribute('data-key');
    console.log(targetCard)
    console.log(losingCard)
  
    if (clickedCards.includes( targetCard)) {
      console.log('You Lose');
      setGameEnd('lost')
    } 
    if(counter === 10) {
      setGameEnd('won')
    } else {
      setCounter(count => count + 1)
      setClickedCards([...clickedCards,targetCard])
      console.log(`WinStreak: ${counter}`);
      handleShuffle();
      console.log(clickedCards)
    }
  }

  return (
    <>
      <div className='cardctn'>
        {Object.values(pokemonData).map((pokemon) => (
          <div key={uuidv4()} data-key={pokemon.name} className='card'  onClick={checkCard}>
            <div className='imagectn'>
              <img className='pokemonimg' src={pokemon.image} alt={pokemon.name} />
            </div>
            <div className='namectn'>
              <div className='name'>{pokemon.name}</div>
            </div>
          </div>
        ))}
        {loading ? (
            <div className='loading'>
              LOADING...
              <img className='pokeball' src='./pokeball.svg' alt='pokeball' />
            </div>
          ) : null}
        {gameEnd === 'lost' ? (
          <div className='gameEnd'>
            <div className='result'> You already clicked {losingCard}</div>
            <div className="resultbtn">
              <button className="startbtn" type="button" onClick={gameReset}>
                Try Again?
              </button>
            </div>
          </div>
        ) : null}
        {gameEnd === 'won' ? (
          <div className='gameEnd'>
            <div className='result'> You got them all! </div>
            <div className="resultbtn">
              <button className="startbtn" type="button" onClick={gameReset}>
                Play Again?
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}