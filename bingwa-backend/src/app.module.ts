import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './external/auth/auth.module';
import { UserModule } from './external/users/user.module';
import { ormConfig } from './config/orm.config';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configure TypeORM with MySQL settings from environment variables
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig, 
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }
