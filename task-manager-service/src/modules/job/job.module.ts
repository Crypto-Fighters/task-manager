import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import {JobController} from "./job.controller";
import {JobSchema} from "../../schemas/job.schema";
import {JobsService} from "./jobs.service";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'account', schema: JobSchema }]),
      MongooseModule.forFeature([{ name: 'job', schema: JobSchema }])
  ],
  controllers: [JobController],
  providers: [JobsService],
})
export class JobModule {}
