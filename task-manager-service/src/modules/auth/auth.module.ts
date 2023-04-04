import {Module} from "@nestjs/common"
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from "@nestjs/passport"
import {MongooseModule} from "@nestjs/mongoose"
import {UserSchema} from "src/schemas/user.schema";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
        secret: 'aorUvvgG3ExF1t0zyoPJqBPNbR96PVBu',
        signOptions: { expiresIn: '86400s' },
    }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
    providers: [AuthService, UserService, JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}