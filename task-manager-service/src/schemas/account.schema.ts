import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class Account {
    @Prop()
    userId: number;

    @Prop({ type: Object })
    metamask: {
        phrases: string;
        password: string;
        balance?: number;
    };

    @Prop({ type: Object })
    twitter?: {
        login: string;
        password: string;
    };

    @Prop({ type: Object })
    discord?: {
        login: string;
        password: string;
    };
}

export const AccountSchema = SchemaFactory.createForClass(Account);