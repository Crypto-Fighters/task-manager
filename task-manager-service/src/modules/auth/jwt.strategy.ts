import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {User} from "../../schemas/user.schema";
import {UserService} from "../user/user.service";
import {JWT_SECRET} from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userService.getUser({userId: payload.userId});
        if (!user) {
            return null;
        }
        return user;
    }
}