// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const createData = (
  symbol: string,
  type: string,
  volume: number,
  openPrice: number,
  currentPrice: number,
  tp: number,
  sl: number,
  order: string,
  openTime: string,
  swap: number,
  commission: number,
  pl: number
) => {
  return { symbol, type, volume, openPrice, currentPrice, tp, sl, order, openTime, swap, commission, pl }
}

const rows = [
  createData(
    'EURUSD',
    'sell',
    0.1,
    1.09115,
    1.09203,
    1.04944,
    1.04029,
    '90444134',
    'Dec 18, 12:52:12 PM',
    0,
    -0.7,
    8.29
  ),
  createData(
    'GBPUSD',
    'Buy',
    0.2,
    1.24902,
    1.42452,
    1.53553,
    1.36363,
    '2595892',
    'Dec 18, 01:02:23 PM',
    0,
    -0.14,
    19.38
  ),
  createData(
    'USDGHS',
    'sell',
    0.5,
    1.42552,
    1.74474,
    1.35646,
    1.35633,
    '7850006',
    'Dec 18, 02:09:59 PM',
    0,
    -0.45,
    98.13
  )
]

const TableBasic = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Symbol</TableCell>
            <TableCell align='right'>Type</TableCell>
            <TableCell align='right'>Volume, Lot </TableCell>
            <TableCell align='right'>Open Price</TableCell>
            <TableCell align='right'>T/P</TableCell>
            <TableCell align='right'>S/L</TableCell>
            <TableCell align='right'>Open Time</TableCell>
            <TableCell align='right'>Swap, USD</TableCell>
            <TableCell align='right'>Commission, USD</TableCell>
            <TableCell
              align='right'
              sx={{ position: 'sticky', right: 0, backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
            >
              P/L, USD
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.symbol}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='right'>{row.symbol}</TableCell>
              <TableCell align='right'>{row.type}</TableCell>
              <TableCell align='right'>{row.volume}</TableCell>
              <TableCell align='right'>{row.openPrice}</TableCell>
              <TableCell align='right'>{row.tp}</TableCell>
              <TableCell align='right'>{row.sl}</TableCell>
              <TableCell align='right'>{row.openTime}</TableCell>
              <TableCell align='right'>{row.swap}</TableCell>
              <TableCell align='right'>{row.commission}</TableCell>
              <TableCell
                align='right'
                component='th'
                scope='row'
                sx={{ position: 'sticky', right: 0, backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
              >
                {row.pl}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
