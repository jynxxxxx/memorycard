import { useState } from 'react'
import './App.css'
import GamePlay from './gameplay'

function App() {


  return (
    <>
      <div className='title'>
        Pokemon Memory Game
      </div>
      <div className='rules'>
        Click one Pokemon and continue to find it every shuffle
      </div>
      <div>
        <GamePlay></GamePlay>
      </div>
    </>
  );
}

export default App;
