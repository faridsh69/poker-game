import { TableSeatCards } from 'src/components/poker/molecules/TableSeatCards'
import { isUserWaitingTable } from 'src/helpers/clientHelpersPoker'
import { TypeTable } from 'src/interfaces/type-game'

export const TableSeats = (props: {
  table: TypeTable
  username: string
  handleSitTableModal: (tableId: number, seatId: number) => void
}) => {
  const { table, username, handleSitTableModal } = props

  const isAuthUserWaitingTable = isUserWaitingTable(table, username)

  return table.seats.map(s => {
    return (
      <div
        key={s.id}
        className={`home-runtable-main-body-seat seat-${s.id} 
          ${s.user?.username === username ? 'seat-auth' : ''}
          ${s.user?.gameTurn ? 'seat-turn' : ''}
        }`}
      >
        {!s.user && isAuthUserWaitingTable && (
          <div className='seat-user' onClick={() => handleSitTableModal(table.id, s.id)}>
            Empty
          </div>
        )}
        {s.user && (
          <div className='seat-user'>
            <img src={s.user.avatar} alt='Avatar' className='seat-user-avatar' />
            <div className='seat-user-username'>{s.user.username}</div>
            <div className='seat-user-cash'>${s.user.cash.inGame}</div>
            {!!s.user.cash.inPot && <div className='seat-user-inpot'>${s.user.cash.inPot}</div>}
            {s.user.isWinner && <div className='seat-user-winner'>*WINNER*</div>}
            {s.user.achievement && (
              <div className='seat-user-achievement'>{s.user.achievement}</div>
            )}
            {s.user.isDealer && (
              <div className='seat-user-isdealer'>
                <img src='/dealer.png' alt='dealer' className='seat-user-isdealer-img' />
              </div>
            )}

            <TableSeatCards cards={s.user.cards} isAuthSeat={s.user.username === username} />
          </div>
        )}
      </div>
    )
  })
}
