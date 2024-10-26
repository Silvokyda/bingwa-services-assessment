import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../../entities/user.entity';
import { ResponseDto } from '../../../common/dto/response.dto'; 

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() userData: Partial<User>): Promise<ResponseDto<User>> {
        return this.userService.create(userData); 
    }

    @Get()
    async findAll(): Promise<ResponseDto<User[]>> {
        return this.userService.findAll(); 
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ResponseDto<User>> {
        return this.userService.findById(id); 
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: Partial<User>): Promise<ResponseDto<User>> {
        return this.userService.update(id, updateData); 
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<ResponseDto<void>> {
        await this.userService.remove(id); // Call the remove method
        return new ResponseDto('User deleted successfully', null); // Return a ResponseDto indicating success
    }
}
