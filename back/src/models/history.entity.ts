import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { SEAT_ROLES, TABLE_PHASES } from 'src/configs/serverPokerConstants'

@Entity('histories')
export class History {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int' })
  table_id!: number

  @Column({ type: 'int' })
  total!: number

  @Column({ type: 'enum', enum: Object.values(SEAT_ROLES) })
  roleTurn!: string

  @Column({ type: 'enum', enum: Object.values(TABLE_PHASES) })
  phase!: string

  @Column({ type: 'json' })
  seats!: string

  @Column({ type: 'json' })
  cards!: string

  @Column({ type: 'json' })
  pots!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at?: Date
}
