import React, { useEffect, useState } from 'react'
import { ApiClient, DefaultApi } from 'finnhub'

const api_key = ApiClient.instance.authentications['api_key']
api_key.apiKey = 'clt319pr01qhnjgr3e70clt319pr01qhnjgr3e7g'

const finnhubClient = new DefaultApi()

const ForexSymbols = () => {
  const [forexSymbols, setForexSymbols] = useState([])
  const [cryptoSymbols, setCryptoSymbols] = useState([])
  const [stockSymbols, setStockSymbols] = useState([])

  useEffect(() => {
    finnhubClient.forexSymbols('OANDA', (error, data, response) => {
      if (error) {
        console.error(error)

        return
      }

      // Filter symbols where displaySymbol ends with "USD"
      const filteredData = data.filter(symbol => symbol.displaySymbol.endsWith('USD'))
      console.log('Forex', filteredData)
      setForexSymbols(filteredData)
    })
  }, []) // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    finnhubClient.cryptoSymbols('BINANCE', (error, data, response) => {
      if (error) {
        console.error(error)

        return
      }

      // Filter symbols where displaySymbol ends with "USD"
      const filteredData = data.filter(symbol => symbol.displaySymbol.endsWith('USD'))

      console.log('Crypto', filteredData)
      setCryptoSymbols(filteredData)
    })
  }, []) // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    finnhubClient.stockSymbols('OANDA', (error, data, response) => {
      console.log(data)
      if (error) {
        console.error(error)

        return
      }
      console.log('Stocks', data)

      // Filter symbols where displaySymbol ends with "USD"
      const filteredData = data
      setStockSymbols(filteredData)
    })
  }, []) // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h1>Forex Symbols Ending with USD</h1>
      <ol>
        {forexSymbols.map(symbol => (
          <li key={symbol.symbol}>{symbol.symbol}</li>
        ))}
      </ol>
      <h1>Crypto Symbols Ending with USD</h1>
      <ol>
        {cryptoSymbols.map(symbol => (
          <li key={symbol.symbol}>{symbol.symbol}</li>
        ))}
      </ol>
      <h1>Stock Symbols</h1>
      <ol>
        {stockSymbols.map(symbol => (
          <li key={symbol.symbol}>{symbol.displaySymbol}</li>
        ))}
      </ol>
    </div>
  )
}

export default ForexSymbols
