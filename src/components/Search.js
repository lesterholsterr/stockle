import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { Stock } from '../Stock'
import '../css/Search.css'

var stock_info = require("../stock_info.json")

function Search() {
  const [searchValue, setSearchValue] = useState('')
  const { board, setBoard, currAttempt, setCurrAttempt } = useContext(AppContext)

  const onChange = (event) => {
    setSearchValue(event.target.value)
  }
  const onSearch = (searchTerm) => {
    setSearchValue('')
    const searchedStock = new Stock(searchTerm)

    const newBoard = [...board]
    newBoard[currAttempt][0] = searchedStock.ticker
    newBoard[currAttempt][1] = searchedStock.sector
    newBoard[currAttempt][2] = searchedStock.share_price
    newBoard[currAttempt][3] = searchedStock.market_cap
    newBoard[currAttempt][4] = searchedStock.revenue
    newBoard[currAttempt][5] = searchedStock.net_income
    setCurrAttempt(currAttempt + 1)
    setBoard(newBoard)
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