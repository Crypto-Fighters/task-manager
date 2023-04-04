import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../schemas/user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private user: Model<User>,
    ) {}

    async createUser(newUser: User, hashedPassword: string): Promise<User> {
        return this.user.create({
            ...newUser,
            password: hashedPassword
        });
    }
    async getUser(query: object): Promise<User> {
        return this.user.findOne(query);
    }
}
