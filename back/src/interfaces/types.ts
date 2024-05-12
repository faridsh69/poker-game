import { User } from 'src/models/user.entity'

export type TypeUserWithToken = User & { access_token: string }

export type TypeUserMinimal = { id: number; username: string; email: string }

export type TypeUserFullData = TypeUserMinimal & { balance: number; avatar_id: number }
