import {Body, Controller, Delete, Post} from '@nestjs/common';
import {JobsService} from "./jobs.service";
import {JobCreateRequest, JobRemoveRequest} from "../../types/jobs";
import {BaseRequest} from "../../types/common";
import {ApiBody, ApiTags} from "@nestjs/swagger";

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(
    private readonly jobService: JobsService,
  ) {}

  @Post('create')
  @ApiBody({type: JobCreateRequest })
  async createJob(@Body() request: JobCreateRequest) {
    return await this.jobService.createJob(request);
  }

  @Delete('remove')
  @ApiBody({type: JobRemoveRequest })
  async removeJob(@Body() request: JobRemoveRequest) {
    return await this.jobService.removeJob(request);
  }

  @Post('all')
  @ApiBody({type: BaseRequest<any> })
  async getJobs(@Body() request: BaseRequest<any>) {
    return await this.jobService.getAllJobs(request);
  }
}
