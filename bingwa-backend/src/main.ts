import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import AppDataSource from './config/orm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Check the database connection
  const dataSource = new DataSource(AppDataSource.options);

  try {
    await dataSource.initialize();
    console.log('Database connected successfully!');
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
}

bootstrap();