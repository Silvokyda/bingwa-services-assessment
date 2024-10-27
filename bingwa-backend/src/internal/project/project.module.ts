import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { User } from '../../entities/user.entity';
import { Customer } from '../../entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User, Customer]), 
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
