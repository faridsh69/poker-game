import { FLAG_LOCALES } from 'src/configs/locale'

export const SeatUserCountry = () => {
  const locale = 'en'

  return (
    <div className='dnd-window-body-table-seats-seat-user-country'>
      <img src={FLAG_LOCALES[locale]} alt={locale} />
    </div>
  )
}
