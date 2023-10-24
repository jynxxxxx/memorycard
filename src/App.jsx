import { useState } from 'react'
import './App.css'
import GamePlay from './gameplay'

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
          <GamePlay></GamePlay>
        </div>
      </div>
    </>
  );
}

export default App;
