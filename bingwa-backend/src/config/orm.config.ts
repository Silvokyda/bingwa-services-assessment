import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { Document } from '../entities/document.entity';
import { Customer } from '../entities/customer.entity';
import { Interaction } from '../entities/interaction.entity';
import { Project } from '../entities/project.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'bingwa',
  entities: [User, Document, Customer, Interaction, Project], 
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
  synchronize: true, 
  logging: ['query', 'error'],
});

export const ormConfig = (): DataSourceOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'bingwa',
  entities: [User, Document, Customer, Interaction, Project],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
  synchronize: true,
  logging: ['query', 'error'],
});

export default AppDataSource;
