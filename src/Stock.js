var stock_info = require("./stock_info.json")

// oop is js is so whack
class Stock {
  #name
  #ticker
  #sector
  #market_cap
  #share_price
  #revenue
  #net_income
  #summary

  // must pass the full name of the stock to initialize the object
  constructor(name) {
    const stock = stock_info.filter(s => s.name === name)

    this.name = name
    this.ticker = stock[0].ticker
    this.sector = stock[0].sector
    this.market_cap = stock[0].market_cap
    this.share_price = stock[0].share_price
    this.revenue = stock[0].revenue
    this.net_income = stock[0].net_income
    this.summary = stock[0].summary
  }

  // usage: s1 should be magicStock, s2 should be user guessed stock
  // returns a list of the following format: [bool, bool, int, int, int, int]
  // if bool is true, the player guessed the stock
  // int is a scale from -2 to 2: ⬆️↗️🟩↘⬇️
  // magnitude 2 = far away while magnitude 1 = close
  // negative = s2 is lower than s1 while positive = s2 is higher than s1
  compare(s1, s2) {
    if (s1.name === s2.name) {
      return [true, true, 0, 0, 0, 0]
    } else {
      return [
        false, 
        this.compare_sector(s1, s2), 
        this.compare_cap(s1, s2), 
        this.compare_price(s1, s2), 
        this.compare_revenue(s1, s2), 
        this.compare_income(s1, s2)
      ]
    }
  }

  compare_sector(s1, s2) {
    if (s1.sector === s2.sector) return true;
    return false;
  }

  // define close as within 10M
  compare_cap(s1, s2) {
    var x = 1
    if (s2 < s1) x *= -1
    if (Math.abs(s2 - s1) > 10000000) x *= 2
    return x
  }

  // define close as within $20
  compare_price(s1, s2) {
    var x = 1
    if (s2 < s1) x *= -1
    if (Math.abs(s2 - s1) > 20) x *= 2
    return x
  }

  // define close as within 100M (last quarter figure)
  compare_revenue(s1, s2) {
    var x = 1
    if (s2 < s1) x *= -1
    if (Math.abs(s2 - s1) > 100000000) x *= 2
    return x
  }

  // define close as within 10M (last quarter figure)
  compare_income(s1, s2) {
    var x = 1
    if (s2 < s1) x *= -1
    if (Math.abs(s2 - s1) > 2000000) x *= 2
    return x
  }
}

export { Stock };
