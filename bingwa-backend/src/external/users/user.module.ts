import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService], 
})
export class UserModule {}