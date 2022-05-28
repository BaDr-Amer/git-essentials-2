import logger from "../queues/logger.js";


export const logThings = async(req,res,next)=>{
    
    req.startTime = Date.now();
    req.date = new Date().toString()
    res.on("finish", () => {
        logger.add({ 
          who: req.userId||null,
          what:`${req.headers.host}${req.url}`,
          Method:req.method,
          How:res.statusCode,
          When:req.date,
          ResponseTime: Date.now() - req.startTime})
      });
    next();
}