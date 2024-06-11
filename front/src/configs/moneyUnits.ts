import euFlag from 'src/images/flags/eu.svg'
import irFlag from 'src/images/flags/ir.svg'
import enFlag from 'src/images/flags/us.svg'

export const MONEY_UNIT_TITLES = {
  irt: 'IRT',
  usd: 'USD',
  eur: 'EUR',
}
export const MONEY_UNITS = [
  {
    title: MONEY_UNIT_TITLES.irt,
    name: 'Iranian Toman',
    sign: 't',
    country: 'en-US',
    digits: 0,
    flag: irFlag,
    apiKey: 'irr',
  },
  {
    title: MONEY_UNIT_TITLES.usd,
    name: 'US Dollar',
    sign: '$',
    country: 'en-US',
    digits: 2,
    flag: enFlag,
    apiKey: 'usd',
  },
  {
    title: MONEY_UNIT_TITLES.eur,
    name: 'Euro',
    sign: '€',
    country: 'en-GB',
    digits: 2,
    flag: euFlag,
    apiKey: 'eur',
  },
]
