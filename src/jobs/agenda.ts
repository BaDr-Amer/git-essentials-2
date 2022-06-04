import Agenda from "agenda"

export default async( req, res, next)=>{

const agenda = new Agenda({ db: { address: 'mongodb://localhost:27018/base',collection: "Notifications" } })



}
