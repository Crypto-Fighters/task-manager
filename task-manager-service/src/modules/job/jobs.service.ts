import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Job, JobCreateRequest, JobMode, JobRemoveRequest} from "../../types/jobs";
import {load, CronTab} from 'crontab';
import {BaseRequest} from "../../types/common";
import {Account} from "../../schemas/account.schema";
import {getCommandLine} from "../../utils/common";


const loadCronTab = async () => {
    return new Promise((resolve, reject) => {
        load((err, crontab) => {
            if (err) {
                reject(err)
            }

            resolve(crontab);
        })
    });
};

const saveCronTab = async (cronTab) => {
    return new Promise((resolve, reject) => {
        cronTab.save((err, crontab) => {
            if (err) {
                reject(err)
            }

            resolve(crontab);
        })
    });
};

@Injectable()
export class JobsService {
    constructor(
        @InjectModel('job') private jobs: Model<Job>,
        @InjectModel('account') private accounts: Model<Account>
    ) {}

    async createJob({userId, payload: {mode, date, activityName, accountId, params}}: JobCreateRequest) {
        const accounts = await this.accounts.find({id: accountId}).exec();
        if (!accounts.length) {
            return new HttpException('Невозможно создать задачу. Не найден аккаунт!', 409);
        }

        if (mode === JobMode.FIXED && date) {
            const acc = accounts[0];
            const cronTab: CronTab = await loadCronTab() as CronTab;
            const createdDate = Date.now();
            const jobObject: Job = {id: `${userId}-${createdDate}`, activityName, accountId, createdDate, mode, nextPlannedDate: date};
            cronTab.create(getCommandLine(activityName, {
                ...params,
                metamaskPhrases: acc.metamask.phrases,
                metamaskPassword: acc.metamask.password,
                twitterLogin: acc.twitter.login,
                twitterPassword: acc.twitter.password,
                discordLogin: acc.discord.login,
                discordPassword: acc.discord.password
            }), new Date(date), JSON.stringify(jobObject));
            await saveCronTab(cronTab);
        }
        else {
            // TODO not implemented
        }
    }

    async removeJob({userId, payload: {jobComment}}: JobRemoveRequest) {
        const cronTab: CronTab = await loadCronTab() as CronTab;
        try {
            if (JSON.parse(jobComment).id.startWith(`${userId}-`)) {
                cronTab.remove({comment:jobComment});
                return await saveCronTab(cronTab);
            }
            throw new HttpException('Невозможно удалить задачу! Возможно вы пытаетесь удалить чужую задачу! Если это не так, то обратитесь к разработчику!', 409);
        } catch (e) {
            console.error(e);
            throw new HttpException('Невозможно удалить задачу! Обратитесь к разработчику!', 409);
        }
    }

    async getAllJobs({userId}: BaseRequest<any>): Promise<Job[]> {
        const cronTab: CronTab = await loadCronTab() as CronTab;
        return cronTab.jobs({comment: new RegExp(`"id":${userId}-`)}).flatMap((job) => {
            try {
                return [JSON.parse(job.comment())];
            } catch (e) {
                return [];
            }
        });
    }
}
