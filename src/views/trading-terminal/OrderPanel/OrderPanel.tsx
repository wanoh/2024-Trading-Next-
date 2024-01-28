import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Card,
  FormControlLabel,
  FormGroup,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import Icon from 'src/@core/components/icon'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { styled } from '@mui/material/styles'

// ** Table Component
import MiniTable from './MiniTable'

const OrderPanel = () => {
  const [value, setValue] = useState<number>(0.01)

  const increaseValue = () => {
    const incrementedValue = roundToTwoDecimalPlaces(value + 0.01)
    setValue(incrementedValue)
  }

  const decreaseValue = () => {
    const decrementedValue = roundToTwoDecimalPlaces(value - 0.01)
    setValue(decrementedValue < 0 ? 0 : decrementedValue)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = roundToTwoDecimalPlaces(parseFloat(event.target.value))
    setValue(isNaN(newValue) ? 0 : newValue)
  }

  // Helper function to round to two decimal places
  const roundToTwoDecimalPlaces = (num: number) => {
    return Math.round(num * 100) / 100
  }

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5
        }
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff'
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500
      })
    }
  }))

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px', margin: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>XAUUSD</Typography>

          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            <Button>
              <Icon icon='mingcute:settings-6-line' fontSize={20} />
            </Button>
            <Button>
              <Icon icon='tabler:click' fontSize={20} />
            </Button>
          </ButtonGroup>

          <IconButton>
            <Icon icon='material-symbols:close' fontSize={20} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            mt: '20px'
          }}
        >
          <Box sx={{ border: '1px solid red', padding: '30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>Sell</Typography>
              <Typography>1.09284</Typography>
            </Box>
          </Box>
          <Box sx={{ border: '1px solid blue', padding: '30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>Buy</Typography>
              <Typography>1.09284</Typography>
            </Box>
          </Box>
          <Typography
            variant='subtitle1'
            style={{
              position: 'absolute',
              bottom: '0',
              right: '45%',
              backgroundColor: 'black',
              padding: '2px',
              borderRadius: '3px'
            }}
          >
            0.00
          </Typography>
        </Box>
        <Box
          component='form'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#25293C',
            border: '1px solid transparent',
            borderRadius: '5px',
            margin: '20px'
          }}
          noValidate
          autoComplete='off'
        >
          <input
            type='number'
            inputMode='numeric'
            value={value}
            onChange={handleChange}
            step='0.01'
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100px',
              padding: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white'
            }}
          />
          <select
            style={{
              backgroundColor: '#25293C',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#f1f1f1'
            }}
          >
            <option value='lots'>lots</option>
            <option value='lots'>currency</option>
            <option value='lots'>units</option>
          </select>
          <Box>
            <ToggleButtonGroup exclusive orientation='vertical' aria-label='text alignment'>
              <ToggleButton value='left' aria-label='left aligned' onClick={increaseValue}>
                <Icon icon='ic:baseline-plus' fontSize={10} />
              </ToggleButton>
              <ToggleButton value='center' aria-label='center aligned' onClick={decreaseValue}>
                <Icon icon='ic:baseline-minus' fontSize={10} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        {/* <FormGroup>
          <div>
            <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} label='iOS style' />
          </div>
        </FormGroup> */}
        <Button variant='contained' sx={{ mb: '24px', mt: '16px', borderRadius: '0', padding: '10px' }}>
          Confirm
        </Button>
        <MiniTable />
      </Box>
    </Card>
  )
}

export default OrderPanel
