// src/users/users.controller.ts
import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/roles.enum';
import { User } from '../entity/user.entity';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  @Get()
  @Roles(Role.ADMIN, Role.PROJECT_MANAGER)
  findAll() {
    // Logic to return users, restricted by role
  }

  @Post()
  @Roles(Role.ADMIN)
  createUser(@Body() userData: User) {
    // Logic to create a user
  }
}
