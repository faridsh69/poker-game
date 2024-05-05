import { atom } from 'jotai'

import { Socket } from 'socket.io-client'
import { TypeSocket } from 'src/interfaces'

export const socketAtom = atom<TypeSocket>({} as Socket)
