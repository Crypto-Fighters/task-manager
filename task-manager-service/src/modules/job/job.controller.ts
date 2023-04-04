import {Body, Controller, Delete, Post, UseGuards} from '@nestjs/common';
import {JobsService} from "./jobs.service";
import {JobCreateRequest, JobRemoveRequest} from "../../types/jobs";
import {BaseRequest} from "../../types/common";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../auth/guards/jwt.auth";

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(
    private readonly jobService: JobsService,
  ) {}

  @Post('create')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  @ApiBody({type: JobCreateRequest })
  async createJob(@Body() request: JobCreateRequest) {
    return await this.jobService.createJob(request);
  }

  @Delete('remove')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  @ApiBody({type: JobRemoveRequest })
  async removeJob(@Body() request: JobRemoveRequest) {
    return await this.jobService.removeJob(request);
  }

  @Post('all')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  @ApiBody({type: BaseRequest<any> })
  async getJobs(@Body() request: BaseRequest<any>) {
    return await this.jobService.getAllJobs(request);
  }
}
