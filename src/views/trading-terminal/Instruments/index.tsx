import { CardHeader, Card, IconButton } from '@mui/material'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import WebSocketComponent from './Websocket'
import FMPWebsockets from './FMPWebsockets'

const InstrumentCard = () => {
  return (
    <Card sx={{ height: '100vh' }}>
      <CardHeader
        title='INSTRUMENT'
        action={
          <div className='d-flex align-items-center'>
            <OptionsMenu
              options={['Last Week', 'Last Month', 'Last Year']}
              iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
            />
            <IconButton>
              <Icon icon='bxs:dashboard' />
            </IconButton>
            <IconButton>
              <Icon icon='material-symbols:pan-zoom-rounded' cursor='pointer' />
            </IconButton>
          </div>
        }
      />
      <WebSocketComponent />
      {/* <FMPWebsockets /> */}
    </Card>
  )
}

export default InstrumentCard
