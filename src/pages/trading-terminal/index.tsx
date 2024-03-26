import { Grid } from '@mui/material'

// ** Components Imports
import InstrumentCard from 'src/views/trading-terminal/Instruments'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import TradingViewWidget from 'src/views/trading-terminal/Chart/TradingViewChart'
import HistoryTable from 'src/views/trading-terminal/History/Table'
import OrderPanel from 'src/views/trading-terminal/OrderPanel/OrderPanel'

import ForexSymbols from 'src/views/trading-terminal/Symbols/Forex'

const TradingTerminal = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <InstrumentCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <TradingViewWidget />
          <ForexSymbols />
          <HistoryTable />
        </Grid>
        <Grid item xs={12} md={3}>
          <OrderPanel />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default TradingTerminal
