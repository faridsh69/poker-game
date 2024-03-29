import { User } from 'src/models/user.entity'

export type TypeUserWithToken = User & { access_token: string }
