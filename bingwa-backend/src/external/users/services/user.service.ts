import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt'; 
import { ResponseDto } from '../../../common/dto/response.dto';  

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(userData: Partial<User>): Promise<ResponseDto<User>> {
        const hashedPassword = await bcrypt.hash(userData.password, 10); 
        const user = this.userRepository.create({ ...userData, password: hashedPassword });
        await this.userRepository.save(user);
        return new ResponseDto('User created successfully', user);
    }

    async findById(id: string): Promise<ResponseDto<User>> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return new ResponseDto('User not found', null);
        }
        return new ResponseDto('User retrieved successfully', user);
    }

    async findByEmail(email: string): Promise<ResponseDto<User | null>> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return new ResponseDto('User not found', null);
        }
        return new ResponseDto('User retrieved successfully', user);
    }

    async findAll(): Promise<ResponseDto<User[]>> {
        const users = await this.userRepository.find();
        return new ResponseDto('Users retrieved successfully', users);
    }

    async update(id: string, updateData: Partial<User>): Promise<ResponseDto<User>> {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10); 
        }
        await this.userRepository.update(id, updateData);
        const updatedUser = await this.findById(id);
        return new ResponseDto('User updated successfully', updatedUser.data);
    }

    async remove(id: string): Promise<ResponseDto<void>> {
        await this.userRepository.delete(id);
        return new ResponseDto('User removed successfully', null);
    }
}
