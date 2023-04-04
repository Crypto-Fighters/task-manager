import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class User {
    _id: string;

    @Prop()
    login: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

