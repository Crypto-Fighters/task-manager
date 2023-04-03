import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    id: number;
    login: string;
    password: number;
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);