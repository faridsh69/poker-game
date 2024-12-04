import packageJson from '../../package.json'
import { ROUTES_PATH_NAMES } from './router'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import HistoryIcon from '@mui/icons-material/History'
import HomeIcon from '@mui/icons-material/Home'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PaidIcon from '@mui/icons-material/Paid'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import TableBarIcon from '@mui/icons-material/TableBar'

import HoldemImage from 'src/images/game/holdem.png'
import { TypeSidebarItem } from 'src/interfaces'

export const LOCAL_STORAGE_APP_KEY = 'PER'
export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'user_with_access_token'
export const BAD_REQUEST_HTTP_CODE = 400
export const EXPIRED_ERROR = 'Please login again, your token expired.'

export const META_TAGS = {
  title: `Royal Poker V ${packageJson.version}`,
  description: 'Royal Poker is easy and safe',
  keywords: '',
  image: 'vite.svg',
  author: '',
  domain: '',
}

export const SERVER_DATE_FORMAT = 'YYYY-MM-DD'

export const ADMIN_SIDEBAR_ITEMS: TypeSidebarItem[] = [
  {
    title: 'Game Lobby',
    url: '/',
    icon: Diversity2Icon,
  },
  {
    title: 'users',
    icon: ManageAccountsIcon,
  },
  {
    title: 'tables',
    icon: TableBarIcon,
  },
  {
    title: 'payments',
    icon: PointOfSaleIcon,
  },
  {
    title: 'transactions',
    icon: PaidIcon,
  },
  {
    title: 'table logs',
    url: 'histories',
    icon: HistoryIcon,
  },
]

export const NAVBAR_MENU_ITEMS = [
  {
    title: '',
    path: ROUTES_PATH_NAMES.home,
    icon: <HomeIcon />,
  },
  {
    title: '',
    path: ROUTES_PATH_NAMES.holdem,
    image: HoldemImage,
  },
  {
    title: 'Profile',
    path: ROUTES_PATH_NAMES.profile,
  },
  {
    title: 'Deposit',
    path: ROUTES_PATH_NAMES.deposit,
  },
  {
    title: 'Withdraw',
    path: ROUTES_PATH_NAMES.withdraw,
  },
  // {
  //   title: 'Ranking',
  //   path: ROUTES_PATH_NAMES.ranking,
  // },
  // {
  //   title: 'Bunoses',
  //   path: ROUTES_PATH_NAMES.bunoses,
  // },
  // {
  //   title: 'Rake back',
  //   path: ROUTES_PATH_NAMES.rakeback,
  // },
  // {
  //   title: 'settings',
  //   path: ROUTES_PATH_NAMES.settings,
  // },
]
