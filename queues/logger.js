import Queue from "bull/lib/queue.js";
import { connection } from "../core/redis.js";
import Log from "../models/Log.js";

const logger = new Queue('loggerQueue',connection)

logger.process(async(job,done)=>{
     await Log.create({
        who:job.data.who,
        what:job.data.what,
        Method:job.data.Method,
        How:job.data.How,
        When:job.data.When,
        ResponseTime:job.data.ResponseTime
    })
    done();
})
export default logger;