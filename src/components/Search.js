import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { Stock } from '../Stock'
import '../css/Search.css'

var stock_info = require("../stock_info.json")

function Search({ setPopup }) {
  const [searchValue, setSearchValue] = useState('')
  const { board, setBoard, currAttempt, setCurrAttempt, todayStock } = useContext(AppContext)

  const onChange = (event) => {
    setSearchValue(event.target.value)
  }
  const onSearch = (searchTerm) => {
    setSearchValue('')
    const searchedStock = new Stock(searchTerm)
    var results = searchedStock.compare(todayStock)

    const newBoard = [...board]
    newBoard[currAttempt][0] = searchedStock.ticker
    newBoard[currAttempt][1] = results[1]
    newBoard[currAttempt][2] = results[2]
    newBoard[currAttempt][3] = results[3]
    newBoard[currAttempt][4] = results[4]
    newBoard[currAttempt][5] = results[5]
    setBoard(newBoard)
    setCurrAttempt(currAttempt + 1)

    if (results[0]) {
      console.log("win")
      setPopup('win')
    }
    // NOT WORKING :/
    if (currAttempt > 5) {
      console.log("lose")
      setPopup('lose')
    }
  }
  
  return (
    <div className="app">
      <div className="search-container">
        <div className="dropdown-wrapper">
          <div className="dropdown">
            {stock_info.filter(item => {
              const searchTerm = searchValue.toLowerCase()
              const stockName = item.name.toLowerCase()
              const stockTicker = item.ticker.toLowerCase()

              return searchTerm && (stockTicker.startsWith(searchTerm) ||
                (stockName.startsWith(searchTerm) && stockName !== searchTerm))
            }).slice(0, 10).map((item) => (
              <div
                className="dropdown-row"
                onClick={() => setSearchValue(item.name)}
                key={item.name}
              >
                {`${item.name} (${item.ticker})`}
              </div>
            ))}
          </div>
        </div>
        <div className="search-inner">
          <input
            type="text"
            value={searchValue}
            onChange={onChange}
          />
          <button
            onClick={() => onSearch(searchValue)}
          >
            Guess
          </button>
        </div>
      </div>
    </div>
    
  )
}

export default Search