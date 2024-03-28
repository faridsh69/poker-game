import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import HomeIcon from '@mui/icons-material/Home'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import TableBarIcon from '@mui/icons-material/TableBar'
import PaidIcon from '@mui/icons-material/Paid'
import HistoryIcon from '@mui/icons-material/History'

import packageJson from '../../package.json'
import { TypeSidebarItem } from 'src/interfaces'

const { VITE_CLIENT_ID, VITE_CLIENT_SECRET } = import.meta.env

export const LOCAL_STORAGE_APP_KEY = 'PER'
export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'access_token'
export const LOCAL_STORAGE_AUTH_USER_EMAIL = 'auth_email'

export const META_TAGS = {
  title: `Royal Poker V ${packageJson.version}`,
  description: 'Royal Poker is easy and safe',
  keywords: '',
  image: 'vite.svg',
  author: '',
  domain: '',
}

export const OAUTH_API_INFO = {
  grant_type: 'password',
  client_id: +VITE_CLIENT_ID,
  client_secret: VITE_CLIENT_SECRET,
}

export const SERVER_DATE_FORMAT = 'YYYY-MM-DD'

export const ADMIN_SIDEBAR_ITEMS: TypeSidebarItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
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
    icon: HistoryIcon,
  },
]
