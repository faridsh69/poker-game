import { User } from 'src/models/user.entity'

export type TypeUserWithToken = User & { access_token: string }

export type TypeUserMinimalObject = { id: number; username: string; email: string }
