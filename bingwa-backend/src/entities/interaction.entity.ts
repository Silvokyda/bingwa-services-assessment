import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { User } from './user.entity';

export enum InteractionType {
  PHONE = 'phone',
  EMAIL = 'email',
  MEETING = 'meeting',
  NOTE = 'note'
}

@Entity('interactions')
export class Interaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: InteractionType
  })
  type: InteractionType;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Customer, customer => customer.interactions)
  customer: Customer;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}