import bull from 'bull'
import { connection } from '../core/redis'
import Notification from '../model/Notification'
import Agenda from "agenda";
import humanInterval from 'human-interval';
import User from '../model/User'
import agenda from '../jobs/agenda';
import Redis from 'ioredis';

const queue = new bull('pushNotifications', connection)
const redis = new Redis({
    port: 6379,
    host: "localhost"
});


queue.process(async (jobs) => {
    const agenda = new Agenda({ db: { address: "mongodb://127.0.0.1:27018", collection: "agendaJobs" } });
    agenda.define('notificationJob' + jobs.data.user_id, async job => {
        const user = await redis.get('notificationReminder' + jobs.data.user_id)
        const { user_id, text, count } = job.attrs.data
        if ((user != null)) {
            if (count <= 0) {
                await job.remove();
                await redis.del('notificationReminder' + jobs.data.user_id)
            }
            else {
                job.attrs.data.count--
                await Notification.create({ user_id, text })
                job.repeatEvery(jobs.data.interval)
            }
        }

    })
    await agenda.start()
    if (jobs.data.when == 'after') {
        // endDate = new Date(new Date(jobs.data.date + (humanInterval(jobs.data.interval) * jobs.data.repetition)))
        await agenda.schedule(
          jobs.data.scheduleAfter,
          "notificationJob" + jobs.data.user_id,
          {
            user_id: jobs.data.user_id,
            text: "complete ur profile",
            count: jobs.data.repetition,
          }
        );
    }
    else /*if( jobs.data.when == 'before')*/ {}

})


export default queue