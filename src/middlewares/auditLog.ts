import { AuditLog } from "../model/AuditLog"

import queue from '../Jobs/updatelogs'
export default async (req, res, next) => {
let atEnd=performance.now()-req.atStart
let date =req.body.createdAt

if (req.method === 'GET'|| req.body.createdAt == undefined) {
date =new Date()
}else if(req.body.createdAt.getTime() !==req.body.updatedAt.getTime()) {
date=req.body.updatedAt
}

    let log : AuditLog= {
        UserId: req.userId,
        OriginalUrl: req.originalUrl,
        Method: req.method,
        Status: res.statusCode,
        Date: date,
        ResponseTime: atEnd
    }
const x=await queue.add(log)




}