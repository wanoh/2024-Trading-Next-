// ** React Imports
import { MouseEvent, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import { Box, Button } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'

// ** Tables
import OpenTrades from './OpenTrades'
import PendingTrades from './PendingTrades'
import ClosedTrades from './ClosedTrades'

const TabsNav = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='nav tabs example'>
        <Tab
          value='1'
          component='a'
          label={
            <>
              <Badge badgeContent={0} color='primary'>
                <Typography>Open</Typography>
              </Badge>
            </>
          }
          href='/drafts'
          onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
        />
        <Tab
          value='2'
          component='a'
          label={
            <>
              <Badge badgeContent={0} color='primary'>
                <Typography>Pending</Typography>
              </Badge>
            </>
          }
          href='/trash'
          onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
        />
        <Tab
          value='3'
          component='a'
          label={
            <>
              <Badge badgeContent={0} color='primary'>
                <Typography>Closed</Typography>
              </Badge>
            </>
          }
          href='/spam'
          onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
        />
      </TabList>
      <TabPanel value='1'>
        <Box
          sx={{
            display: 'flex',
            padding: '50px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <IconifyIcon icon='fontisto:suitcase' fontSize={48} />
          <Typography>No open orders</Typography>
        </Box>
        <OpenTrades />
      </TabPanel>
      <TabPanel value='2'>
        <Box
          sx={{
            display: 'flex',
            padding: '50px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <IconifyIcon icon='fontisto:suitcase' fontSize={48} />
          <Typography>No pending orders</Typography>
        </Box>
        <PendingTrades />
      </TabPanel>
      <TabPanel value='3'>
        <Box
          sx={{
            display: 'flex',
            padding: '50px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <IconifyIcon icon='fontisto:suitcase' fontSize={48} />
          <Typography>No closed orders</Typography>
          <Button variant='outlined'>Show Previous Day</Button>
        </Box>
        <ClosedTrades />
      </TabPanel>
    </TabContext>
  )
}

export default TabsNav
