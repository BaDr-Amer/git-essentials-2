import Like from "../../../models/Like.js";
const validateLikes =  async (req, res, next) => {
       const like =await Like.find({refId:req.params.id , userId:req.userId})
       if(like.length>0) return res.json({ validation_errors: "User can't like same content more than once" }) 
       next()  
    }

 export default validateLikes   
 