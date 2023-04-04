import {Body, Controller, Post} from '@nestjs/common';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import * as bcrypt from 'bcrypt';
import {User} from "../../schemas/user.schema";

@ApiTags('Authorization')
@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/signup')
  @ApiBody({type: User })
  async createUser(@Body() data: User) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await this.userService.createUser(
        data,
        hashedPassword
    );
  }
}
