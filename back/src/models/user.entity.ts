import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

import { USERS_GENDERS, USERS_ROLES, USERS_STATUSES } from 'src/configs/database'

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 10 })
  username!: string

  @Column({ type: 'varchar', length: 40 })
  email!: string

  @Column({ type: 'enum', enum: Object.values(USERS_STATUSES), default: USERS_STATUSES.needConfirm })
  status!: string

  @Column({ type: 'enum', enum: Object.values(USERS_ROLES), default: USERS_ROLES.player })
  role!: string

  @Column({ type: 'varchar', length: 40, nullable: true, default: '' })
  phone!: string

  @Column({ type: 'varchar', length: 30, nullable: true, default: '' })
  first_name!: string

  @Column({ type: 'varchar', length: 15, nullable: true, default: '' })
  last_name!: string

  @Column({ type: 'enum', enum: Object.values(USERS_GENDERS), default: USERS_GENDERS.male })
  gender!: string

  @Column({ type: 'int', default: 1 })
  avatar_id!: number

  @Column({ type: 'int', default: 0 })
  agent_percent!: number

  @Column({ type: 'varchar' })
  password!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at?: Date
}
