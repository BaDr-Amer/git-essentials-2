import express from 'express';
const router = express.Router()
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'

router.use(authenticationMiddleware)

router.post('/',  controller.create)
router.post('/:id/ticket',  controller.createTicket)
router.post('/:id/:ticket_id/bug',  controller.createBug)
router.get('/', controller.find)
router.get('/:id',  controller.findById)
router.get('/:id/ticket', controller.findProjectTicket)
router.put('/:id',  controller.update)
router.put('/:id/ticket/:ticket_id/addComment',  controller.addComment)
router.put('/:id/ticket/:ticket_id/moveTo',  controller.updateTicketStage)
router.put('/:id/ticket/:ticket_id/reAssigne',  controller.updateTicketUser)
router.delete('/:id',  controller.remove)
router.delete('/:id/ticket/:ticket_id', controller.removeTicket)

export default router