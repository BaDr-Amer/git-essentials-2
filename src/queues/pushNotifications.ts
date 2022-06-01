import bull from 'bull'
import { connection } from '../core/redis'
import Notification from '../model/Notification'
import Agenda from "agenda";
import humanInterval from 'human-interval';
import User from '../model/User'

const queue = new bull('pushNotifications', connection)



queue.process(async (jobs) => {
    const agenda = new Agenda({ db: { address: "mongodb://127.0.0.1:27018", collection: "agendaJobs" } });
    agenda.define('notificationJob', async job => {
         const user= await User.findById(jobs.data.user_id)
        if(jobs.data.repetition>0&&(!user.firstName||!user.lastName)){
        const { user_id, text  } = job.attrs.data
        await Notification.create({ user_id, text })
        jobs.data.repetition--;
        job.repeatEvery(jobs.data.interval)}
        
    })
    await agenda.start()
    if (jobs.data.type == 'after') {
        await agenda.schedule(jobs.data.scheduleAfter, 'notificationJob', { user_id: jobs.data.user_id, text: "complete ur profile" })
    }
    else {jobs.data.type =='before' }

})


export default queue