import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Finnhub Finanacial Instruments
import { ApiClient, DefaultApi } from 'finnhub'
import { favSymbols, symbolsName } from './data'

interface WebSocketMessage {
  c: null
  p: number // Last price
  s: string // Symbol
  t: number // UNIX milliseconds timestamp
  v: number // Volume
}

const WebSocketComponent: React.FC = () => {
  const [data, setData] = useState<WebSocketMessage[]>([])

  const [forexSymbols, setForexSymbols] = useState([])

  console.log('Saved Data', data)

  const mergeArraysByS = ((array: []) => {
    const lastObjectsMap: {} = {}

    return array => {
      // Iterate through array
      for (const currentObject of array) {
        // If 's' value is not in the map, add it
        if (currentObject.s && !(currentObject.s in lastObjectsMap)) {
          lastObjectsMap[currentObject.s] = currentObject
        } else if (currentObject.s) {
          // If 's' value is in the map, update it
          lastObjectsMap[currentObject.s] = { ...currentObject }
        }
      }

      // Extract values from the map to get the desired array
      const resultArray = Object.values(lastObjectsMap)

      // Display the resulting array
      console.log(resultArray)

      return resultArray
    }
  })()

  const getForexSymbols = () => {
    const api_key = ApiClient.instance.authentications['api_key']
    api_key.apiKey = 'clt319pr01qhnjgr3e70clt319pr01qhnjgr3e7g'

    const finnhubClient = new DefaultApi()

    finnhubClient.forexSymbols('OANDA', (error, data, response) => {
      console.log(data)
      setForexSymbols(data)
    })
  }

  useEffect(() => {
    getForexSymbols()
    const socket = new WebSocket('wss://ws.finnhub.io?token=clt319pr01qhnjgr3e70clt319pr01qhnjgr3e7g')

    // Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
      console.log('WebSocket connection opened')

      // forexSymbols.map(sym => socket.send(JSON.stringify({ type: 'subscribe', symbol: `${sym.symbol}` })))
      favSymbols.map(sym => socket.send(JSON.stringify({ type: 'subscribe', symbol: `${sym.symbol}` })))

      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }))

      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'MSFT' }))
      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'GOOGL' }))
      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'GOOG' }))

      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AMZN' }))
      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'META' }))
      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'TSLA' }))

      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'IC MARKETS:1' }))
      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }))
      // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:LTCBTC' }))
    })

    // Listen for messages
    socket.addEventListener('message', function (event) {
      const messageData: WebSocketMessage = JSON.parse(event.data)
      console.log('Message from server ', messageData)

      // Check if data is an array
      if (Array.isArray(messageData.data)) {
        setData(mergeArraysByS(messageData.data))

        // // Get the last object from the array
        // const lastObject = messageData.data[messageData.data.length - 1]
        // console.log('Last Message from server ', lastObject)

        // Check if the last object is defined
        // if (lastObject !== undefined) {
        //   // Update state with an array containing only the last object
        //   setData([lastObject])
        // }
      }
    })

    // Listen for errors
    socket.addEventListener('error', function (event) {
      console.error('WebSocket error:', event)
    })

    // Listen for close
    socket.addEventListener('close', function (event) {
      console.log('WebSocket closed:', event)
    })

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close()
    }
  }, []) // Empty dependency array ensures useEffect runs only once

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: '#25293C' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: '#2F3349', fontWeight: 'bold' }}>
              Symbols
            </TableCell>
            <TableCell align='left'>Signals</TableCell>
            <TableCell align='left'>Bid</TableCell>
            <TableCell align='left'>Ask</TableCell>
            <TableCell align='left'>1D Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <>
              {console.log('Row Data', row)}
              <TableRow
                key={index}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  style={{ color: 'white' }}
                  sx={{ position: 'sticky', left: 0, backgroundColor: '#2F3349' }}
                >
                  {symbolsName[row.s]}
                </TableCell>
                <TableCell align='left' style={{ color: 'white' }}>
                  {row.p.toFixed(5)}
                </TableCell>
                <TableCell align='left' style={{ color: 'white' }}>
                  {row.p.toFixed(4)}
                </TableCell>
                <TableCell align='left' style={{ color: 'white' }}>
                  {/* Add content based on your data structure */}
                </TableCell>
                <TableCell align='left' style={{ color: 'white' }}>
                  {/* Add content based on your data structure */}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WebSocketComponent
