var stock_info = require("./stock_info.json")

// I have NO idea why, but the arrow emotes seem to take up
// 4 bytes instead of 2, so to compensate, the checkbox emote
// has a whitespace after it. not scuffed LOL
const num_to_emote = {
  '-2': "⬆️",
  '-1': "↗️",
  0: "✅ ",
  1: "↘️",
  2: "⬇️"
}

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

  // usage: s1 should be today's stock
  // returns a list of the following format: [bool, bool, string, string, string, string]
  // if the bool is true, the player guessed the stock/sector in question
  // strings are what should be outputted on the board after user guesses this
  // emoticons: see num_to_emote at the top of the file
  // up/down = this is less/greater than s1 on this metric
  // diagonal = this is within 30% of s1 on this metric
  compare(s1) {
    return [
      s1.name === this.name, 
      this.compare_sector(s1.sector, this.sector), 
      this.compare_price(s1.share_price, this.share_price), 
      this.compare_cap(s1.market_cap, this.market_cap), 
      this.compare_revenue(s1.revenue, this.revenue), 
      this.compare_pe(s1.market_cap, s1.net_income, this.market_cap, this.net_income)
    ]
  }

  shorten_sector(s) {
    if (s === 'Financial Services') return 'Financials'
    else if (s === 'Consumer Defensive') return 'C. Staples'
    else if (s === 'Consumer Cyclical') return 'C. Discretion'
    else if (s === 'Communication Services') return 'Comms'
    else if (s === 'Basic Materials') return 'Materials'
    else return s
  }

  shorten_number(n) {
    if (n < 1000000) {
      return n
    } else if (n < 1000000000) {
      return `${Math.floor(n/10000)/100}M`
    } else if (n < 1000000000000) {
      return `${Math.floor(n/10000000)/100}B`
    } else {
      return `${Math.floor(n/10000000000)/100}T`
    }
  }

  compare_sector(s1, s2) {
    if (s1 === s2) return `${this.shorten_sector(s2)} ✅`;
    return `${this.shorten_sector(s2)} ❌`;
  }

  compare_price(s1, s2) {
    var x = 1
    if (s1 === s2) x = 0
    if (s2 < s1) x *= -1
    if (Math.abs(s2 - s1)/s1 > 0.3) x *= 2
    return `$${this.shorten_number(s2)} ${num_to_emote[x]}`
  }

  compare_cap(s1, s2) {
    var x = 1
    if (s1 === s2) x = 0
    if (s2 < s1) x *= -1
    if (Math.abs(s2 - s1)/s1 > 0.3) x *= 2
    return `${this.shorten_number(s2)} ${num_to_emote[x]}`
  }

  compare_revenue(s1, s2) {
    var x = 1
    if (s1 === s2) x = 0
    if (s2 < s1) x *= -1
    if (Math.abs(s2 - s1)/s1 > 0.3) x *= 2
    return `${this.shorten_number(s2)} ${num_to_emote[x]}`
  }

  compare_pe(s1mc, s1ni, s2mc, s2ni) {
    var x = 1
    var s1 = (s1mc / s1ni > 0) ? s1mc / s1ni : -1
    var s2 = (s2mc / s2ni > 0) ? s2mc / s2ni : -1
    if (s1 === s2) x = 0
    if (s1 === -1) {
      return `${Math.floor(s2 * 100) / 100} ⬆️`
    } else if (s2 === -1) {
      return `N/A ⬇️`
    } else {
      if (s2 < s1) x *= -1
      if (Math.abs(s2 - s1)/s1 > 0.3) x *= 2
      return `${Math.floor(s2 * 100) / 100} ${num_to_emote[x]}`
    }
  }
}

export { Stock };
