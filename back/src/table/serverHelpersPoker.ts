import { TypeCard, TypeTable } from 'src/utils/types'
import { CARD_NUMBERS, CARD_TYPES, TABLE_PHASES, WAITING_USER } from './serverConstantsPoker'

const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  return !!table.seats.find(s => s.user?.username === username)
}

const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const renderJoinTable = (tablesState: TypeTable[], tableId: number, username: string) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers:
            isUserWaitingTable(t, username) || isUserSeatedTable(t, username)
              ? t.waitingUsers
              : [
                  ...t.waitingUsers,
                  {
                    ...WAITING_USER,
                    username,
                  },
                ],
        }
  })
}

export const renderQuitTable = (tablesState: TypeTable[], tableId: number, username: string) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: t.waitingUsers.filter(u => u.username !== username),
        }
  })
}

export const renderSitUser = (
  tablesState: TypeTable[],
  tableId: number,
  seatId: number,
  buyinAmount: number,
  username: string,
) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: t.waitingUsers.filter(u => u.username !== username),
          seats: isUserSeatedTable(t, username)
            ? t.seats
            : t.seats.map(s => {
                return s.id !== seatId
                  ? s
                  : {
                      id: seatId,
                      user: {
                        ...WAITING_USER,
                        username,
                        cash: {
                          inBank: WAITING_USER.cash.inBank - buyinAmount,
                          inPot: 0,
                          inGame: buyinAmount,
                        },
                      },
                    }
              }),
        }
  })
}

export const renderSitoutUser = (tablesState: TypeTable[], tableId: number, username: string) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: isUserWaitingTable(t, username)
            ? t.waitingUsers
            : [
                ...t.waitingUsers,
                {
                  ...WAITING_USER,
                  username,
                },
              ],
          seats: t.seats.map(s => {
            return {
              ...s,
              user: s.user?.username === username ? null : s.user,
            }
          }),
        }
  })
}

export const getRandomCards = (cardsCount: number, usedCards: TypeCard[]) => {
  const cards: TypeCard[] = []

  while (cards.length < cardsCount) {
    const cardTypeIndex = Math.floor(Math.random() * 4)
    const cardNumberIndex = Math.floor(Math.random() * 13)
    const card = {
      type: Object.values(CARD_TYPES)[cardTypeIndex],
      number: Object.values(CARD_NUMBERS)[cardNumberIndex],
    }

    const isUsed = usedCards.find(c => c.type === card.type && c.number === card.number)

    if (!isUsed) {
      cards.push(card)
    }
  }

  return cards
}

export const renderStartTable = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId || t.seats.filter(s => s.user).length < 2) return t

    const tableCards = getRandomCards(5, [])
    let usedCards = [...tableCards]
    return {
      ...t,
      phase: TABLE_PHASES.preflop,
      cards: tableCards,
      seats: t.seats.map(s => {
        if (!s.user) return s

        const userCards = getRandomCards(2, usedCards)
        usedCards = [...usedCards, ...userCards]

        return {
          ...s,
          user: {
            ...s.user,
            cards: userCards,
            isDealer: false,
          },
        }
      }),
    }
  })
}
