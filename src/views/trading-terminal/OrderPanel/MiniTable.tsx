// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const createData = (header: string, value: number) => {
  return { header, value }
}

const rows = [
  createData('Lots', 0.01),
  createData('Currency', 4312),
  createData('Unit', 0.01),
  createData('Margin', 1.08),
  createData('Pip Value', 0.0)
]

const TableBasic = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minHeight: 150 }} size='small' aria-label='a dense table'>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.header} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='left'>{row.header}</TableCell>
              <TableCell align='right'>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
