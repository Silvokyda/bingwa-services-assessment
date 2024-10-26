import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../common/enums/roles.enum';
import { Document } from './document.entity';
import { Project } from './project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  kraPin: string;

  @Column()
  password: string; 

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ENGINEER
  })
  role: Role;

  @OneToMany(() => Document, document => document.user)
  documents: Document[];

  @OneToMany(() => Project, project => project.projectManager)
  managedProjects: Project[];

  @ManyToMany(() => Project, project => project.engineers)
  assignedProjects: Project[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
