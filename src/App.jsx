import { useState } from 'react'
import './App.css'
// import GamePlay from './gameplay'
import PokemonAPI from './api'

function App() {


  return (
    <>
      <div className='masterctn'>
          <div className='title'>
            <div className='logoctn'>
              <img className='logo' src='./logo.png' alt='Pokemon Logo' />
            </div>
            <div className='titletext'>Memory Game</div>
          </div>
          <div className='rules'>
            Try to click all of the cards once!
          </div>
      
        <div className='mainctn'>
          <PokemonAPI></PokemonAPI>
        </div>
      </div>
    </>
  );
}

export default App;
