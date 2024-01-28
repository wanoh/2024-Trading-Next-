// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const createData = (symbol: string, signals: number, bid: number, ask: number, change: number) => {
  return { symbol, signals, bid, ask, change }
}

const rows = [
  createData('EURUSD', 159, 6.0, 24, 4.0),
  createData('GBPUSD', 237, 9.0, 37, 4.3),
  createData('XAUUSD', 262, 16.0, 24, 6.0),
  createData('AUDUSD', 305, 3.7, 67, 4.3),
  createData('Tesla', 356, 16.0, 49, 3.9)
]

const TableBasic = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
              Symbols
            </TableCell>
            <TableCell align='right'>Signals</TableCell>
            <TableCell align='right'>Bid</TableCell>
            <TableCell align='right'>Ask </TableCell>
            <TableCell align='right'>1D Change</TableCell>
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
              <TableCell
                component='th'
                scope='row'
                sx={{ position: 'sticky', left: 0, backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
              >
                {row.symbol}
              </TableCell>
              <TableCell align='right'>{row.signals}</TableCell>
              <TableCell align='right'>{row.bid}</TableCell>
              <TableCell align='right'>{row.ask}</TableCell>
              <TableCell align='right'>{row.change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
