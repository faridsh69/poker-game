import enFlag from 'src/images/flags/en.svg'
import euFlag from 'src/images/flags/eu.svg'
import faFlag from 'src/images/flags/fa.svg'

export const MONEY_UNIT_TITLES = {
  usd: 'USD',
  eur: 'EUR',
  irt: 'IRT',
}
export const MONEY_UNITS = [
  {
    title: MONEY_UNIT_TITLES.usd,
    label: 'US Dollar',
    sign: '$',
    country: 'en-US',
    digits: 2,
    flag: enFlag,
    apiKey: 'usd',
  },
  {
    title: MONEY_UNIT_TITLES.eur,
    label: 'Euro',
    sign: '€',
    country: 'en-GB',
    digits: 2,
    flag: euFlag,
    apiKey: 'eur',
  },
  {
    title: MONEY_UNIT_TITLES.irt,
    label: 'Iranian Toman',
    sign: 't',
    country: 'en-US',
    digits: 0,
    flag: faFlag,
    apiKey: 'irr',
  },
]
