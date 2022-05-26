import bull from 'bull'
import {connection} from '../core/redis'
import AuditLog from '../model/AuditLog'
const queue =new bull('udpateLogs', connection)


queue.process(async(jobs,done) => {

const x= await AuditLog.create(jobs.data)
done()
})


export default queue