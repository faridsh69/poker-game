import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique } from 'typeorm'

import { USERS_GENDER_ENUM, USERS_ROLE_ENUM, USERS_STATUS_ENUM } from 'src/configs/database'

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 15 }) // change to 10
  username!: string

  @Column({ type: 'varchar', length: 40 })
  email!: string

  @Column({ type: 'enum', enum: Object.values(USERS_STATUS_ENUM), default: USERS_STATUS_ENUM.needConfirm })
  status!: string

  @Column({ type: 'enum', enum: Object.values(USERS_ROLE_ENUM), default: USERS_ROLE_ENUM.player })
  role!: string

  @Column({ type: 'varchar', length: 40, nullable: true, default: '' })
  phone!: string

  @Column({ type: 'varchar', length: 30, nullable: true, default: '' })
  first_name!: string

  @Column({ type: 'varchar', length: 15, nullable: true, default: '' })
  last_name!: string

  @Column({ type: 'enum', enum: Object.values(USERS_GENDER_ENUM), default: USERS_GENDER_ENUM.male })
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
