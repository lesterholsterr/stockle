import { useState, useEffect } from 'react'

import Popup from './components/Popup'

import Header from './components/Header'
import Graph from './components/Graph'
import Guesses from './components/Guesses'
import Search from './components/Search'

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

  return (
    <>
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
      <Guesses />
      <Search />
    </>
  );
} 

export default App;
