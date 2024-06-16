import { TablePot } from 'src/components/game/templates/table/TablePot'
import { TypeTableProps } from 'src/interfaces'

export const TablePots = (props: TypeTableProps) => {
  const { table } = props

  if (!table.pots.length) return null
  // const fakePots = [
  //   {
  //     amount: 10021,
  //     id: 1,
  //     seatIds: [1, 2],
  //   },
  //   {
  //     amount: 20021,
  //     id: 2,
  //     seatIds: [1, 2],
  //   },
  //   {
  //     amount: 30021,
  //     id: 3,
  //     seatIds: [1, 2],
  //   },
  //   // {
  //   //   amount: 40021,
  //   //   id: 4,
  //   //   seatIds: [1, 2],
  //   // },
  //   // {
  //   //   amount: 50021,
  //   //   id: 5,
  //   //   seatIds: [1, 2],
  //   // },
  //   // {
  //   //   amount: 60021,
  //   //   id: 6,
  //   //   seatIds: [1, 2],
  //   // },
  //   // {
  //   //   amount: 70021,
  //   //   id: 7,
  //   //   seatIds: [1, 2],
  //   // },
  //   // {
  //   //   amount: 80021,
  //   //   id: 8,
  //   //   seatIds: [1, 2],
  //   // },
  // ]
  return (
    <div className='popup-table-pots'>
      {table.pots.map(tablePot => {
        return <TablePot table={table} tablePot={tablePot} key={tablePot.id} />
      })}
    </div>
  )
}
