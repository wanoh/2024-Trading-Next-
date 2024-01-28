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
  openTime: string
) => {
  return { symbol, type, volume, openPrice, currentPrice, tp, sl, order, openTime }
}

const rows = [
  createData('XAUUSD', 'sell', 0.1, 1.09115, 1.09203, 1.04944, 1.04029, '90444134', 'Dec 18, 12:52:12 PM'),
  createData('CADUSD', 'Buy', 0.2, 1.24902, 1.42452, 1.53553, 1.36363, '2595892', 'Dec 18, 01:02:23 PM'),
  createData('USDGHS', 'sell', 0.5, 1.42552, 1.74474, 1.35646, 1.35633, '7850006', 'Dec 18, 02:09:59 PM')
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
