import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import {AccountModule} from "./modules/account/account.module";
import {JobModule} from "./modules/job/job.module";

@Module({
  imports: [
      MongooseModule.forRootAsync({
          useFactory: async () => ({
              uri: 'mongodb://localhost:27017',
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false,
          }),
      }),
      MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
      AccountModule,
      JobModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
