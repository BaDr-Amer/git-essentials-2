
import * as service from './service.js'
export const uploadFile = async (req,res)=>{
        res.send(await service.uploadFile(req.file))
        
}

