import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { User } from '../../../entities/user.entity';
import { ResponseDto } from '../../../common/dto/response.dto';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const userResponse = await this.userService.findByEmail(email);
        const user = userResponse.data; 

        // Compare the provided password with the hashed password in the database
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<ResponseDto<{ accessToken: string; user: User }>> {
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        
        // Return user data along with the access token
        return new ResponseDto('Login successful', { accessToken, user });
    }
}
