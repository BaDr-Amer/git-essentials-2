import * as service from './service.js'

export const create = async (req, res) => {
    const { name, Workflow } = req.body
    const project = await service.create({ name, Workflow, user_id: req.userId })
    res.status(201).send(project)
}


export const createStage = async (req, res) => {
    const { name, order, ticket_count } = req.body
    const stage = await service.create({ name, order, ticket_count })
    res.status(201).send(stage)
}

export const createTicket = async (req, res) => {
    const { name, Workflow,current_stage,description,comments,parent_id , user_id } = req.body
    const {id} = req.params
    const ticket = await service.createTicket({ name, Workflow,current_stage,description,comments,parent_id , user_id , project_id:id })
    res.status(201).send(ticket)
}
 

export const createBug = async (req, res) => {
    const { name, Workflow,current_stage,description,comments,parent_id , user_id,Severity } = req.body
    const {id,ticket_id} = req.params
    const bug = await service.createBug({ name, Workflow,current_stage,description,comments,parent_id:ticket_id , user_id , project_id:id ,Severity})
    res.status(201).send(bug)
}

export const find = async (req, res) => {
    const projects = await service.find()
    return res.send(projects)
}

export const findById = async (req, res) => {
    const project = await service.findById(req.params.id)
    if (!project) throw new Error(`No project found for ${req.params.id}`)
    return res.send(project)
}


export const findProjectTicket = async (req, res) => {
    const tickets = await service.findByProjectId(req.params.id)
    if (!tickets) throw new Error(`No tickets found for this project `)
    return res.send(tickets)
}


export const update = async (req, res) => {
    const {Workflow} = req.body
    const {id} = req.params
  const updatedProject = await service.updatedProject({Workflow,id})
  return  res.status(200).json(updatedProject)
    
}


export const addComment = async (req, res) => {
   const {comments} = req.body
   const {id, ticket_id} = req.params
   const updatedTicket = await service.updatedTicketComments({comments,id, ticket_id})
  return  res.status(200).json(updatedTicket)
}

export const updateTicketStage = async (req, res) => {
    const {nextSatge} = req.body
    const {id, ticket_id} = req.params
    const updatedTicket = await service.moveToNextStage({nextSatge,id, ticket_id})
   return  res.status(200).json(updatedTicket)
 }


 export const updateTicketUser = async (req, res) => {
    const {user_id} = req.body
    const {id, ticket_id} = req.params
    const updatedTicket = await service.updateTicketUser({user_id,id, ticket_id})
   return  res.status(200).json(updatedTicket)
 }

export const remove = async (req, res) => {
    const result = await service.remove({ post_id: req.params.id, user_id: req.userId })
    // if (!result.deletedCount) throw new Error(`No post found for ${req.params.id}`)
    return res.status(204).send(result)
}

export const removeTicket = async (req, res) => {
    const result = await service.removeTicket({ ticket_id: req.params.ticket_id, project_id: req.params.id })
    // if (!result.deletedCount) throw new Error(`No post found for ${req.params.id}`)
    return res.status(204).send(result)
}