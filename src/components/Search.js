import { useState } from 'react'
import './Search.css'
var stock_info = require("../stock_info.json")

function Search() {
  const [searchValue, setSearchValue] = useState('')
  const onChange = (event) => {
    setSearchValue(event.target.value)
  }
  const onSearch = (searchTerm) => {
    setSearchValue('')
    console.log('searched', searchTerm) // Replace this line!
  }
  
  return (
    <div className="app">
      <div className="search-container">
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
        <div className="dropdown">
          {stock_info.filter(item => {
            const searchTerm = searchValue.toLowerCase()
            const stockName = item.name.toLowerCase()
            const stockTicker = item.ticker.toLowerCase()

            return searchTerm && (stockTicker.startsWith(searchTerm) || 
                  (stockName.includes(searchTerm) && stockName !== searchTerm))
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
    </div>
    
  )
}

export default Search