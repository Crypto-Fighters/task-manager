import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {UserService} from "../user/user.service";
import {User} from "../../schemas/user.schema";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.userService.getUser({ login });
        if (!user) return null;

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('Пользователь не найден');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const currentUser = await this.validateUser(user.login, user.password);

        if (currentUser) {
            const access_token = this.jwtService.sign({login: user.login, sub: user._id});
            return {
                access_token,
                userInfo: {
                    _id: currentUser._id,
                    login: currentUser.login,
                    avatar: currentUser.avatar
                }
            };
        }
        throw new NotAcceptableException('Пользователь не найден');
    }
}