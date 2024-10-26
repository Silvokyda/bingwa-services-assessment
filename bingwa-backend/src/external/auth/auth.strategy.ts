import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../users/services/user.service';
import { User } from '../../entities/user.entity';
import { ResponseDto } from '../../common/dto/response.dto'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, 
        });
    }

    async validate(payload: any): Promise<User | null> {
        const userResponse: ResponseDto<User> = await this.userService.findById(payload.sub);
        
        // Check if the user was found and return the user object
        if (userResponse.data) {
            return userResponse.data; // Return the user object
        }
        
        return null; // Return null if the user is not found
    }
}
