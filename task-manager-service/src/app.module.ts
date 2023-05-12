import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import {AccountModule} from "./modules/account/account.module";
import {JobModule} from "./modules/job/job.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
  imports: [
      MongooseModule.forRootAsync({
          useFactory: async () => ({
              uri: 'mongodb://localhost:27018',
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false,
          }),
      }),
      AccountModule,
      JobModule,
      UserModule,
      AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
