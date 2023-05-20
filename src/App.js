import { useState, useEffect, createContext } from 'react'
import Popup from './components/Popup'
import Header from './components/Header'
import Graph from './components/Graph'
import Board from './components/Board'
import Search from './components/Search'
import { Stock } from './Stock.js'
import { boardDefault } from "./BoardState"

export const AppContext = createContext()

function App () {
  // Popup window status
  const [popup, setPopup] = useState('none')

  // Dark/light mode status
  const [mode, setMode] = useState('light')
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light')
    }
  }
  useEffect(() => {
    document.body.className = mode
  })

  // Today's stock
  const magicStock = new Stock('Microsoft Corp')
  console.log(magicStock)

  // Board State
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState(0)

  return (
    <div className="App">
      <Header 
        mode={mode}
        setPopup={setPopup}
      />
      <Popup
        toggleMode={toggleMode}
        trigger={popup}
        setPopup={setPopup}
      />
      <Graph />
      <div className="game">
        <AppContext.Provider 
        value={{ 
          board, setBoard, 
          currAttempt, setCurrAttempt 
        }}>
          <Board />
          <Search />
        </AppContext.Provider>
      </div>
    </div>
  );
} 

export default App;
