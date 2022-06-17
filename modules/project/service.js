import Ticket from '../../models/Ticket.js'
import Project from '../../models/Project.js'
import Comments from '../../models/Comment.js'
import Bug from '../../models/Bug.js'
import Stage from '../../models/Satge.js'
import Comment from '../../models/Comment.js'

export const create = async ({ name, Workflow, user_id }) => {
  return await Project.create({ name, Workflow, user_id })
}

export const createStages = async ({ name, order, ticket_count }) => {
  return await Stage.create({ name, order, ticket_count })
}

export const createTicket = async ({  name, Workflow,current_stage,description,comments,parent_id , user_id , project_id }) => {
  return await Ticket.create({  name, Workflow,current_stage,description,comments,parent_id , user_id , project_id })
}

export const createBug = async ({  name, Workflow,current_stage,description,comments,parent_id , user_id , project_id ,Severity }) => {
  return await Bug.create({   name, Workflow,current_stage,description,comments,parent_id , user_id , project_id ,Severity })
}

export const find = async () => {
  return await Project.find()
}

export const findById = async (id) => {
  return await Project.findById(id)
}

export const findProjectTicket = async (id) => {
  return await Ticket.find({project_id: id})
}

export const updatedProject = async ({Workflow,id}) => {
  return await Project.updateOne({project_id: id}, { $set: { Workflow } })
}

export const updatedTicketComments = async ({comments,id, ticket_id}) => {
  const session = await mongoose.startSession()
let prevComment = Ticket.findOne({_id:ticket_id},'comments')
const newComments = [...prevComment , ...comments]
  let ticket
  await session.withTransaction(async () => {
   const comments =  await Comment.updateMany({ticket_id: ticket_id},newComments, {upsert: true},{ session })
    if (!comments) {
      throw ApiError.badRequest('error adding comments')
    }
    ticket=   await Ticket.updateOne({ticket_id: id}, { $set: { comments: newComments } },{ session })
  })
  session.endSession()
  return ticket
}


export const moveToNextStage = async ({nextSatge, ticket_id}) => {
return await Ticket.updateOne({ticket_id: ticket_id}, { $set: { current_stage: nextSatge } })
}


export const updateTicketUser = async ({user_id, ticket_id}) => {
  return await Ticket.updateOne({ticket_id: ticket_id}, { $set: { user_id: user_id } })
  }

  export const removeTicket = async ({ ticket_id, project_id}) => {
    
    }

    export const remove = async ({ post_id, user_id }) => {
    
    }