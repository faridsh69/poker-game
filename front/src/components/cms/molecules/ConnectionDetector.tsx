import WifiIcon from '@mui/icons-material/Wifi'
import WifiOffIcon from '@mui/icons-material/WifiOff'

import { useInternetConnection } from 'src/hooks/useInternetConnection'

export const ConnectionDetector = () => {
  const internetConnectionStatus = useInternetConnection()

  if (internetConnectionStatus) {
    return <WifiIcon color='success' />
  }

  return <WifiOffIcon color='error' />
}
