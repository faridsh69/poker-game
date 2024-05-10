import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { PAYMENTS_GATEWAYS, PAYMENTS_STATUSES } from 'src/configs/database'

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int' })
  user_id!: number

  @Column({ type: 'int' })
  price!: number

  @Column({ type: 'boolean' })
  user_giving!: boolean

  @Column({ type: 'varchar', nullable: true, length: 100 })
  description!: string

  @Column({ type: 'enum', enum: Object.values(PAYMENTS_GATEWAYS) })
  gateway!: string

  @Column({ type: 'enum', enum: Object.values(PAYMENTS_STATUSES), default: PAYMENTS_STATUSES.pending })
  status!: string

  @Column({ type: 'varchar', nullable: true, length: 100 })
  wallet!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at?: Date
}
