import euFlag from 'src/images/flags/eu.svg'
import irFlag from 'src/images/flags/ir.svg'
import enFlag from 'src/images/flags/us.svg'

export const MONEY_UNITS = [
  {
    title: 'IRT',
    name: 'Iranian Toman',
    sign: 't',
    country: 'ir',
    digits: 0,
    flag: irFlag,
    apiKey: 'irr',
  },
  {
    title: 'USD',
    name: 'US Dollar',
    sign: '$',
    country: 'en-US',
    digits: 2,
    flag: enFlag,
    apiKey: 'usd',
  },
  {
    title: 'EUR',
    name: 'Euro',
    sign: '€',
    country: 'eu',
    digits: 2,
    flag: euFlag,
    apiKey: 'eur',
  },
]
