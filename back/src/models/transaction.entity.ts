import { TRANSACTIONS_REASONS } from 'src/configs/database'
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int' })
  user_id!: number

  @Column({ type: 'int' })
  price!: number

  @Column({ type: 'boolean' })
  user_giving!: boolean

  @Column({ type: 'varchar', length: 100 })
  description!: string

  @Column({ type: 'enum', enum: Object.values(TRANSACTIONS_REASONS) })
  reason!: string

  @Column({ type: 'int' })
  table_id!: number

  @Column({ type: 'int' })
  bonus_code_id!: number

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at?: Date
}
