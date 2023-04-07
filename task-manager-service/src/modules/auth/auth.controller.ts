import {Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {User} from "../../schemas/user.schema";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiBody({type: User })
    async login(@Body() data: User) {
        return this.authService.login(data);
    }
}