import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique } from 'typeorm'

import { TABLE_PASOORS } from 'src/configs/serverPokerConstants'

@Entity('tables')
@Unique(['title'])
export class Table {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 60 })
  title!: string

  @Column({ type: 'enum', enum: Object.values(TABLE_PASOORS), default: TABLE_PASOORS.holdem })
  pasoor!: string

  @Column({ type: 'int' })
  blinds_small!: number

  @Column({ type: 'int' })
  blinds_big!: number

  @Column({ type: 'int' })
  buyin_min!: number

  @Column({ type: 'int' })
  buyin_max!: number

  @Column({ type: 'int', default: 6 })
  seats!: number

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at?: Date
}
