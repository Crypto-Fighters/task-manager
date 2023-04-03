import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Job {
    id: string;
    accountId: number;
    mode: string;
    activityName: string;
    createdDate: number;
    nextPlannedDate: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);