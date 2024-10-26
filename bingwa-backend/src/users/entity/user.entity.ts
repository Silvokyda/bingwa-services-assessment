import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../common/enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ENGINEER, // Default role
  })
  role: Role;
}
