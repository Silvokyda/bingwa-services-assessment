import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable 
} from 'typeorm';
import { User } from './user.entity';
import { Customer } from './customer.entity';
import { ProjectStatus } from '../common/enums/project-status.enum';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNED
  })
  status: ProjectStatus;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => User)
  projectManager: User;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  engineers: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { ProjectStatus } from '../common/enums/project-status.enum';
