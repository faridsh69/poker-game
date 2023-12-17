import { useAtom } from 'jotai'

import { TypeSeat, TypeTable } from 'src/interfaces'
import userAvatarImage from 'src/images/avatars.png'
import userBoxImage from 'src/images/userbox.png'

import { useCallback } from 'react'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { useAuth } from 'src/hooks/useAuth'
import classNames from 'classnames'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { SignClubs } from 'src/components/molecules/signs/SignClubs'
import { SignDiamonds } from 'src/components/molecules/signs/SignDiamonds'
import { SignSpades } from 'src/components/molecules/signs/SignSpades'
import { SignHearts } from 'src/components/molecules/signs/SignHearts'

export const SeatUser = (props: { table: TypeTable; seat: TypeSeat }) => {
  const { table, seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user'>
      <div className='dnd-window-body-table-seats-seat-user-avatar'>
        <div
          className={classNames(
            'dnd-window-body-table-seats-seat-user-avatar-image',
            `avatar-${seat.user.avatar}`,
          )}
          style={{ backgroundImage: `url(${userAvatarImage})` }}
        />
      </div>
      <div className='dnd-window-body-table-seats-seat-user-box'>
        <img src={userBoxImage} />
      </div>
      <div className='dnd-window-body-table-seats-seat-user-username'>{seat.user.username}</div>
      <div className='dnd-window-body-table-seats-seat-user-cash'>
        <span>
          <AttachMoneyIcon />
        </span>
        <span>{seat.user.cash.inGame}</span>
      </div>
      <div className='dnd-window-body-table-seats-seat-user-hot'></div>
      <div className='dnd-window-body-table-seats-seat-user-country'></div>
      <div className='dnd-window-body-table-seats-seat-user-cards'>
        {seat.user.cards.map((card, cardIndex) => {
          return (
            <div
              className={classNames(
                'dnd-window-body-table-seats-seat-user-cards-card',
                `card-${cardIndex + 1}`,
              )}
              key={card.type + card.number}
            >
              <div className='dnd-window-body-table-seats-seat-user-cards-card-number'>
                {card.number}
              </div>
              <div className='dnd-window-body-table-seats-seat-user-cards-card-signsmall'>
                {card.type === 'clubs' && <SignClubs />}
                {card.type === 'diamonds' && <SignDiamonds />}
                {card.type === 'spades' && <SignSpades />}
                {card.type === 'hearts' && <SignHearts />}
              </div>
              <div className='dnd-window-body-table-seats-seat-user-cards-card-signbig'>
                {card.type === 'clubs' && <SignClubs />}
                {card.type === 'diamonds' && <SignDiamonds />}
                {card.type === 'spades' && <SignSpades />}
                {card.type === 'hearts' && <SignHearts />}
              </div>
            </div>
          )
        })}
      </div>
      <div className='dnd-window-body-table-seats-seat-user-status'></div>
    </div>
  )
}
